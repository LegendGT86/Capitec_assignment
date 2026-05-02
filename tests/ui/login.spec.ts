import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

test.describe('Login functionality', () => {

  test('should login successfully with standard user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.loginAsStandardUser();

    await expect(page).toHaveURL(/inventory/);
  });

  test('should show error for locked user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.loginAsLockedUser();

    await expect(login.errorMessage).toBeVisible();
  });

});