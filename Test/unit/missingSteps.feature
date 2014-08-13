@libraries=general-steps.js
Feature: Automate adding missing test steps from a test feature script
  As a developer
  I can automatically add missing steps to my step library based on my test feature
  So that I can make frequent changes to my test feature and keep my step library up to date with minimal time and effort


  Scenario: Add missing steps

    Given I have a sub/missing-step feature file
    And the test step library for the sub/missing-step feature already exists
    When I parse and render the feature file
    Then missing steps are added to the existing test step library
