
/* Feature: Generate test steps from gherkin features */
module.exports = (function() {
    "use strict";
    var English = require('yadda').localisation.English;
    var assert = require('assert');
    return English.library()
    /*Scenario: Generating test steps */
        .define("Given I have a simple feature file", function(done) {
            assert(true);
            done();
        })
        .define("When I read the feature file", function(done) {
            assert(true);
            done();
        })
        .define("Then a test steps file is generated", function(done) {
            assert(true);
            done();
        });
})();