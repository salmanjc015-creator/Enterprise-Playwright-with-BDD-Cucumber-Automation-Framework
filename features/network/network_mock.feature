@network @mock
Feature: Playwright Network Route Interception & Fault Injection

  @smoke
  Scenario: Intercept endpoint to simulate HTTP 500 internal server failure
    Given the user is on the SauceDemo login page
    When the network route for "/api/simulated-backend" is intercepted to return status 500
    Then a browser request to "/api/simulated-backend" receives HTTP status 500 with error "Internal Server Error"

  @regression
  Scenario: Fulfill route with custom mock promotional payload
    Given the user is on the SauceDemo login page
    When the network route for "/api/promotions" is fulfilled with mock promo code "SAVE50" and discount "50%"
    Then a browser request to "/api/promotions" receives discount "50%" for promo code "SAVE50"
