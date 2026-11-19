import { expect, Locator, Page } from '@playwright/test';
import { envConfig } from '../../utils/env';
import { BasePage } from '../base/BasePage';

export class AeHomePage extends BasePage {
  readonly brandLogo: Locator;
  readonly productsNavLink: Locator;
  readonly contactUsNavLink: Locator;

  constructor(page: Page) {
    super(page);
    this.brandLogo = page.locator('img[alt="Website for automation practice"]');
    this.productsNavLink = page.locator('header a[href="/products"]');
    this.contactUsNavLink = page.locator('header a[href="/contact_us"]');
  }

  async open(): Promise<void> {
    await this.goto(envConfig.urls.automationExercise);
    await this.dismissConsentIfVisible();
    await expect(this.brandLogo).toBeVisible();
  }

  async navigateToProducts(): Promise<void> {
    await this.safeClick(this.productsNavLink);
  }

  async navigateToContactUs(): Promise<void> {
    await this.safeClick(this.contactUsNavLink);
  }
}
