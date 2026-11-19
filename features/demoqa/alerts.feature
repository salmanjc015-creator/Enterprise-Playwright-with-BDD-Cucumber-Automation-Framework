@demoqa @alerts
Feature: DemoQA Alerts & Dialogs Handling

  @regression
  Scenario: Interact with browser confirm dialog
    Given the user opens the DemoQA alerts page
    When the user accepts the confirmation alert dialog
    Then the confirm result should state "You selected Ok"

  @regression
  Scenario: Submit input into prompt dialog using Faker data
    Given the user opens the DemoQA alerts page
    When the user submits a Faker generated name into the prompt dialog
    Then the prompt result should display the submitted name
