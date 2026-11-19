# 🛡️ Anti-Hallucination Guardrails for Test Automation Prompts

This ruleset enforces strict accuracy, framework compliance, and resilience when AI models (ChatGPT, Claude, Gemini, Copilot, Cursor) generate or refactor code for **Playwright + TypeScript + Cucumber BDD**.

---

## 🚫 The 7 Deadly Hallucinations in Test Automation

### 1. Fake or Deprecated Playwright APIs
* ❌ **NEVER USE**: `page.waitForTimeout()`, `sleep()`, `page.waitForElement()`, `page.clickAndWait()`, `page.type()`, `page.waitForNavigation()`.
* ✅ **MANDATORY**: Use Web-First auto-waiting locators and actions:
  * `await locator.click()` (auto-waits for actionability: attached, visible, stable, receives events)
  * `await locator.fill('value')` (clears and inputs text)
  * `await expect(locator).toBeVisible()` (auto-retrying assertion up to expect timeout)

### 2. Brittle or Invented Locators
* ❌ **NEVER USE**: Absolute XPaths (`/html/body/div[2]/div`), deep nested CSS (`div > div > span.btn`), or synthetic tags that don't exist.
* ✅ **MANDATORY LOCATOR HIERARCHY**:
  1. `page.getByRole('button', { name: 'Submit' })` (Accessibility role & accessible name)
  2. `page.getByLabel('Username')` (Associated form label)
  3. `page.getByTestId('data-test-name')` / `page.locator('[data-test="..."]')`
  4. `page.getByText('Products', { exact: true })`
  5. Scoped locators: `parentLocator.filter({ hasText: 'Item 1' }).getByRole('button')`

### 3. Non-Retrying Assertions (Sync Expect Anti-Pattern)
* ❌ **HALLUCINATION**: 
  ```typescript
  // Flaky! Does not auto-retry against dynamic DOM updates
  const count = await page.locator('.item').count();
  expect(count).toBe(5);
  const isVisible = await page.locator('.toast').isVisible();
  expect(isVisible).toBe(true);
  ```
* ✅ **MANDATORY**: Always await Playwright's web-first assertions:
  ```typescript
  await expect(page.locator('.item')).toHaveCount(5);
  await expect(page.locator('.toast')).toBeVisible();
  ```

### 4. Boundary Violation: Raw Locators in Step Definitions
* ❌ **HALLUCINATION**: Calling `page.locator()` or `page.click()` directly inside `steps/*.steps.ts`.
* ✅ **MANDATORY**: Encapsulate all DOM queries and actions within `pages/` Page Object Model (POM) classes. Step definitions only coordinate Page Objects and custom fixtures:
  ```typescript
  // steps/saucedemo/saucedemo.steps.ts
  When('the user adds {string} to the cart', async ({ sauceInventoryPage }, productName: string) => {
    await sauceInventoryPage.addProductToCart(productName);
  });
  ```

### 5. Unbound Gherkin Steps
* ❌ **HALLUCINATION**: Writing Gherkin steps in `.feature` files that use different wording, punctuation, or parameter types than defined in step definitions.
* ✅ **MANDATORY**: 
  * Always cross-verify Gherkin step text against registered definitions.
  * Use standard Cucumber expressions: `{string}`, `{int}`, `{float}`.
  * Run `npx bddgen` immediately after editing feature files to catch missing bindings.

### 6. External HTTP Library Hallucinations
* ❌ **HALLUCINATION**: Importing `axios`, `supertest`, `got`, or `node-fetch` for API testing.
* ✅ **MANDATORY**: Use Playwright's native `APIRequestContext` via the `request` fixture or custom `api/` Service Object clients.

### 7. Hardcoded Random Data & Session Duplication
* ❌ **HALLUCINATION**: Hardcoding static strings like `'testuser123@gmail.com'` or re-logging into UI for every single test.
* ✅ **MANDATORY**: 
  * Use `@faker-js/faker` via `utils/fakerData.ts` for clean test isolation.
  * Use Playwright `storageState` (`utils/sessionManager.ts`) to reuse authenticated sessions.

---

## 📋 Copy-Paste System Prompt for AI Automation Assistants

When prompting an AI to generate or review tests in this framework, prepend this prompt:

```text
You are an expert Senior SDET specializing in Playwright, TypeScript, and Cucumber BDD (playwright-bdd).
Follow these strict anti-hallucination rules:
1. Adhere strictly to the Page Object Model (POM): NEVER place locators or page actions directly in step definitions.
2. Use only official Playwright 1.40+ APIs with auto-waiting. NEVER use page.waitForTimeout(), sleep(), or deprecated APIs like page.type().
3. All assertions must use asynchronous 'await expect(locator)...' web-first matchers.
4. Prefer accessible locators: getByRole(), getByLabel(), getByTestId(), or data-test attributes over brittle CSS/XPath.
5. REST API calls must use Playwright's built-in APIRequestContext, not axios or fetch.
6. Ensure any new Gherkin steps exactly match cucumber expressions with types {string} or {int}.
7. Generate dynamic test data using @faker-js/faker utilities.
```
