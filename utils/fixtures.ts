import { test as base } from 'playwright-bdd';
import { AeContactUsPage } from '../pages/automationexercise/ContactUsPage';
import { AeHomePage } from '../pages/automationexercise/HomePage';
import { AeProductsPage } from '../pages/automationexercise/ProductsPage';
import { DemoQaAlertsPage } from '../pages/demoqa/AlertsPage';
import { DemoQaTextBoxPage } from '../pages/demoqa/TextBoxPage';
import { DemoQaWebTablesPage } from '../pages/demoqa/WebTablesPage';
import { SauceCartPage } from '../pages/saucedemo/CartPage';
import { SauceCheckoutPage } from '../pages/saucedemo/CheckoutPage';
import { SauceInventoryPage } from '../pages/saucedemo/InventoryPage';
import { SauceLoginPage } from '../pages/saucedemo/LoginPage';
import {
  CheckoutCustomerData,
  ContactUsFormData,
  TextBoxUserData,
  WebTableEmployeeData
} from './fakerData';
import { LoginFixture } from './loginFixture';

export interface ScenarioState {
  checkoutCustomer?: CheckoutCustomerData;
  contactUsData?: ContactUsFormData;
  selectedProductName?: string;
  textBoxUser?: TextBoxUserData;
  webTableEmployee?: WebTableEmployeeData;
  promptValue?: string;
}

type AppFixtures = {
  // Utility & Auth Fixtures
  loginFixture: LoginFixture;
  authenticatedInventoryPage: SauceInventoryPage;
  scenarioState: ScenarioState;

  // SauceDemo Pages
  sauceLoginPage: SauceLoginPage;
  sauceInventoryPage: SauceInventoryPage;
  sauceCartPage: SauceCartPage;
  sauceCheckoutPage: SauceCheckoutPage;

  // Automation Exercise Pages
  aeHomePage: AeHomePage;
  aeProductsPage: AeProductsPage;
  aeContactUsPage: AeContactUsPage;

  // DemoQA Pages
  demoQaTextBoxPage: DemoQaTextBoxPage;
  demoQaWebTablesPage: DemoQaWebTablesPage;
  demoQaAlertsPage: DemoQaAlertsPage;
};

const BLOCKED_AD_DOMAINS = [
  'googlesyndication.com',
  'doubleclick.net',
  'googleadservices.com',
  'adservice.google.com',
  'adnxs.com',
  'criteo.com',
  'rubiconproject.com',
  'pubmatic.com',
  'adplus.co.id'
];

export const test = base.extend<AppFixtures>({
  // Block third-party ad networks to keep demo sites fast and flake-free.
  context: async ({ context }, use) => {
    await context.route('**/*', (route) => {
      const url = route.request().url();
      if (BLOCKED_AD_DOMAINS.some((domain) => url.includes(domain))) {
        return route.abort();
      }
      return route.continue();
    });
    await use(context);
  },

  scenarioState: async ({}, use) => {
    await use({});
  },

  loginFixture: async ({ page }, use) => {
    await use(new LoginFixture(page));
  },

  authenticatedInventoryPage: async ({ loginFixture }, use) => {
    const inventoryPage = await loginFixture.loginAsStandardUser();
    await use(inventoryPage);
  },

  // SauceDemo Page Objects
  sauceLoginPage: async ({ page }, use) => {
    await use(new SauceLoginPage(page));
  },
  sauceInventoryPage: async ({ page }, use) => {
    await use(new SauceInventoryPage(page));
  },
  sauceCartPage: async ({ page }, use) => {
    await use(new SauceCartPage(page));
  },
  sauceCheckoutPage: async ({ page }, use) => {
    await use(new SauceCheckoutPage(page));
  },

  // Automation Exercise Page Objects
  aeHomePage: async ({ page }, use) => {
    await use(new AeHomePage(page));
  },
  aeProductsPage: async ({ page }, use) => {
    await use(new AeProductsPage(page));
  },
  aeContactUsPage: async ({ page }, use) => {
    await use(new AeContactUsPage(page));
  },

  // DemoQA Page Objects
  demoQaTextBoxPage: async ({ page }, use) => {
    await use(new DemoQaTextBoxPage(page));
  },
  demoQaWebTablesPage: async ({ page }, use) => {
    await use(new DemoQaWebTablesPage(page));
  },
  demoQaAlertsPage: async ({ page }, use) => {
    await use(new DemoQaAlertsPage(page));
  }
});

export const expect = test.expect;
