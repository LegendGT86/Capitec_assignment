import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inventoryItems = page.locator('.inventory_item');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addItemToCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({
      hasText: itemName,
    });

    await item.locator('button').click();
  }

  async removeItemFromCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({
      hasText: itemName,
    });

    await item.locator('button').click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getInventoryCount() {
    return await this.inventoryItems.count();
  }
}