import { expect, Locator, Page } from '@playwright/test';
import { envConfig } from '../../utils/env';
import { TextBoxUserData } from '../../utils/fakerData';
import { BasePage } from '../base/BasePage';

export class DemoQaTextBoxPage extends BasePage {
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;
  readonly outputBox: Locator;
  readonly outputName: Locator;
  readonly outputEmail: Locator;
  readonly outputCurrentAddress: Locator;
  readonly outputPermanentAddress: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.locator('#submit');
    this.outputBox = page.locator('#output');
    this.outputName = page.locator('#output #name');
    this.outputEmail = page.locator('#output #email');
    this.outputCurrentAddress = page.locator('#output p#currentAddress');
    this.outputPermanentAddress = page.locator('#output p#permanentAddress');
  }

  async open(): Promise<void> {
    await this.goto(`${envConfig.urls.demoQa}/text-box`);
    await expect(this.fullNameInput).toBeVisible();
  }

  async fillAndSubmitForm(user: TextBoxUserData): Promise<void> {
    await this.safeFill(this.fullNameInput, user.fullName);
    await this.safeFill(this.emailInput, user.email);
    await this.safeFill(this.currentAddressInput, user.currentAddress);
    await this.safeFill(this.permanentAddressInput, user.permanentAddress);
    await this.safeClick(this.submitButton);
  }

  async expectOutputMatches(user: TextBoxUserData): Promise<void> {
    await expect(this.outputBox).toBeVisible();
    await expect(this.outputName).toContainText(user.fullName);
    await expect(this.outputEmail).toContainText(user.email);
    await expect(this.outputCurrentAddress).toContainText(user.currentAddress);
    await expect(this.outputPermanentAddress).toContainText(user.permanentAddress);
  }
}
