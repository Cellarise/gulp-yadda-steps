
/* Feature: Generate test steps from gherkin features */
module.exports = (function() {
    "use strict";
    var English = require('yadda').localisation.English;
    var assert = require('assert');
    return English.library()
    /*Scenario: Generating test steps */
        .define("And the test steps file doesn't already exist", function(done) {
            assert(true);
            done();
        })
        .define("When I parse the feature file with the missing option set", function(done) {
            assert(true);
            done();
        });
})();
