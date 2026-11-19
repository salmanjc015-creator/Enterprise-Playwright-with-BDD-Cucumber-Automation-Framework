@saucedemo @session
Feature: SauceDemo Authenticated Session State Reuse

  @smoke
  Scenario: Instant access to inventory using pre-authenticated storageState
    Given the browser session is restored from pre-authenticated storageState
    When the user navigates directly to the SauceDemo inventory page via session
    Then the user should immediately land on the SauceDemo inventory page without encountering the login form
