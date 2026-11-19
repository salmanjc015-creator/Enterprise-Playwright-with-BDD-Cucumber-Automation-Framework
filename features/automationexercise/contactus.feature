@automationexercise @contactus
Feature: Automation Exercise Contact Us

  @regression
  Scenario: Submit contact us inquiry form using dynamic Faker data
    Given the user is on the Automation Exercise home page
    When the user navigates to the contact us page
    And the user submits the contact form with dynamic Faker inquiry data
    Then the contact us submission success message should be displayed
