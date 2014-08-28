/* jslint node: true */
"use strict";
var gulp = require("gulp");
var Both = require('../../lib');
var path = require('path');
var English = require('yadda').localisation.English;

module.exports = (function() {
    return English.library()
    /*Scenario: Add missing steps */
        .define("When I parse and render the feature file", function(done) {
            var self = this;
            this.world.streamResult = [];
            gulp.src(path.join(__dirname, '../testFeatures/' + this.world.feature) + '.feature')
                .pipe(new Both({
                    libraryBasePath: path.join(process.cwd(), './Test/testStepLibrary'),
                    featureBasePath: path.join(process.cwd(), './Test/testFeatures')
                }))
                .on('data', function(vinyl) {
                    self.world.streamResult.push(vinyl.contents);
                })
                .on('end', function() {
                    done();
                });
        });
})();