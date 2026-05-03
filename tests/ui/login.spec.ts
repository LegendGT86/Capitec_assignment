import { test, expect } from '@playwright/test';

import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';

import { users } from '../../test-data/users';

test.describe('Login functionality', () => {

  test('@ui @login should login successfully with standard user', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();

    await login.login(
      users.standard.username,
      users.standard.password
    );

    const count = await inventory.inventoryItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('@ui @login should show error for locked user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();

    await login.login(
      users.locked.username,
      users.locked.password
    );

    await expect(login.errorMessage).toBeVisible();
  });

});