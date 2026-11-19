# 🎭 Enterprise Playwright + BDD Cucumber Automation Framework

[![Playwright Tests](https://img.shields.io/badge/Playwright-v1.50+-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cucumber BDD](https://img.shields.io/badge/Cucumber_BDD-Gherkin-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)](https://cucumber.io/)
[![Reporting Labs](https://img.shields.io/badge/Reporting_Labs-Single_File_HTML-FF6F00?style=for-the-badge)](https://reportinglabs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

An enterprise-ready, portfolio-grade UI test automation framework built with **Playwright**, **TypeScript**, **`playwright-bdd`** (Cucumber Gherkin), and the **Page Object Model (POM)**. Engineered with production architectural patterns, including **Login Fixtures**, dynamic **Faker Data Providers**, ad-blocking network interception, and modern **Reporting Labs** single-file HTML reports.

Automates realistic end-to-end scenarios across leading demo web applications:
1. **[SauceDemo](https://www.saucedemo.com)** — Multi-role authentication, sorting, and dynamic cart/checkout flow.
2. **[Automation Exercise](https://automationexercise.com)** — Catalog search, product detail views, dialog handling, and dynamic contact inquiries.
3. **[DemoQA](https://demoqa.com)** — Form controls, dynamic web tables with employee records, and native JavaScript alert/confirm/prompt handling.

---

## 🏛️ Framework Architecture

The framework is structured following clean architectural boundaries:

```text
playwright-bdd-automation/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI pipeline with artifact upload
├── features/                    # Cucumber BDD Feature files (.feature)
│   ├── saucedemo/
│   │   ├── login.feature
│   │   └── checkout.feature
│   ├── automationexercise/
│   │   ├── products.feature
│   │   └── contactus.feature
│   └── demoqa/
│       ├── elements.feature
│       └── alerts.feature
├── pages/                       # Page Object Model (POM) classes
│   ├── base/
│   │   └── BasePage.ts          # Base class: common interactions, consent handler
│   ├── saucedemo/
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── automationexercise/
│   │   ├── HomePage.ts
│   │   ├── ProductsPage.ts
│   │   └── ContactUsPage.ts
│   └── demoqa/
│       ├── TextBoxPage.ts
│       ├── WebTablesPage.ts
│       └── AlertsPage.ts
├── steps/                       # Cucumber BDD Step Definitions
│   ├── saucedemo/
│   │   └── saucedemo.steps.ts
│   ├── automationexercise/
│   │   └── automationexercise.steps.ts
│   └── demoqa/
│       └── demoqa.steps.ts
├── utils/                       # Utilities & Fixtures
│   ├── env.ts                   # Environment configuration & credentials
│   ├── fakerData.ts             # Realistic random test data generator (@faker-js/faker)
│   ├── loginFixture.ts          # Centralized login handler & authentication fixture
│   └── fixtures.ts              # Playwright test.extend() custom fixtures & network ad-blocker
├── .env.example                 # Config template
├── package.json                 # Dependencies & test run scripts
├── playwright.config.ts         # Playwright runner + Reporting Labs configuration
└── tsconfig.json                # TypeScript compiler configuration
```

---

## ✨ Key Architectural Highlights

### 1. Page Object Model (POM)
All UI locators and page interactions reside strictly within encapsulated classes inheriting from `BasePage.ts`. Step definitions never touch raw locators, ensuring high maintainability.

### 2. Custom Login Fixtures
Authentication logic is decoupled from individual tests:
* `LoginFixture.ts` manages credentials and multi-role login flows (`standard_user`, `locked_out_user`).
* Custom fixture `authenticatedInventoryPage` allows tests to start directly on the logged-in dashboard without repeating login steps in every scenario.

### 3. Dynamic Test Data Generation with Faker (`@faker-js/faker`)
Zero hard-coded customer names, emails, addresses, or table records. `FakerData.ts` generates fresh, realistic data per test execution to prevent state collisions.

### 4. Resilient Network Interception
Demo applications frequently serve third-party ad networks that introduce flakiness. The framework intercepts and aborts unneeded third-party tracking/ad domains (`googlesyndication`, `doubleclick`, etc.) at the Playwright browser context level for lightning-fast, rock-solid runs.

### 5. Reporting Labs Integration
Zero manual reporting boilerplate. `playwright.config.ts` registers `reporting-labs`, producing self-contained, interactive single-file HTML reports containing:
* BDD Feature / Scenario / Given-When-Then hierarchy
* Execution timeline and step-level durations
* Auto-captured screenshots, traces, and video attachments on test failure

---

## 🚀 Quickstart Guide

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### 1. Clone & Install Dependencies
```bash
git clone <your-github-repo-url>
cd playwright-bdd-automation
npm install
npx playwright install --with-deps chromium
```

### 2. Environment Setup
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
*(On Windows PowerShell: `Copy-Item .env.example .env`)*

---

## 🧪 Test Execution Scripts

| Command | Description |
| :--- | :--- |
| `npm test` | Generates BDD tests (`bddgen`) and executes all scenarios across all sites |
| `npm run test:smoke` | Runs only `@smoke` tagged scenarios |
| `npm run test:saucedemo` | Runs only SauceDemo feature scenarios (`@saucedemo`) |
| `npm run test:automationexercise` | Runs only Automation Exercise feature scenarios (`@automationexercise`) |
| `npm run test:demoqa` | Runs only DemoQA feature scenarios (`@demoqa`) |
| `npm run test:headed` | Executes tests with visible browser window |
| `npm run test:ui` | Launches interactive Playwright UI mode runner |
| `npm run typecheck` | Validates TypeScript types across the entire project |
| `npm run clean` | Cleans generated features, reports, and test artifacts |

---

## 📊 Viewing Test Reports

After running tests, open the generated **Reporting Labs** interactive HTML report:
```bash
# Open in default browser (Windows)
start reports/reporting-labs/index.html

# Open on macOS / Linux
open reports/reporting-labs/index.html   # macOS
xdg-open reports/reporting-labs/index.html # Linux
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

A ready-to-use GitHub Actions workflow is provided at `.github/workflows/ci.yml`. On every `push` and `pull_request`:
1. Checks out code and installs dependencies via `npm ci`.
2. Installs headless Chromium and system libraries.
3. Executes the full BDD test suite.
4. Uploads the single-file **Reporting Labs** HTML report as a workflow artifact available for download.
5. Uploads Playwright traces and failure screenshots on any regression.

---

## 👤 Author & Portfolio Showcase
Built by **[Your Name]** — QA Automation Engineer.
Showcasing modern Playwright BDD architecture, TypeScript type safety, and production test engineering practices.
