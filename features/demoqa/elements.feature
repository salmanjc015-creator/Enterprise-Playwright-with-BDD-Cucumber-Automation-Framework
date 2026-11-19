@demoqa @elements
Feature: DemoQA Elements Form and Table Workflows

  @smoke
  Scenario: Submit dynamic text box form with Faker user data
    Given the user opens the DemoQA text box form
    When the user fills and submits the text box form with Faker user data
    Then the displayed summary should match the submitted Faker data

  @regression
  Scenario: Add dynamic employee record to web table using Faker data
    Given the user opens the DemoQA web tables page
    When the user adds a new employee record using Faker data
    Then the new employee should appear in the DemoQA table
