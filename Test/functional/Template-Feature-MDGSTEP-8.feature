@libraries=Package-MDGSTEP-2-steps
Feature: Template: Update step library to require assert package.
  As a developer
  I want to be able to generate test step boilerplate code that requires the assert package
  So that I can focus effort on building quality test steps

  Scenario: require assert package

    Given I have a simple feature file
    And the test steps file doesn't already exist
    When I parse the feature file
    Then a yadda json output is generated
