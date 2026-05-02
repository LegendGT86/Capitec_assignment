import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { CartPage } from '@pages/CartPage';

test.describe('Cart functionality', () => {
  test('should add item and display in cart', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await login.loginAsStandardUser();

    await inventory.addItemToCart('Sauce Labs Backpack');
    await inventory.goToCart();

    const count = await cart.getCartItemCount();
    expect(count).toBe(1);
  });

  test('should proceed to checkout', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await login.loginAsStandardUser();

    await inventory.addItemToCart('Sauce Labs Backpack');
    await inventory.goToCart();

    await cart.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
  });
});