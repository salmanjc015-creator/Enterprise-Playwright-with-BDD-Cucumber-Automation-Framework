import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../../utils/fixtures';

const { Given, When, Then } = createBdd(test);

Given(
  'the client queries the REST API to fetch available products',
  async ({ productsApiClient, scenarioState }) => {
    const response = await productsApiClient.getAllProducts();
    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text());
    expect(body.products).toBeDefined();
    expect(body.products.length).toBeGreaterThan(0);

    // Select the first product from the API response
    const selected = body.products[0];
    scenarioState.hybridProduct = {
      name: selected.name,
      price: selected.price
    };
  }
);

When(
  'the user opens the Automation Exercise products section in the browser',
  async ({ aeHomePage, aeProductsPage }) => {
    await aeHomePage.open();
    await aeHomePage.navigateToProducts();
    await aeProductsPage.expectAllProductsVisible();
  }
);

When(
  'the user searches for the API-selected product keyword in the UI',
  async ({ aeProductsPage, scenarioState }) => {
    expect(scenarioState.hybridProduct).toBeDefined();
    await aeProductsPage.searchProduct(scenarioState.hybridProduct!.name);
  }
);

Then(
  'the product search results in the UI should display the API-selected product',
  async ({ aeProductsPage, scenarioState }) => {
    expect(scenarioState.hybridProduct).toBeDefined();
    await aeProductsPage.expectSearchResultsContain(scenarioState.hybridProduct!.name);
  }
);
