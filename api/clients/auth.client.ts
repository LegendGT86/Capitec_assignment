import { APIRequestContext, expect } from '@playwright/test';

export class AuthClient {
  constructor(private request: APIRequestContext) {}

  async generateToken(username: string, password: string): Promise<string> {
    const response = await this.request.post('/auth', {
      data: {
        username,
        password,
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    return body.token;
  }
}