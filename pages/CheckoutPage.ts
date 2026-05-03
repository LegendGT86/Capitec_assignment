import { Page, Locator } from '@playwright/test';

type CheckoutDetails = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

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

  async fillCheckoutDetails(data: CheckoutDetails) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.postalCodeInput.fill(data.postalCode);
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
    return this.successMessage.isVisible();
  }
}