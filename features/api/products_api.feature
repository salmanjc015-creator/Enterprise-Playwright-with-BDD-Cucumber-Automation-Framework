@api @products
Feature: Automation Exercise Products REST API

  @smoke
  Scenario: Retrieve all products via REST API
    When the client sends a GET request to "/api/productsList"
    Then the API response status code should be 200
    And the response body should contain a non-empty products array
    And each product in the response should contain valid id, name, and price fields

  @smoke
  Scenario: Search for products with keyword parameter via REST API
    When the client searches for product keyword "tshirt" via API
    Then the API response status code should be 200
    And the response body should contain a non-empty products array
    And all search result items should have a valid name and price
