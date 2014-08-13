/* jslint node: true */
"use strict";
var English = require('yadda').localisation.English;

/* Feature: Generate test steps from gherkin features */
module.exports = (function() {
    return English.library()
    /*Scenario: Generating test steps */
        .define("Given I have a simple feature file", function(done) {
            this.assert(false);
            done();
        })
        .define("When I read the feature file", function(done) {
            this.assert(false);
            done();
        })
        .define("Then a test steps file is generated", function(done) {
            this.assert(false);
            done();
        });
})();