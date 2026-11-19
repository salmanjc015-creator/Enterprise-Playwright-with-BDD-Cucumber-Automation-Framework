@a11y
Feature: Web Accessibility (WCAG 2.1 AA) Compliance Audit

  @smoke
  Scenario: SauceDemo login page satisfies WCAG accessibility standards
    Given the user is on the SauceDemo login page
    Then the current page should pass WCAG accessibility standards

  @regression
  Scenario: SauceDemo inventory dashboard satisfies WCAG accessibility standards
    Given the user is authenticated on the SauceDemo inventory page
    Then the current page should pass WCAG accessibility standards
