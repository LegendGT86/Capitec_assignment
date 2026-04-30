import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

// Environment variables
const BASE_URL = process.env.UI_BASE_URL || 'http://localhost:3000';
const API_BASE_URL = process.env.API_BASE_URL;
const ENV = process.env.ENV || 'qa_testing';

if (!API_BASE_URL) {
  throw new Error('Missing API_BASE_URL in environment variables');
}

export default defineConfig({
  testDir: './tests',

  /* ---------------- GLOBAL SETTINGS ---------------- */
  timeout: 30 * 1000,
  expect: { timeout: 5000 },

  /* ---------------- REPORTING (MONOCART) ---------------- */
  reporter: [
    ['list'], // keep for terminal feedback (optional but recommended)
    ['monocart-reporter', {
      name: 'Automation Assessment Report',
      outputFile: './monocart-report/index.html',

      metadata: {
        project: 'Playwright Automation Assessment',
        environment: ENV,
        baseURL: BASE_URL,
        apiURL: API_BASE_URL,
      },

      columns: (defaultColumns: any) => [
        ...defaultColumns,
        { id: 'project', name: 'Project' },
      ],
    }]
  ],

  /* ---------------- OUTPUT ---------------- */
  outputDir: 'test-results',

  /* ---------------- SHARED USE CONFIG ---------------- */
  use: {
    baseURL: BASE_URL,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    // Debugging artifacts (Monocart will surface these)
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    launchOptions: {
      headless: true,
      slowMo: 50,
    },

    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  },

  projects: [
    /* ----- UI TESTS ----- */
    {
      name: 'ui-chromium',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: BASE_URL,
      },
      fullyParallel: true,
    },

    /* ----- API TESTS ----- */
    {
      name: 'api',
      testMatch: /.*\.api\.ts/,
      use: {
        baseURL: API_BASE_URL,
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
      fullyParallel: false,
      retries: 0,
      timeout: 10000,
    },
  ],
});