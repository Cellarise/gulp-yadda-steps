/* jslint node: true */
"use strict";
var gulp = require("gulp");
var Both = require('../../lib');
var fs = require('fs'),
    path = require('path'),
    English = require('yadda').localisation.English;

module.exports = (function() {
    return English.library()
    /*Scenario: Add missing steps */
        .define("When I parse and render the feature file", function(done) {
            var self = this;
            this.world.streamResult = [];
            gulp.src(path.join(__dirname, '../testFeatures/' + this.world.feature) + '.feature')
                .pipe(new Both())
                .on('data', function(vinyl) {
                    self.world.streamResult.push(vinyl.contents);
                })
                .on('end', function() {
                    done();
                });
        })
        /*Scenario: Generating test steps*/
        .define("And the test step library for the $name feature already exists", function(filename, done) {
            this.assert(fs.existsSync(path.join(__dirname, '../testStepLibrary/' + filename) + '-steps.js'));
            done();
        })
        .define("Then missing steps are added to the existing test step library", function(done) {
            this.assert.equal(this.world.streamResult.join(''),
                fs.readFileSync(
                        path.join(__dirname, '../testStepLibrary/' +
                            this.world.feature) +
                        '-steps.expected.js', "UTF-8"));
            done();
        });
})();