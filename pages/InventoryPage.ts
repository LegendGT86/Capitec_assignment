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

  // 🔹 Private helper to avoid duplication
  private getItemByName(itemName: string): Locator {
    return this.page.locator('.inventory_item').filter({
      hasText: itemName,
    });
  }

  async addItemToCart(itemName: string) {
    const item = this.getItemByName(itemName);
    await item.getByRole('button', { name: /add to cart/i }).click();
  }

  async removeItemFromCart(itemName: string) {
    const item = this.getItemByName(itemName);
    await item.getByRole('button', { name: /remove/i }).click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getInventoryCount() {
    return await this.inventoryItems.count();
  }
}