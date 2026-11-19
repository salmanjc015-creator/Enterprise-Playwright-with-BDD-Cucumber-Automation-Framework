import { Locator, Page } from '@playwright/test';

/**
 * Abstract Base Page encapsulating shared Playwright actions,
 * navigation resilience, and cookie/consent banner handling.
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async safeClick(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  async safeFill(locator: Locator, value: string): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
    await locator.fill(value);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  getUrl(): string {
    return this.page.url();
  }

  /**
   * Dismisses common GDPR / cookie consent dialogs when displayed.
   */
  async dismissConsentIfVisible(): Promise<void> {
    const consentBtn = this.page
      .locator(
        'button.fc-cta-consent, button:has-text("Consent"), button:has-text("Accept all")'
      )
      .first();

    try {
      if (await consentBtn.isVisible({ timeout: 2500 })) {
        await consentBtn.click();
      }
    } catch {
      // No consent banner rendered.
    }
  }
}
