import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class SauceCartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectItemInCart(productName: string): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.cartItems.filter({ hasText: productName })).toBeVisible();
  }

  async proceedToCheckout(): Promise<void> {
    await this.safeClick(this.checkoutButton);
  }
}
