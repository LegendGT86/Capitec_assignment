import { test, expect } from '@playwright/test';

import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';

import { users } from '../../test-data/users';
import { products } from '../../test-data/products';
import { checkoutData } from '../../test-data/checkoutData';

test.describe('Checkout flow', () => {

  test('@ui @checkout should complete full purchase successfully', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();

    await login.login(
      users.standard.username,
      users.standard.password
    );

    await inventory.addItemToCart(products.backpack.name);
    await inventory.goToCart();

    await cart.proceedToCheckout();

    await checkout.fillCheckoutDetails(checkoutData.valid);
    await checkout.continueCheckout();
    await checkout.finishCheckout();

    await expect(checkout.successMessage).toBeVisible();
  });

});