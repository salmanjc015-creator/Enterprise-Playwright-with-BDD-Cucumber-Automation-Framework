import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { envConfig } from './utils/env';

/**
 * Configure playwright-bdd feature directories and step definitions.
 */
const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['steps/**/*.ts', 'utils/fixtures.ts']
});

export default defineConfig({
  testDir,
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 1,

  reporter: [
    ['list'],
    [
      'reporting-labs',
      {
        title: 'Playwright BDD Enterprise Automation Report',
        outputDir: 'reports/reporting-labs',
        warnMissingMeta: false
      }
    ],
    ['html', { outputFolder: 'reports/playwright-html', open: 'never' }]
  ],

  use: {
    headless: envConfig.execution.headless,
    actionTimeout: envConfig.execution.actionTimeout,
    navigationTimeout: envConfig.execution.navigationTimeout,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1366, height: 768 }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] }
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] }
    }
  ]
});
