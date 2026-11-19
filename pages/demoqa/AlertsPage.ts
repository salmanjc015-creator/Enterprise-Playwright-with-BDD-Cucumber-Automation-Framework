import { expect, Locator, Page } from '@playwright/test';
import { envConfig } from '../../utils/env';
import { BasePage } from '../base/BasePage';

export class DemoQaAlertsPage extends BasePage {
  readonly simpleAlertButton: Locator;
  readonly confirmAlertButton: Locator;
  readonly promptAlertButton: Locator;
  readonly confirmResult: Locator;
  readonly promptResult: Locator;

  constructor(page: Page) {
    super(page);
    this.simpleAlertButton = page.locator('#alertButton');
    this.confirmAlertButton = page.locator('#confirmButton');
    this.promptAlertButton = page.locator('#promtButton');
    this.confirmResult = page.locator('#confirmResult');
    this.promptResult = page.locator('#promptResult');
  }

  async open(): Promise<void> {
    await this.goto(`${envConfig.urls.demoQa}/alerts`);
    await expect(this.simpleAlertButton).toBeVisible();
  }

  async triggerAndAcceptConfirm(): Promise<string> {
    let dialogMessage = '';
    this.page.once('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    await this.safeClick(this.confirmAlertButton);
    return dialogMessage;
  }

  async triggerAndSubmitPrompt(inputText: string): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept(inputText);
    });
    await this.safeClick(this.promptAlertButton);
  }

  async expectConfirmResult(expectedText: string): Promise<void> {
    await expect(this.confirmResult).toBeVisible();
    await expect(this.confirmResult).toContainText(expectedText);
  }

  async expectPromptResult(expectedText: string): Promise<void> {
    await expect(this.promptResult).toBeVisible();
    await expect(this.promptResult).toContainText(expectedText);
  }
}
