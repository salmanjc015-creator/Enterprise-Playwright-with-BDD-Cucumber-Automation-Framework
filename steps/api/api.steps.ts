import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../../utils/fixtures';

const { When, Then } = createBdd(test);

// --- Products API Steps ---

When('the client sends a GET request to {string}', async ({ productsApiClient, scenarioState }, endpoint: string) => {
  const response = await productsApiClient.get(endpoint);
  scenarioState.apiResponse = response;
  const text = await response.text();
  try {
    scenarioState.apiResponseBody = JSON.parse(text);
  } catch {
    scenarioState.apiResponseBody = text;
  }
});

When('the client searches for product keyword {string} via API', async ({ productsApiClient, scenarioState }, keyword: string) => {
  const response = await productsApiClient.searchProduct(keyword);
  scenarioState.apiResponse = response;
  const text = await response.text();
  try {
    scenarioState.apiResponseBody = JSON.parse(text);
  } catch {
    scenarioState.apiResponseBody = text;
  }
});

Then('the API response status code should be {int}', async ({ scenarioState }, expectedStatus: number) => {
  expect(scenarioState.apiResponse).toBeDefined();
  expect(scenarioState.apiResponse!.status()).toBe(expectedStatus);
});

Then('the response body should contain a non-empty products array', async ({ scenarioState }) => {
  expect(scenarioState.apiResponseBody).toBeDefined();
  expect(scenarioState.apiResponseBody.products).toBeInstanceOf(Array);
  expect(scenarioState.apiResponseBody.products.length).toBeGreaterThan(0);
});

Then('each product in the response should contain valid id, name, and price fields', async ({ scenarioState }) => {
  const products = scenarioState.apiResponseBody.products;
  for (const product of products.slice(0, 10)) {
    expect(product.id).toBeDefined();
    expect(typeof product.name).toBe('string');
    expect(product.name.length).toBeGreaterThan(0);
    expect(typeof product.price).toBe('string');
  }
});

Then('all search result items should have a valid name and price', async ({ scenarioState }) => {
  const products = scenarioState.apiResponseBody.products;
  for (const product of products) {
    expect(product.name).toBeDefined();
    expect(product.price).toBeDefined();
  }
});

// --- User Authentication API Steps ---

When(
  'the client attempts to verify login with email {string} and password {string} via API',
  async ({ userApiClient, scenarioState }, email: string, pass: string) => {
    const response = await userApiClient.verifyLogin(email, pass);
    scenarioState.apiResponse = response;
    const text = await response.text();
    scenarioState.apiResponseBody = JSON.parse(text);
  }
);

When(
  'the client sends a verify login request without credentials via API',
  async ({ userApiClient, scenarioState }) => {
    const response = await userApiClient.verifyLogin();
    scenarioState.apiResponse = response;
    const text = await response.text();
    scenarioState.apiResponseBody = JSON.parse(text);
  }
);

Then('the response body responseCode should be {int}', async ({ scenarioState }, expectedCode: number) => {
  expect(scenarioState.apiResponseBody.responseCode).toBe(expectedCode);
});

Then('the response body message should be {string}', async ({ scenarioState }, expectedMessage: string) => {
  expect(scenarioState.apiResponseBody.message).toBe(expectedMessage);
});
