import { test, expect } from '@playwright/test';

import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { CartPage } from '@pages/CartPage';

import { users } from '../../test-data/users';
import { products } from '../../test-data/products';

test.describe('Cart functionality', () => {

  test('@ui @cart should add item and display in cart', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.goto();

    await login.login(
      users.standard.username,
      users.standard.password
    );

    await inventory.addItemToCart(products.backpack.name);
    await inventory.goToCart();

    const count = await cart.getCartItemCount();

    expect(count).toBe(1);
  });

  test('@ui @cart should proceed to checkout', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.goto();

    await login.login(
      users.standard.username,
      users.standard.password
    );

    await inventory.addItemToCart(products.backpack.name);
    await inventory.goToCart();

    await cart.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
  });

});