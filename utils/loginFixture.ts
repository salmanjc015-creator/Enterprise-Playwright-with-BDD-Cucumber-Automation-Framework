import { Page } from '@playwright/test';
import { SauceInventoryPage } from '../pages/saucedemo/InventoryPage';
import { SauceLoginPage } from '../pages/saucedemo/LoginPage';
import { envConfig } from './env';

export type SauceUserRole = 'standard' | 'locked';

/**
 * Reusable Login Fixture utility encapsulating authentication flows
 * so BDD steps stay clean and credential management stays centralized.
 */
export class LoginFixture {
  private readonly loginPage: SauceLoginPage;
  private readonly inventoryPage: SauceInventoryPage;

  constructor(page: Page) {
    this.loginPage = new SauceLoginPage(page);
    this.inventoryPage = new SauceInventoryPage(page);
  }

  async loginAs(role: SauceUserRole): Promise<void> {
    const { standardUser, lockedUser, password } = envConfig.credentials.sauceDemo;
    const username = role === 'standard' ? standardUser : lockedUser;

    await this.loginPage.open();
    await this.loginPage.login(username, password);
  }

  async loginAsStandardUser(): Promise<SauceInventoryPage> {
    await this.loginAs('standard');
    await this.inventoryPage.expectLoaded();
    return this.inventoryPage;
  }

  async loginWithCredentials(username: string, password: string): Promise<void> {
    await this.loginPage.open();
    await this.loginPage.login(username, password);
  }
}
