/* jslint node: true */
"use strict";
var English = require('yadda').localisation.English;

/* Feature: Develop clover-style json report with source-map support */
module.exports = (function() {
    return English.library()
    /*Scenario: Code coverage report with no source maps */
        .define("Given I have a non-bundled Javascript file", function(done) {
            this.assert(false);
            done();
        })
        .define("When I run coverage report on the files", function(done) {
            this.assert(false);
            done();
        })
        .define("Then a report is produced referencing the non-bundled files", function(done) {
            this.assert(false);
            done();
        })/*Scenario: Code coverage report with source maps */
        .define("Given I have a bundled Javascript file", function(done) {
            this.assert(false);
            done();
        })
        .define("When I run coverage report on the file", function(done) {
            this.assert(false);
            done();
        })
        .define("Then a report is produced referencing the non-bundled files", function(done) {
            this.assert(false);
            done();
        });
})();