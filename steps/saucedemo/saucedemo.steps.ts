import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { FakerData } from '../../utils/fakerData';
import { test } from '../../utils/fixtures';
import { SauceUserRole } from '../../utils/loginFixture';

const { Given, When, Then } = createBdd(test);

// --- Authentication Steps ---
Given('the user is on the SauceDemo login page', async ({ sauceLoginPage }) => {
  await sauceLoginPage.open();
});

When(
  'the user logs in as a {string} user using the login fixture',
  async ({ loginFixture }, role: string) => {
    await loginFixture.loginAs(role as SauceUserRole);
  }
);

Then(
  'the user should land on the SauceDemo inventory page',
  async ({ sauceInventoryPage }) => {
    await sauceInventoryPage.expectLoaded();
  }
);

Then(
  'the SauceDemo login error should contain {string}',
  async ({ sauceLoginPage }, expectedError: string) => {
    await sauceLoginPage.expectErrorMessage(expectedError);
  }
);

// --- Inventory & Checkout Steps ---
Given(
  'the user is authenticated on the SauceDemo inventory page',
  async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.expectLoaded();
  }
);

When(
  'the user adds {string} to the SauceDemo cart',
  async ({ sauceInventoryPage }, productName: string) => {
    await sauceInventoryPage.addProductToCart(productName);
    await sauceInventoryPage.expectCartCount(1);
  }
);

When(
  'the user opens the SauceDemo cart and proceeds to checkout',
  async ({ sauceInventoryPage, sauceCartPage }) => {
    await sauceInventoryPage.openCart();
    await sauceCartPage.proceedToCheckout();
  }
);

When(
  'the user submits Faker-generated checkout details and finishes the order',
  async ({ sauceCheckoutPage, scenarioState }) => {
    scenarioState.checkoutCustomer = FakerData.checkoutCustomer();
    await sauceCheckoutPage.fillCustomerInfo(scenarioState.checkoutCustomer);
    await sauceCheckoutPage.completeOrder();
  }
);

Then(
  'the SauceDemo order confirmation message {string} should be displayed',
  async ({ sauceCheckoutPage }, message: string) => {
    await sauceCheckoutPage.expectOrderConfirmed(message);
  }
);

When(
  'the user sorts SauceDemo products by {string}',
  async ({ sauceInventoryPage }, sortOption: string) => {
    await sauceInventoryPage.sortBy(sortOption as 'az' | 'za' | 'lohi' | 'hilo');
  }
);

Then(
  'the SauceDemo product prices should be ordered ascending',
  async ({ sauceInventoryPage }) => {
    const prices = await sauceInventoryPage.getAllProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  }
);
