import { createBdd } from 'playwright-bdd';
import { FakerData } from '../../utils/fakerData';
import { test } from '../../utils/fixtures';

const { Given, When, Then } = createBdd(test);

// --- Text Box Steps ---
Given('the user opens the DemoQA text box form', async ({ demoQaTextBoxPage }) => {
  await demoQaTextBoxPage.open();
});

When(
  'the user fills and submits the text box form with Faker user data',
  async ({ demoQaTextBoxPage, scenarioState }) => {
    scenarioState.textBoxUser = FakerData.textBoxUser();
    await demoQaTextBoxPage.fillAndSubmitForm(scenarioState.textBoxUser);
  }
);

Then(
  'the displayed summary should match the submitted Faker data',
  async ({ demoQaTextBoxPage, scenarioState }) => {
    if (scenarioState.textBoxUser) {
      await demoQaTextBoxPage.expectOutputMatches(scenarioState.textBoxUser);
    }
  }
);

// --- Web Tables Steps ---
Given('the user opens the DemoQA web tables page', async ({ demoQaWebTablesPage }) => {
  await demoQaWebTablesPage.open();
});

When(
  'the user adds a new employee record using Faker data',
  async ({ demoQaWebTablesPage, scenarioState }) => {
    scenarioState.webTableEmployee = FakerData.webTableEmployee();
    await demoQaWebTablesPage.addEmployeeRecord(scenarioState.webTableEmployee);
  }
);

Then(
  'the new employee should appear in the DemoQA table',
  async ({ demoQaWebTablesPage, scenarioState }) => {
    if (scenarioState.webTableEmployee) {
      await demoQaWebTablesPage.searchTable(scenarioState.webTableEmployee.firstName);
      await demoQaWebTablesPage.expectEmployeeVisible(scenarioState.webTableEmployee);
    }
  }
);

// --- Alerts Steps ---
Given('the user opens the DemoQA alerts page', async ({ demoQaAlertsPage }) => {
  await demoQaAlertsPage.open();
});

When(
  'the user accepts the confirmation alert dialog',
  async ({ demoQaAlertsPage }) => {
    await demoQaAlertsPage.triggerAndAcceptConfirm();
  }
);

Then(
  'the confirm result should state {string}',
  async ({ demoQaAlertsPage }, expectedResult: string) => {
    await demoQaAlertsPage.expectConfirmResult(expectedResult);
  }
);

When(
  'the user submits a Faker generated name into the prompt dialog',
  async ({ demoQaAlertsPage, scenarioState }) => {
    scenarioState.promptValue = FakerData.promptInput();
    await demoQaAlertsPage.triggerAndSubmitPrompt(scenarioState.promptValue);
  }
);

Then(
  'the prompt result should display the submitted name',
  async ({ demoQaAlertsPage, scenarioState }) => {
    if (scenarioState.promptValue) {
      await demoQaAlertsPage.expectPromptResult(scenarioState.promptValue);
    }
  }
);
