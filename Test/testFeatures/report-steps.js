/* jslint node: true */
"use strict";
var English = require('yadda').localisation.English;
var assert = require('assert');

/* Feature: Develop clover-style json report with source-map support */
module.exports = (function() {
    return English.library()
    /*Scenario: Code coverage report with no source maps */
        .define("Given I have a non-bundled Javascript file", function(done) {
            assert(true);
            done();
        })
        .define("When I run coverage report on the files", function(done) {
            assert(true);
            done();
        })
        .define("Then a report is produced referencing the non-bundled files", function(done) {
            assert(true);
            done();
        })/*Scenario: Code coverage report with source maps */
        .define("Given I have a bundled Javascript file", function(done) {
            assert(true);
            done();
        })
        .define("When I run coverage report on the file", function(done) {
            assert(true);
            done();
        })
        .define("Then a report is produced referencing the non-bundled files", function(done) {
            assert(true);
            done();
        });
})();