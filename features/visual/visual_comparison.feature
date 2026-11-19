@visual
Feature: Visual Snapshot & Component Layout Regression

  @smoke
  Scenario: SauceDemo login component visual layout verification
    Given the user is on the SauceDemo login page
    Then the login container visual snapshot should match expected layout baseline
