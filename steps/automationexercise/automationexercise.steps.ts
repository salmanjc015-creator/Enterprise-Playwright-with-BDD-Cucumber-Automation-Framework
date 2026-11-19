import { createBdd } from 'playwright-bdd';
import { FakerData } from '../../utils/fakerData';
import { test } from '../../utils/fixtures';

const { Given, When, Then } = createBdd(test);

Given('the user is on the Automation Exercise home page', async ({ aeHomePage }) => {
  await aeHomePage.open();
});

When('the user navigates to the products section', async ({ aeHomePage, aeProductsPage }) => {
  await aeHomePage.navigateToProducts();
  await aeProductsPage.expectAllProductsVisible();
});

When(
  'the user searches for product keyword {string}',
  async ({ aeProductsPage }, keyword: string) => {
    await aeProductsPage.searchProduct(keyword);
  }
);

Then('the search results should display matching items', async ({ aeProductsPage }) => {
  await aeProductsPage.expectSearchResultsContain('Dress');
});

When(
  'the user views details of the first product',
  async ({ aeProductsPage, scenarioState }) => {
    scenarioState.selectedProductName = await aeProductsPage.openFirstProductDetails();
  }
);

Then(
  'the product detail view should be rendered with product information',
  async ({ aeProductsPage, scenarioState }) => {
    await aeProductsPage.expectProductDetailVisible(scenarioState.selectedProductName);
  }
);

When(
  'the user navigates to the contact us page',
  async ({ aeHomePage, aeContactUsPage }) => {
    await aeHomePage.navigateToContactUs();
    await aeContactUsPage.expectLoaded();
  }
);

When(
  'the user submits the contact form with dynamic Faker inquiry data',
  async ({ aeContactUsPage, scenarioState }) => {
    scenarioState.contactUsData = FakerData.contactUsForm();
    await aeContactUsPage.submitContactForm(scenarioState.contactUsData);
  }
);

Then(
  'the contact us submission success message should be displayed',
  async ({ aeContactUsPage }) => {
    await aeContactUsPage.expectSubmissionSuccess();
  }
);
