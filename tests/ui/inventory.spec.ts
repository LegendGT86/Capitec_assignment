import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';

test.describe('Inventory page', () => {
  test('should display products after login', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.loginAsStandardUser();

    const count = await inventory.getInventoryCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should add item to cart', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.loginAsStandardUser();

    await inventory.addItemToCart('Sauce Labs Backpack');
    await inventory.goToCart();

    await expect(page).toHaveURL(/cart/);
  });
});