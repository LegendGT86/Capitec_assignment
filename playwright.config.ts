import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

// Environment variables
const BASE_URL = process.env.UI_BASE_URL || 'https://www.saucedemo.com';
const API_BASE_URL = process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com';
const ENV = process.env.ENV || 'qa_testing';

export default defineConfig({
  testDir: './tests',

  /* ---------------- GLOBAL SETTINGS ---------------- */
  timeout: 30 * 1000,
  expect: { timeout: 5000 },

  /* ---------------- REPORTING (MONOCART) ---------------- */
  reporter: [
    ['list'],
    ['monocart-reporter', {
      name: 'Automation Assessment Report',
      outputFile: './monocart-report/index.html',

      metadata: {
        project: 'Playwright Automation Assessment',
        environment: ENV,
        baseURL: BASE_URL,
        apiURL: API_BASE_URL,
      },
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

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* ---------------- PROJECTS ---------------- */
  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: BASE_URL,
      },
      fullyParallel: true,
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: API_BASE_URL,
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
      fullyParallel: false,
    },
  ],
});