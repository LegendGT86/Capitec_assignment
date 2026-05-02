import { test as base, request, APIRequestContext } from '@playwright/test';
import { AuthClient } from '../api/clients/auth.client';
import { BookingClient } from '../api/clients/booking.client';
import { Logger } from '../utils/logger';

type ApiFixtures = {
  apiContext: APIRequestContext;
  authClient: AuthClient;
  bookingClient: BookingClient;
  token: string;
};

export const test = base.extend<ApiFixtures>({
  apiContext: async ({}, use) => {
    const context = await request.newContext({
      baseURL: 'https://restful-booker.herokuapp.com',
    });

    Logger.logRequest('API CONTEXT INIT', 'Restful Booker');

    await use(context);

    Logger.logResponse(200, 'API CONTEXT DISPOSE');
    await context.dispose();
  },

  authClient: async ({ apiContext }, use) => {
    const client = new AuthClient(apiContext);
    await use(client);
  },

  bookingClient: async ({ apiContext }, use) => {
    const client = new BookingClient(apiContext);
    await use(client);
  },

  token: async ({ authClient }, use) => {
    Logger.logRequest('AUTH', 'Generating token');

    const token = await authClient.generateToken('admin', 'password123');

    Logger.logResponse(200, 'Token generated');
    await use(token);
  },
});


// 🔄 Test lifecycle hooks (THIS is the key addition)

test.beforeEach(async ({}, testInfo) => {
  Logger.logRequest('TEST START', testInfo.title);
});

test.afterEach(async ({}, testInfo) => {
  const status = testInfo.status;

  if (status !== testInfo.expectedStatus) {
    Logger.logError(`TEST FAILED: ${testInfo.title}`);

    // attach failure info to report
    await testInfo.attach('Failure Log', {
      body: `Test: ${testInfo.title}\nStatus: ${status}`,
      contentType: 'text/plain',
    });
  } else {
    Logger.logResponse(200, `TEST PASSED: ${testInfo.title}`);
  }
});

export { expect } from '@playwright/test';