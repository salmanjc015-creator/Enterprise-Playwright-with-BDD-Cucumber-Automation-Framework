import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class AeProductsPage extends BasePage {
  readonly sectionHeading: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly productDetailTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionHeading = page.locator('.features_items h2.title');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productCards = page.locator('.features_items .product-image-wrapper');
    this.productNames = page.locator('.features_items .productinfo p');
    this.productDetailTitle = page.locator('.product-information h2');
  }

  async expectAllProductsVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/\/products/);
    await expect(this.sectionHeading).toHaveText(/All Products/i);
    await expect(this.productCards.first()).toBeVisible();
  }

  async searchProduct(keyword: string): Promise<void> {
    await this.safeFill(this.searchInput, keyword);
    await this.safeClick(this.searchButton);
  }

  async expectSearchResultsContain(keyword: string): Promise<void> {
    await expect(this.sectionHeading).toHaveText(/Searched Products/i);
    const count = await this.productCards.count();
    expect(count).toBeGreaterThan(0);

    const names = await this.productNames.allTextContents();
    const hasMatch = names.some((name) =>
      name.toLowerCase().includes(keyword.toLowerCase())
    );
    expect(hasMatch).toBeTruthy();
  }

  async openFirstProductDetails(): Promise<string> {
    const firstProductName = (await this.productNames.first().textContent())?.trim() || '';
    const viewProductLink = this.productCards.first().locator('.choose a');
    await this.safeClick(viewProductLink);
    return firstProductName;
  }

  async expectProductDetailVisible(expectedName?: string): Promise<void> {
    await expect(this.page).toHaveURL(/\/product_details\/\d+/);
    await expect(this.productDetailTitle).toBeVisible();
    if (expectedName) {
      await expect(this.productDetailTitle).toHaveText(expectedName);
    }
  }
}
