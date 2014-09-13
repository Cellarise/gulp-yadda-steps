/* jslint node: true */
/* global featureFile, scenarios, steps */
"use strict";

var Yadda = require('yadda');
var path = require('path');
var context = { world: {} }; //interpreter context - global
var cwd = process.cwd();
var directories = require(cwd + '/package.json').directories;
var testDir = cwd + '\\' + directories.test + '\\';
var testFeatures = testDir;
var testSteps = testDir;
//setup testFeature and testSteps directories if they exist
if(directories.hasOwnProperty("testFeatures") && directories.hasOwnProperty("testSteps")){
    testFeatures = cwd + '\\' + directories.testFeatures + '\\';
    testSteps = cwd + '\\' + directories.testSteps + '\\';
}

//attach yadda functions like featureFile to this object
Yadda.plugins.mocha.StepLevelPlugin.init();

//helper function to prepare multiple libraries for loading into the yadda interpreter
function require_libraries(libraries) {
    function require_library(libraries, library) {
        return libraries.concat(require(testSteps + library));
    }
    return libraries.reduce(require_library, []);
}

//execute all unit test feature files
new Yadda.FeatureFileSearch([testFeatures]).each(function(file) {
    //construct featureLibraryPath by extracting feature file path minus the testFeatures path
    //the remaining path can be added to the testSteps path
    var featureLibraryPath = path.relative(testFeatures, file.replace(/\..+$/, '') + "-steps.js");

    featureFile(file, function(feature) {
        var loaded_libraries,
            libraries = [];

        if(feature.annotations.libraries !== undefined){
            libraries = feature.annotations.libraries.split(', '); //load any libraries annotated in the feature file

        }
        libraries.push(featureLibraryPath); //add
        loaded_libraries = require_libraries(libraries);

        var yadda = new Yadda.Yadda(loaded_libraries, context);
        scenarios(feature.scenarios, function(scenario) {
            steps(scenario.steps, function(step, done) {
                yadda.yadda(step, done);
            });
        });
    });
});