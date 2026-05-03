import { test, expect } from '@playwright/test';

import { AuthClient } from '@api/clients/auth.client';

import { authData } from '../../test-data/authData';

test.describe('@api @auth authentication tests', () => {

  test('should generate auth token with valid credentials', async ({ request }) => {
    const auth = new AuthClient(request);

    const token = await auth.generateToken(
      authData.users.valid.username,
      authData.users.valid.password
    );

    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
  });

  test('should fail with invalid credentials', async ({ request }) => {
    const auth = new AuthClient(request);

    const response = await request.post('/auth', {
      data: {
        username: authData.users.invalid.username,
        password: authData.users.invalid.password,
      },
    });

    // Restful-booker returns 200 with empty token on invalid auth
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.token).toBeUndefined();
  });

});