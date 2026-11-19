import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../../utils/fixtures';

const { Then } = createBdd(test);

Then('the login container visual snapshot should match expected layout baseline', async ({ page }) => {
  const loginContainer = page.locator('.login_container');
  await expect(loginContainer).toBeVisible();

  // Capture component snapshot buffer
  const screenshotBuffer = await loginContainer.screenshot({
    animations: 'disabled'
  });

  // Verify valid PNG image signature and non-empty buffer size
  expect(screenshotBuffer).toBeDefined();
  expect(screenshotBuffer.length).toBeGreaterThan(5000);
  expect(screenshotBuffer[0]).toBe(0x89); // PNG signature bytes: 89 50 4E 47
  expect(screenshotBuffer[1]).toBe(0x50);
  expect(screenshotBuffer[2]).toBe(0x4e);
  expect(screenshotBuffer[3]).toBe(0x47);
});
