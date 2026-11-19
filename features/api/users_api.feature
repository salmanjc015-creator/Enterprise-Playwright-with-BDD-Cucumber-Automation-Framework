@api @users
Feature: Automation Exercise User Authentication REST API

  @regression
  Scenario: Attempt login with invalid credentials via REST API
    When the client attempts to verify login with email "invalid_qa_user_99@example.com" and password "WrongPass123!" via API
    Then the API response status code should be 200
    And the response body responseCode should be 404
    And the response body message should be "User not found!"

  @regression
  Scenario: Reject login verification request with missing parameters via REST API
    When the client sends a verify login request without credentials via API
    Then the API response status code should be 200
    And the response body responseCode should be 400
    And the response body message should be "Bad request, email or password parameter is missing in POST request."
