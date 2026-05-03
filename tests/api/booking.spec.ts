import { test, expect, request as playwrightRequest } from '@playwright/test';

import { BookingClient } from '../../api/clients/booking.client';
import { AuthClient } from '../../api/clients/auth.client';

import { bookingData } from '../../test-data/bookingData';
import { authData } from '../../test-data/authData';

test.describe('@api @booking CRUD lifecycle tests', () => {

  let apiContext;
  let bookingClient: BookingClient;
  let authClient: AuthClient;

  let bookingId: number;
  let token: string;

  test.beforeAll(async () => {

    // ✅ Create isolated API context (THIS IS THE FIX)
    apiContext = await playwrightRequest.newContext({
      baseURL: 'https://restful-booker.herokuapp.com'
    });

    bookingClient = new BookingClient(apiContext);
    authClient = new AuthClient(apiContext);

    token = await authClient.generateToken(
      authData.users.valid.username,
      authData.users.valid.password
    );
  });

  test.afterAll(async () => {
    // ✅ Clean up context (important for CI stability)
    await apiContext.dispose();
  });

  test('should create booking', async () => {
    const response = await bookingClient.createBooking(bookingData.create);

    bookingId = response.bookingid;

    expect(bookingId).toBeTruthy();
  });

  test('should retrieve booking', async () => {
    const response = await bookingClient.getBooking(bookingId);

    expect(response.firstname).toBe(bookingData.create.firstname);
  });

  test('should update booking', async () => {
    const updated = await bookingClient.updateBooking(
      bookingId,
      token,
      bookingData.update
    );

    expect(updated.firstname).toBe(bookingData.update.firstname);
  });

  test('should delete booking', async () => {
    await bookingClient.deleteBooking(bookingId, token);
  });

  test('should return 404 after deletion', async ({ request }) => {
    const response = await request.get(`/booking/${bookingId}`);

    expect(response.status()).toBe(404);
  });

});