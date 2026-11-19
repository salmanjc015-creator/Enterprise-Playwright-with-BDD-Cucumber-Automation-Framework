# 🛡️ Anti-Hallucination Guardrails for Test Automation Prompts

This ruleset enforces strict epistemic grounding, zero-assumption boundaries, and framework compliance when AI models (ChatGPT, Claude, Gemini, Copilot, Cursor) generate, refactor, or review code for **Playwright + TypeScript + Cucumber BDD**.

---

## 🛑 Fundamental Epistemic Directives (Zero-Tolerance Rules)

### Rule 1: DO NOT INVENT ANYTHING
* **Never invent non-existent APIs, libraries, or methods**: Use strictly official Playwright 1.40+ APIs. Do not fabricate helper functions (e.g. `page.clickAndWait()`, `page.waitForElement()`, `page.type()`).
* **Never invent test selectors or DOM structures**: Locators must correspond to actual DOM elements inspected in the application, not imagined tags or synthetic CSS classes.
* **Never invent external dependencies**: Do not import uninstalled packages (`axios`, `supertest`, `lodash`, etc.) when native Playwright capabilities (`request`, `expect`) already exist.
* **Never invent test results or passes**: Report only verified execution outputs.

### Rule 2: DO NOT ASSUME
* **Never assume selector stability or element attributes**: Do not assume an element has an `id`, `name`, or `data-testid` without inspection.
* **Never assume backend response contracts**: Do not assume API JSON payloads, status codes, or headers without checking endpoint documentation or live responses.
* **Never assume page timing or network speed**: Rely exclusively on Playwright's Web-First auto-waiting mechanisms and auto-retrying assertions. Never inject arbitrary timeouts (`waitForTimeout()`).
* **Never assume user roles or credentials**: Fetch credentials exclusively from environment variables or centralized configuration (`utils/env.ts`).

### Rule 3: IF INFO IS MISSING, STATE "INSUFFICIENT INFO TO DETERMINE"
* Whenever a selector, endpoint contract, user credential, business expectation, or DOM structure is absent or ambiguous:
  * **STOP immediately**.
  * **DO NOT guess, improvise, or generate placeholder mocks**.
  * **Output explicitly**:
    > `🛑 INSUFFICIENT INFO TO DETERMINE: [Specify the exact missing selector, endpoint, payload, or business requirement required to proceed safely].`

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
Adhere strictly to these Non-Negotiable Directives:

1. DO NOT INVENT ANYTHING: Never invent APIs, methods, endpoints, locators, packages, or test results. Use only verified Playwright 1.40+ APIs and inspected DOM/code artifacts.
2. DO NOT ASSUME: Never assume selector attributes, timing, backend contracts, or business rules. If not directly verified in context, do NOT guess.
3. INSUFFICIENT INFO TO DETERMINE: If any selector, endpoint schema, credential, or requirement is missing or ambiguous, STOP and output:
   "🛑 INSUFFICIENT INFO TO DETERMINE: [specify exact missing information]". Do NOT guess or generate placeholders.
4. ARCHITECTURAL ISOLATION: Never place raw locators or DOM actions in step definitions; strictly encapsulate them inside Page Object Model (POM) classes in pages/.
5. WEB-FIRST ASSERTIONS: All assertions must use asynchronous 'await expect(locator)...' matchers.
6. NO ARBITRARY WAITS: Never use page.waitForTimeout(), sleep(), or deprecated APIs like page.type().
7. NATIVE REST API: Use Playwright's built-in APIRequestContext (request fixture), never external libraries like axios.
```
