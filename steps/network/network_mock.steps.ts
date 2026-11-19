import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../../utils/fixtures';

const { When, Then } = createBdd(test);

When(
  'the network route for {string} is intercepted to return status {int}',
  async ({ page }, endpoint: string, status: number) => {
    await page.route(`**${endpoint}`, (route) => {
      route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Internal Server Error',
          message: 'Simulated backend crash via Playwright route interception'
        })
      });
    });
  }
);

Then(
  'a browser request to {string} receives HTTP status {int} with error {string}',
  async ({ page }, endpoint: string, expectedStatus: number, expectedError: string) => {
    const result = await page.evaluate(async (url) => {
      const res = await fetch(url);
      return { status: res.status, body: await res.json() };
    }, endpoint);

    expect(result.status).toBe(expectedStatus);
    expect(result.body.error).toBe(expectedError);
  }
);

When(
  'the network route for {string} is fulfilled with mock promo code {string} and discount {string}',
  async ({ page }, endpoint: string, promoCode: string, discount: string) => {
    await page.route(`**${endpoint}`, (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          active: true,
          promoCode,
          discount,
          timestamp: new Date().toISOString()
        })
      });
    });
  }
);

Then(
  'a browser request to {string} receives discount {string} for promo code {string}',
  async ({ page }, endpoint: string, expectedDiscount: string, expectedPromo: string) => {
    const result = await page.evaluate(async (url) => {
      const res = await fetch(url);
      return await res.json();
    }, endpoint);

    expect(result.active).toBe(true);
    expect(result.promoCode).toBe(expectedPromo);
    expect(result.discount).toBe(expectedDiscount);
  }
);
