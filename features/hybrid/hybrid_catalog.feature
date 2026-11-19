@hybrid @e2e
Feature: Hybrid API + UI Catalog Contract Consistency

  @smoke
  Scenario: Validate product details consistency between REST API and frontend UI
    Given the client queries the REST API to fetch available products
    When the user opens the Automation Exercise products section in the browser
    And the user searches for the API-selected product keyword in the UI
    Then the product search results in the UI should display the API-selected product
