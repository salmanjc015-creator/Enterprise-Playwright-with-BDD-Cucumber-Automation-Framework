@saucedemo @auth
Feature: SauceDemo Authentication

  @smoke
  Scenario: Successful login as a standard user
    Given the user is on the SauceDemo login page
    When the user logs in as a "standard" user using the login fixture
    Then the user should land on the SauceDemo inventory page

  @regression
  Scenario: Locked-out user receives an access error
    Given the user is on the SauceDemo login page
    When the user logs in as a "locked" user using the login fixture
    Then the SauceDemo login error should contain "Sorry, this user has been locked out."
