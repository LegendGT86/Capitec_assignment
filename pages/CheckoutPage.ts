import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  readonly finishButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');

    this.continueButton = page.getByRole('button', { name: /continue/i });
    this.finishButton = page.getByRole('button', { name: /finish/i });

    this.successMessage = page.locator('.complete-header');
  }

  async fillCheckoutDetails(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout() {
    await Promise.all([
      this.page.waitForURL(/checkout-step-two/),
      this.continueButton.click(),
    ]);
  }

  async finishCheckout() {
    await Promise.all([
      this.page.waitForURL(/checkout-complete/),
      this.finishButton.click(),
    ]);
  }

  async isCheckoutComplete(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }
}