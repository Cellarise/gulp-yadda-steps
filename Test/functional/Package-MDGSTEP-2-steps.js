/* jslint node: true */
"use strict";
var fs = require('fs');
var gulp = require("gulp");
var path = require('path');
var English = require('yadda').localisation.English;
var assert = require('assert');
var Parser = require('../../lib/index').Parser;
var Render = require('../../lib/index').Render;

module.exports = (function() {
    return English.library()
        /*Scenario: Generating test steps*/
        .define("Given I have a $Name (?:feature|json) (?:file|output)", function(filename, done) {
            this.world.feature = filename;
            done();
        })
        .given("the test steps file doesn't already exist", function(done) {
            assert(!fs.existsSync(path.join(__dirname, '../testStepLibrary/' + this.world.feature) + '-steps.js'));
            done();
        })
        .when("I parse the feature file", function(done) {
            var self = this;
            this.world.streamResult = [];
            gulp.src(path.join(__dirname, '../testFeatures/' + this.world.feature) + '.feature')
                .pipe(new Parser({
                    libraryBasePath: path.join(__dirname, '../testStepLibrary'),
                    featureBasePath: path.join(__dirname, '../testFeatures')
                }))
                .on('data', function(vinyl) {
                    self.world.streamResult.push(vinyl.contents);
                })
                .on('end', function() {
                    done();
                });
        })
        .when("I render the json output", function(done) {
            var self = this;
            this.world.streamResult = [];
            gulp.src(path.join(__dirname, '../testStepLibrary/' + this.world.feature) + '-steps.json')
                .pipe(new Render())
                .on('data', function(vinyl) {
                    self.world.streamResult.push(vinyl.contents);
                })
                .on('end', function() {
                    done();
                });
        })
        .define("Then a yadda json output is generated", function(done) {
            assert.equal(this.world.streamResult.join(''),
                fs.readFileSync(
                        path.join(__dirname, '../testStepLibrary/' +
                            this.world.feature) + '-steps.json', "UTF-8"));
            done();
        })
        .define("Then a test steps script is generated", function(done) {
            assert.equal(this.world.streamResult.join(''),
                fs.readFileSync(
                        path.join(__dirname, '../testStepLibrary/' +
                            this.world.feature) + '-steps.expected.js', "UTF-8"));
            done();
        });
})();