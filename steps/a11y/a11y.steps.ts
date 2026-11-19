import { createBdd } from 'playwright-bdd';
import { test } from '../../utils/fixtures';

const { Then } = createBdd(test);

Then('the current page should pass WCAG accessibility standards', async ({ a11yHelper }) => {
  await a11yHelper.expectNoViolations({
    tags: ['wcag2a', 'wcag2aa'],
    includedImpacts: ['serious', 'critical']
  });
});
