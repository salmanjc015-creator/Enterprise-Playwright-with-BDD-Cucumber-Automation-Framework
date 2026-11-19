@automationexercise @products
Feature: Automation Exercise Product Search and Details

  @smoke
  Scenario: Search for products and verify catalog results
    Given the user is on the Automation Exercise home page
    When the user navigates to the products section
    And the user searches for product keyword "Dress"
    Then the search results should display matching items

  @regression
  Scenario: View product detail page from catalog
    Given the user is on the Automation Exercise home page
    When the user navigates to the products section
    And the user views details of the first product
    Then the product detail view should be rendered with product information
