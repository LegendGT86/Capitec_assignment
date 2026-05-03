import { test, expect } from '@playwright/test';

import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';

import { users } from '../../test-data/users';
import { products } from '../../test-data/products';

test.describe('Inventory page', () => {

  test('@ui @inventory should display products after login', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();

    await login.login(
      users.standard.username,
      users.standard.password
    );

    const count = await inventory.getInventoryCount();

    expect(count).toBeGreaterThan(0);
  });

  test('@ui @inventory should add item to cart', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();

    await login.login(
      users.standard.username,
      users.standard.password
    );

    await inventory.addItemToCart(products.backpack.name);
    await inventory.goToCart();

    await expect(page).toHaveURL(/cart/);
  });

});