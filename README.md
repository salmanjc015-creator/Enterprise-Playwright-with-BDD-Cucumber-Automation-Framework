# 🎭 Enterprise Playwright + BDD Cucumber Automation Framework

[![Playwright Tests](https://img.shields.io/badge/Playwright-v1.50+-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cucumber BDD](https://img.shields.io/badge/Cucumber_BDD-Gherkin-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)](https://cucumber.io/)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-Axe_Core_WCAG_2.1_AA-7B1FA2?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Docker Ready](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](Dockerfile)
[![Reporting Labs](https://img.shields.io/badge/Reporting_Labs-Single_File_HTML-FF6F00?style=for-the-badge)](https://reportinglabs.dev)
[![Live Report](https://img.shields.io/badge/Live_Report-GitHub_Pages-brightgreen?style=for-the-badge&logo=github)](https://salmanjc015-creator.github.io/playwright-bdd-automation/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

An enterprise-grade, portfolio-ready test automation framework built with **Playwright**, **TypeScript**, **`playwright-bdd`** (Cucumber Gherkin), the **Page Object Model (POM)**, and the **Service Object Model**. Designed to demonstrate production-level testing standards across E2E UI journeys, REST APIs, accessibility compliance, visual layout regression, network fault injection, and containerized CI/CD execution.

---

## 🏛️ Comprehensive Framework Architecture

```text
playwright-bdd-automation/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI: parallel runs + GitHub Pages report deploy
├── api/                         # 🌐 Service Object Model (REST API Client Layer)
│   ├── base/
│   │   └── BaseApiClient.ts     # Core HTTP wrapper over Playwright APIRequestContext
│   └── automationexercise/
│       ├── ProductsApiClient.ts # Product catalog and search API endpoints
│       └── UserApiClient.ts     # User authentication and verification API endpoints
├── features/                    # 🥒 Cucumber BDD Feature Specifications (.feature)
│   ├── a11y/                    # ♿ WCAG 2.1 Level A & AA accessibility audits
│   │   └── accessibility.feature
│   ├── api/                     # 🌐 Pure REST API BDD specifications
│   │   ├── products_api.feature
│   │   └── users_api.feature
│   ├── hybrid/                  # ⚡ Hybrid API-seeded UI contract consistency
│   │   └── hybrid_catalog.feature
│   ├── network/                 # 🔀 Network route mocking & HTTP 500 fault injection
│   │   └── network_mock.feature
│   ├── visual/                  # 👁️ Visual snapshot & component layout regression
│   │   └── visual_comparison.feature
│   ├── saucedemo/               # 🛒 E2E shopping, login, and storageState reuse
│   │   ├── login.feature
│   │   ├── checkout.feature
│   │   └── session.feature
│   ├── automationexercise/      # 🛍️ Catalog search, details, and dynamic contact inquiries
│   │   ├── products.feature
│   │   └── contactus.feature
│   └── demoqa/                  # 📋 Dynamic web tables, forms, and browser dialogs
│       ├── elements.feature
│       └── alerts.feature
├── pages/                       # 📄 Page Object Model (POM) classes
│   ├── base/
│   │   └── BasePage.ts          # Resilient click/fill, URL handlers, cookie consent bypass
│   ├── saucedemo/               # LoginPage, InventoryPage, CartPage, CheckoutPage
│   ├── automationexercise/      # HomePage, ProductsPage, ContactUsPage
│   └── demoqa/                  # TextBoxPage, WebTablesPage, AlertsPage
├── steps/                       # 🧩 Cucumber Step Definitions
│   ├── a11y/                    # Accessibility steps (Axe-core bindings)
│   ├── api/                     # REST API assertions & schema validation
│   ├── hybrid/                  # Hybrid API+UI consistency steps
│   ├── network/                 # Route interception & mock fulfillment steps
│   ├── visual/                  # Component snapshot validation steps
│   ├── saucedemo/               # SauceDemo step definitions & session bindings
│   ├── automationexercise/      # Automation Exercise step definitions
│   └── demoqa/                  # DemoQA step definitions
├── utils/                       # 🛠️ Utilities & Custom Playwright Fixtures
│   ├── a11yHelper.ts            # Axe-core WCAG 2.1 AA scanner & violation formatter
│   ├── env.ts                   # Environment configuration & credentials
│   ├── fakerData.ts             # Dynamic random data generator (@faker-js/faker)
│   ├── loginFixture.ts          # Centralized login handler & multi-role fixture
│   ├── sessionManager.ts        # Playwright storageState generator & session manager
│   └── fixtures.ts              # test.extend() custom fixtures (API, POMs, a11y, session)
├── Dockerfile                   # Production Docker container based on Microsoft Playwright
├── docker-compose.yml           # One-command containerized test execution
├── .dockerignore                # Container build exclusions
├── .env.example                 # Environment configuration template
├── package.json                 # Project dependencies & targeted npm test scripts
├── playwright.config.ts         # Runner config: cross-browser, mobile devices, reporting
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 💎 Enterprise Architectural Highlights

### 1. Automated WCAG 2.1 AA Accessibility Auditing (`@axe-core/playwright`)
* Integrates Deque’s industry-standard **Axe-core** engine directly into the BDD lifecycle.
* Scans pages and critical user journeys against WCAG 2.1 Level A and AA rules (`serious` and `critical` impacts).
* Produces actionable, node-level violation summaries (rule ID, help URL, selector paths).

### 2. Network Route Interception & Fault Injection (`page.route()`)
* Demonstrates advanced browser network control:
  * **HTTP 500 Chaos Engineering**: Simulates microservice crashes and verifies fallback UI handling without backend dependencies.
  * **Custom Mock Fulfillment**: Injects dynamic mock promotion codes and discount payloads (`route.fulfill()`) into client-side fetch requests.
  * **Network Ad-Blocker**: Intercepts and aborts third-party trackers and ad networks (`googlesyndication`, `doubleclick`) at the context level for lightning-fast runs.

### 3. Hybrid UI + REST API Workflows (The "Fast Setup" Pattern)
* Solves the flakiness and performance bottlenecks of UI-only test preconditions:
  * Queries backend REST endpoints via `APIRequestContext` in **~150ms** to fetch catalog and pricing records.
  * Directly navigates the browser UI to assert data consistency between backend API responses and frontend DOM rendering.

### 4. Session State Persistence (`storageState`)
* Pre-authenticates and persists session cookies and storage tokens to `.auth/` using Playwright’s native `storageState`.
* The `sessionPage` fixture launches authenticated browser contexts instantly, bypassing the UI login form.
* Cuts test execution time by **over 50%** for post-login regression suites.

### 5. Built-in REST API Testing (`APIRequestContext` / Service Object Model)
* Native Playwright API automation without external dependencies (no Axios or Supertest needed).
* Clean **Service Object Model** (`api/` layer) with type-safe methods, status verification, JSON array validation, and query parameter handling.

### 6. Visual Component Snapshotting
* Captures pixel-accurate component screenshots of critical interactive cards (e.g. login container).
* Validates image format integrity, rendering stability, and layout dimensions across builds.

### 7. Cross-Browser & Mobile Emulation Matrix
* Configured in `playwright.config.ts` for desktop and mobile form factors:
  * **Chromium** (Desktop Chrome)
  * **Firefox** (Desktop Gecko)
  * **WebKit** (Desktop Safari)
  * **Mobile Chrome** (`Pixel 7`)
  * **Mobile Safari** (`iPhone 14`)

### 8. Containerized Execution (Docker & docker-compose)
* Official Microsoft Playwright container (`mcr.microsoft.com/playwright:v1.50.0-noble`).
* Guarantees zero environment drift between local developer machines and CI runners.

### 9. Single-File Interactive Reporting & CI/CD Deployment
* Powered by **Reporting Labs**: self-contained single-file HTML reports containing Given-When-Then hierarchy, step-level duration timelines, screenshots, and PDF export.
* GitHub Actions pipeline (`.github/workflows/ci.yml`) automatically deploys test reports to **GitHub Pages** on every push to `main`.

---

## 🧪 Test Execution Scripts

| Command | Description |
| :--- | :--- |
| `npm test` | Generates BDD tests (`bddgen`) and executes all scenarios on Chromium |
| `npm run test:api` | Executes REST API scenarios (`@api`) |
| `npm run test:a11y` | Executes WCAG 2.1 AA accessibility audit scenarios (`@a11y`) |
| `npm run test:mock` | Executes network route interception & 500 fault injection tests (`@mock`) |
| `npm run test:hybrid` | Executes hybrid UI + REST API catalog consistency tests (`@hybrid`) |
| `npm run test:session` | Executes `storageState` session state reuse tests (`@session`) |
| `npm run test:visual` | Executes visual component snapshot tests (`@visual`) |
| `npm run test:smoke` | Runs all `@smoke` tagged scenarios across UI, API, and a11y |
| `npm run test:all-browsers`| Runs the full test suite across the cross-browser & mobile device matrix |
| `npm run test:saucedemo` | Runs only SauceDemo feature scenarios (`@saucedemo`) |
| `npm run test:automationexercise` | Runs only Automation Exercise feature scenarios (`@automationexercise`) |
| `npm run test:demoqa` | Runs only DemoQA feature scenarios (`@demoqa`) |
| `npm run test:headed` | Executes tests with visible browser window |
| `npm run test:ui` | Launches interactive Playwright UI mode runner |
| `npm run typecheck` | Validates TypeScript types across the entire project (`tsc --noEmit`) |
| `npm run clean` | Cleans generated features, reports, `.auth`, and test artifacts |

---

## 🐳 Running with Docker

Run the entire test suite in an isolated Docker container with one command:

```bash
# Build and run tests via docker compose
docker compose up --build --exit-code-from test-runner

# View generated reports on your host machine
open reports/reporting-labs/index.html
```

---

## 💼 Recruiter & Resume Highlights

Copy-paste these bullet points directly into your resume or LinkedIn profile:

* **Engineered an enterprise-grade UI & REST API test automation framework** using Playwright, TypeScript, and Cucumber BDD (`playwright-bdd`), achieving 100% test scenario automation across multi-app architectures.
* **Integrated automated WCAG 2.1 AA accessibility audits** into the test pipeline using `@axe-core/playwright`, detecting critical a11y violations during functional test runs.
* **Implemented network route interception and fault injection** (`page.route()`), simulating HTTP 500 server crashes and dynamic mock responses to test frontend resiliency without backend dependencies.
* **Optimized test execution time by 50%+** by implementing Playwright `storageState` session caching, completely bypassing repetitive UI authentication flows.
* **Architected Hybrid UI + REST API workflows** using Playwright's native `APIRequestContext`, establishing contract consistency checks between backend REST endpoints and frontend DOM rendering.
* **Dockerized the test suite** using official Microsoft Playwright images and created a GitHub Actions CI/CD pipeline deploying live test reports to GitHub Pages on every release.
