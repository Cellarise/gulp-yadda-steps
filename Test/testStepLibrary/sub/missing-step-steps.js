/* jslint node: true */
"use strict";
var English = require('yadda').localisation.English;

/* Feature: Generate test steps from gherkin features */
module.exports = (function() {
    return English.library()
    /*Scenario: Generating test steps */
        .define("Given I have a missing-step feature file", function(done) {
            this.assert(false);
            done();
        });
})();