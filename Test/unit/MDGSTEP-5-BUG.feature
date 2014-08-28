@libraries=general-steps.js
Feature: Duplicate steps generated
  Duplicate steps being generated when I rerun the task


  Scenario: Recreate duplicate step generation

    Given I have a report feature file
    When I parse and render the feature file
    Then a test steps script is generated
