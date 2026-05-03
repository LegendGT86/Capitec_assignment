import { APIRequestContext } from '@playwright/test';
import { Logger } from '@utils/logger';

type ApiResponse<T = any> = {
  status: number;
  body: T | null;
};

export class AuthClient {
  constructor(private request: APIRequestContext) {}

  async generateToken(username: string, password: string): Promise<string> {
    const payload = { username, password };

    Logger.logRequest('POST', '/auth', payload);

    const response = await this.request.post('/auth', {
      data: payload,
    });

    const body = await response.json();

    Logger.logResponse(response.status(), body);

    // ✅ FIX: return ONLY token string
    return body?.token;
  }

  // For negative tests
  async generateTokenRaw(username: string, password: string): Promise<ApiResponse> {
    const payload = { username, password };

    const response = await this.request.post('/auth', {
      data: payload,
    });

    let body = null;

    try {
      body = await response.json();
    } catch {
      body = null;
    }

    return {
      status: response.status(),
      body,
    };
  }
}