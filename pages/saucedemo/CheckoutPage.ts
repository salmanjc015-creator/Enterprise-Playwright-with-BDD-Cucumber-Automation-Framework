import { expect, Locator, Page } from '@playwright/test';
import { CheckoutCustomerData } from '../../utils/fakerData';
import { BasePage } from '../base/BasePage';

export class SauceCheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async fillCustomerInfo(customer: CheckoutCustomerData): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await this.safeFill(this.firstNameInput, customer.firstName);
    await this.safeFill(this.lastNameInput, customer.lastName);
    await this.safeFill(this.postalCodeInput, customer.postalCode);
    await this.safeClick(this.continueButton);
  }

  async completeOrder(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await this.safeClick(this.finishButton);
  }

  async expectOrderConfirmed(expectedMessage = 'Thank you for your order!'): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.completeHeader).toHaveText(expectedMessage);
  }
}
