import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';

test.describe('Checkout flow', () => {
  test('should complete full purchase successfully', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.loginAsStandardUser();

    await inventory.addItemToCart('Sauce Labs Backpack');
    await inventory.goToCart();

    await cart.proceedToCheckout();

    await checkout.fillCheckoutDetails('John', 'Doe', '1234');
    await checkout.continueCheckout();
    await checkout.finishCheckout();

    await expect(checkout.successMessage).toBeVisible();
  });
});