@saucedemo @checkout
Feature: SauceDemo Shopping & Checkout Flow

  @smoke @e2e
  Scenario: Complete an end-to-end checkout with dynamically generated customer details
    Given the user is authenticated on the SauceDemo inventory page
    When the user adds "Sauce Labs Backpack" to the SauceDemo cart
    And the user opens the SauceDemo cart and proceeds to checkout
    And the user submits Faker-generated checkout details and finishes the order
    Then the SauceDemo order confirmation message "Thank you for your order!" should be displayed

  @regression
  Scenario: Sort products by price from low to high
    Given the user is authenticated on the SauceDemo inventory page
    When the user sorts SauceDemo products by "lohi"
    Then the SauceDemo product prices should be ordered ascending
