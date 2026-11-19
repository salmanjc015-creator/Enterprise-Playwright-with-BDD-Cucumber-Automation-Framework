---
name: playwright-bdd-automation
description: "Author, maintain, and execute enterprise Playwright + TypeScript + Cucumber BDD test suites, Page Object Models, API clients, and accessibility audits following strict anti-hallucination guardrails."
---

# Playwright BDD Automation Skill

This skill provides the standard procedures, architectural conventions, and validation runbooks for authoring, refactoring, and maintaining test suites within this enterprise Playwright + Cucumber BDD framework.

---

## 🏛️ Architecture Overview

Always maintain strict separation of concerns across layers:
* **`features/`**: Declarative Gherkin scenarios focused on user journeys, business outcomes, and API contracts. Zero technical selectors.
* **`pages/`**: Page Object Model (POM) classes encapsulating locators, interactions, and component-specific waits. Must inherit from `BasePage.ts`.
* **`api/`**: Service Object Model classes wrapping Playwright's `APIRequestContext` for REST endpoints. Must inherit from `BaseApiClient.ts`.
* **`steps/`**: BDD step definitions connecting Gherkin expressions to POM methods and assertions. No raw element locators allowed.
* **`utils/`**: Custom Playwright fixtures (`fixtures.ts`), dynamic data generators (`fakerData.ts`), auth managers (`sessionManager.ts`), and a11y auditors (`a11yHelper.ts`).

---

## 🔄 Standard 5-Step Workflow for Adding New Tests

### Step 1: Author Gherkin Feature (`features/<area>/<feature>.feature`)
* Use standard tags for test categorization: `@smoke`, `@regression`, `@api`, `@a11y`, `@mock`, `@session`.
* Keep steps declarative:
  ```gherkin
  @saucedemo @checkout
  Feature: SauceDemo Checkout

    @smoke
    Scenario: User completes order successfully
      Given the user is authenticated on the SauceDemo inventory page
      When the user adds "Sauce Labs Backpack" to the SauceDemo cart
      And the user opens the SauceDemo cart and proceeds to checkout
      Then the SauceDemo order confirmation message "Thank you for your order!" should be displayed
  ```

### Step 2: Implement Page Object / API Client (`pages/` or `api/`)
* Extend `BasePage` for UI or `BaseApiClient` for REST APIs.
* Use locator priority: `getByRole` > `getByLabel` > `getByTestId` / `[data-test="..."]` > `getByText`.
* Always return actionable Promises:
  ```typescript
  import { expect, Locator, Page } from '@playwright/test';
  import { BasePage } from '../base/BasePage';

  export class InventoryPage extends BasePage {
    readonly cartLink: Locator;

    constructor(page: Page) {
      super(page);
      this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async openCart(): Promise<void> {
      await this.safeClick(this.cartLink);
    }
  }
  ```

### Step 3: Register in Fixtures (`utils/fixtures.ts`)
* If creating a new Page Object, register it in `AppFixtures` inside `utils/fixtures.ts`:
  ```typescript
  myNewPage: async ({ page }, use) => {
    await use(new MyNewPage(page));
  },
  ```

### Step 4: Bind Cucumber Step Definitions (`steps/`)
* Bind step text using `createBdd(test)`:
  ```typescript
  import { createBdd } from 'playwright-bdd';
  import { test } from '../../utils/fixtures';

  const { Given, When, Then } = createBdd(test);

  When('the user opens the cart', async ({ myNewPage }) => {
    await myNewPage.openCart();
  });
  ```

### Step 5: Generate Specs & Verify
Always run the validation runbook:
```bash
# 1. Generate BDD specs
npx bddgen

# 2. Typecheck TypeScript
npx tsc --noEmit

# 3. Execute targeted test
npx playwright test --grep "@smoke"
```

---

## 🛡️ Anti-Hallucination & Quality Checklist

Before completing any task:
1. [ ] **No `page.waitForTimeout()` or `sleep()`**: All waits rely on auto-waiting or `await expect(locator)`.
2. [ ] **Web-First Assertions**: All assertions use `await expect(locator)...` matchers.
3. [ ] **Zero Selectors in Steps**: Steps only call methods on injected Page Objects / fixtures.
4. [ ] **Dynamic Data**: Test inputs use `FakerData` rather than hardcoded static strings.
5. [ ] **Step Synchronization**: Running `npx bddgen` completes with code `0` and generates matching `.features-gen/` specs.
