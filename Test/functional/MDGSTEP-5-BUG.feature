@libraries=Package-MDGSTEP-2-steps.js
Feature: Render: Fix duplicate steps generated in output.
  Duplicate steps being generated when I rerun the task

  Scenario: Recreate duplicate step generation

    Given I have a report feature file
    When I parse and render the feature file
    Then a test steps script is generated
