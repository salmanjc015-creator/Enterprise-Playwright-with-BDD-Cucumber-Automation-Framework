import { APIResponse, Page } from '@playwright/test';
import { test as base } from 'playwright-bdd';
import { ProductsApiClient } from '../api/automationexercise/ProductsApiClient';
import { UserApiClient } from '../api/automationexercise/UserApiClient';
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
import { A11yHelper } from './a11yHelper';
import {
  CheckoutCustomerData,
  ContactUsFormData,
  TextBoxUserData,
  WebTableEmployeeData
} from './fakerData';
import { LoginFixture } from './loginFixture';
import { SessionManager } from './sessionManager';

export interface ScenarioState {
  checkoutCustomer?: CheckoutCustomerData;
  contactUsData?: ContactUsFormData;
  selectedProductName?: string;
  textBoxUser?: TextBoxUserData;
  webTableEmployee?: WebTableEmployeeData;
  promptValue?: string;
  // API Scenario State
  apiResponse?: APIResponse;
  apiResponseBody?: any;
  // Hybrid Scenario State
  hybridProduct?: { name: string; price: string };
  // Mock Scenario State
  mockResponse?: { status: number; body: any };
}

type AppFixtures = {
  // Utility & Auth Fixtures
  loginFixture: LoginFixture;
  authenticatedInventoryPage: SauceInventoryPage;
  scenarioState: ScenarioState;

  // Accessibility Audit Fixture
  a11yHelper: A11yHelper;

  // Session Reuse Fixtures (Playwright storageState)
  sessionPage: Page;
  sessionInventoryPage: SauceInventoryPage;

  // API Client Fixtures
  productsApiClient: ProductsApiClient;
  userApiClient: UserApiClient;

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

  // Accessibility Auditor Fixture
  a11yHelper: async ({ page }, use) => {
    await use(new A11yHelper(page));
  },

  // API Client Fixtures (powered by Playwright's built-in request fixture)
  productsApiClient: async ({ request }, use) => {
    await use(new ProductsApiClient(request));
  },

  userApiClient: async ({ request }, use) => {
    await use(new UserApiClient(request));
  },

  // StorageState Session Reuse Fixture
  sessionPage: async ({ browser }, use) => {
    const storageStatePath = SessionManager.ensureSauceDemoSession('standard_user');
    const context = await browser.newContext({ storageState: storageStatePath });
    await context.route('**/*', (route) => {
      const url = route.request().url();
      if (BLOCKED_AD_DOMAINS.some((domain) => url.includes(domain))) {
        return route.abort();
      }
      return route.continue();
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  sessionInventoryPage: async ({ sessionPage }, use) => {
    await use(new SauceInventoryPage(sessionPage));
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
