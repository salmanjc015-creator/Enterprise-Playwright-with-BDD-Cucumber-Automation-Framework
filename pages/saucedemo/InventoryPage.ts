import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export type SauceSortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class SauceInventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async open(): Promise<void> {
    await this.goto('https://www.saucedemo.com/inventory.html');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.pageTitle).toHaveText('Products');
  }

  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.inventoryItems.filter({ hasText: productName });
    await expect(productCard).toBeVisible();
    await this.safeClick(productCard.getByRole('button', { name: 'Add to cart' }));
  }

  async sortBy(option: SauceSortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getAllProductPrices(): Promise<number[]> {
    const rawPrices = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();
    return rawPrices.map((price) => parseFloat(price.replace('$', '').trim()));
  }

  async expectCartCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(expectedCount));
  }

  async openCart(): Promise<void> {
    await this.safeClick(this.cartLink);
  }
}
