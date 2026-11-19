import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../../utils/fixtures';

const { Given, When, Then } = createBdd(test);

Given('the browser session is restored from pre-authenticated storageState', async ({ sessionPage }) => {
  // sessionPage is pre-configured with storageState cookies via the sessionPage fixture
  expect(sessionPage).toBeDefined();
});

When('the user navigates directly to the SauceDemo inventory page via session', async ({ sessionInventoryPage }) => {
  await sessionInventoryPage.open();
});

Then(
  'the user should immediately land on the SauceDemo inventory page without encountering the login form',
  async ({ sessionInventoryPage, sessionPage }) => {
    await sessionInventoryPage.expectLoaded();
    // Validate that we are not on the login page
    expect(sessionPage.url()).not.toContain('login');
    expect(sessionPage.url()).toContain('inventory.html');
  }
);
