// utils/logger.ts

export class Logger {
  static logRequest(method: string, url: string, payload?: unknown) {
    console.log(`\n➡️ [REQUEST] ${method} ${url}`);
    if (payload) {
      console.log(`Payload:`, JSON.stringify(payload, null, 2));
    }
  }

  static logResponse(status: number, body: unknown) {
    console.log(`⬅️ [RESPONSE] Status: ${status}`);
    console.log(`Body:`, JSON.stringify(body, null, 2));
  }

  static logError(error: unknown) {
    console.error(`❌ [ERROR]`, error);
  }
}