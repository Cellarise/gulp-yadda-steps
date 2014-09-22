
/* Feature: Generate test steps from gherkin features */
module.exports = (function() {
    "use strict";
    var English = require('yadda').localisation.English;
    var assert = require('assert');
    return English.library()
    /*Scenario: Generating test steps */
        .define("And the test step library missing-step", function(done) {
            assert(true);
            done();
        })
        .define("Then missing steps snippets are streamed", function(done) {
            assert(true);
            done();
        })/*Scenario: 2nd generation test steps */
        .define("Given I have another missing-step feature file", function(done) {
            assert(true);
            done();
        })
        /*Scenario: Generating test steps */
        .define("Given I have a missing-step feature file", function(done) {
            assert(true);
            done();
        });
})();