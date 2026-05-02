import { APIRequestContext, expect } from '@playwright/test';
import { Logger } from '../../utils/logger';

export class BookingClient {
  constructor(private request: APIRequestContext) {}

  async createBooking(payload: any) {
    Logger.logRequest('POST', '/booking', payload);

    const response = await this.request.post('/booking', {
      data: payload,
    });

    const body = await response.json();

    Logger.logResponse(response.status(), body);

    expect(response.status()).toBe(200);
    return body;
  }

  async getBooking(id: number) {
    Logger.logRequest('GET', `/booking/${id}`);

    const response = await this.request.get(`/booking/${id}`);
    const body = await response.json();

    Logger.logResponse(response.status(), body);

    expect(response.ok()).toBeTruthy();
    return body;
  }

  async updateBooking(id: number, token: string, payload: any) {
    Logger.logRequest('PUT', `/booking/${id}`, payload);

    const response = await this.request.put(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      },
      data: payload,
    });

    const body = await response.json();

    Logger.logResponse(response.status(), body);

    expect(response.ok()).toBeTruthy();
    return body;
  }

  async deleteBooking(id: number, token: string) {
    Logger.logRequest('DELETE', `/booking/${id}`);

    const response = await this.request.delete(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    Logger.logResponse(response.status(), await response.text());

    expect(response.status()).toBe(201);
  }
}