/* jslint node: true */
"use strict";
var path = require('path');
var Yadda = require('yadda');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var through = require('through2');
var _ = require('underscore');

var PLUGIN_NAME = 'gulp-yadda-steps';

/**
 * Parser is a transform stream requiring a valid feature file.  Parser will load test step libraries tagged in the
 * feature (using @libraries=) and will attempt to load a file with the feature filename and suffix '-steps.js'.
 * If one or more libraries are found they will be used to find step matches in the feature and filter them from the output.
 * @memberof module:gulp-yadda-steps
 * @alias Parser
 * @param opts {Object} - Parser configuration options
 * @param [opts.libraryBasePath] {string} - Specifies a path to the base location for the test step libraries.
 * E.g. if the base path to the test step library is `Test/unit/steps/` use `path.join(__dirname, './steps/')`
 * if the script is running from `'Test/unit'`.
 * Note: featureBasePath must also be set for this option to take effect.
 * @param [opts.featureBasePath] {string} - Specifies a path to the base location for the features.
 * Note: libraryBasePath must also be set for this option to take effect.
 * @returns {readable-stream/transform}
 * @example
 {>example-parser/}
 */
module.exports = function (opts) {
    var self = this;
    opts = opts || {};

    opts.libraryBasePath = opts.libraryBasePath || '';
    opts.featureBasePath = opts.featureBasePath || '';
    opts.library_suffix = opts.library_suffix || '-steps';

    //opts.libraryPath
    //opts.cwd
    this.libraryPath = '';
    this.featureName = '';
    this.featurePath = '';
    this.stepLibraryName = '';

    this.parser = new Yadda.parsers.FeatureParser(opts.language);

    this.output = function (feature) {

        var libraries = this.get_libraries(feature);
        var interpreter = new Yadda.Yadda(libraries).interpreter;
        var data = {};
        data.feature = feature;
        var uniqueSteps = [];

        var a_idx, b_idx, a_len, b_len, scenario, step;
        //iterate through scenarios
        a_len = data.feature.scenarios.length;
        for (a_idx = 0; a_idx < a_len; a_idx = a_idx + 1) {
            //iterate through steps
            scenario = data.feature.scenarios[a_idx];
            b_len = scenario.steps.length;
            for (b_idx = b_len - 1; b_idx > -1; b_idx = b_idx - 1) {
                //check if step already exists in libraries
                step = scenario.steps[b_idx];
                //check if in uniqueSteps else add
                if(interpreter.rank_macros(step).validate().valid || _.contains(uniqueSteps, step)){
                    //if found then remove from output
                    data.feature.scenarios[a_idx].steps.splice(b_idx,1);
                }
                if(!_.contains(uniqueSteps, step)){
                    uniqueSteps.push(step);
                }
            }
        }
        return JSON.stringify(data);
    };

    this.require_libraries = function (libraries) {

        function require_library(libraries, library) {
            try {
                return libraries.concat(require(library));
            } catch (err) {
                //console.log(err);
                return libraries;
            }
        }

        return libraries.reduce(require_library, []);
    };

    this.get_libraries = function (feature) {
        var libraries = [];

        if(feature.annotations.libraries !== undefined){
            libraries = feature.annotations.libraries.split(', '); //load any libraries annotated in the feature file
            //set paths relative to feature file
            var i;
            for (i = 0; i < libraries.length; i = i + 1){
                libraries[i] = path.resolve(self.libraryPath, libraries[i]);
            }
        }

        libraries.push(path.join(self.libraryPath, self.stepLibraryName));

        return this.require_libraries(libraries);
    };


    return through.obj(function (file, enc, cb) {
        var filePath = file.path,
            text = file.contents.toString(),
            feature,
            output;

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        //setup feature and library paths and names
        self.featurePath = path.dirname(filePath); //assume absolute path
        self.featureName = path.basename(filePath);
        self.stepLibraryName = path.basename(filePath, '.feature') + opts.library_suffix + '.js';
        //set library path relative to feature path
        if (opts.libraryBasePath === '' || opts.featureBasePath === '') {
            self.libraryPath = self.featurePath + path.sep; //assume this creates an absolute path
        } else {
            self.libraryPath = opts.libraryBasePath +
                self.featurePath.replace(opts.featureBasePath, '')  + //relative path from feature base to feature
                path.sep; //assume this creates an absolute path
        }

        try {
            feature = self.parser.parse(text);
            output = self.output(feature, filePath);
            file.contents = new Buffer(output);
            file.path = path.relative(process.cwd(), self.libraryPath + self.stepLibraryName); //replace output path to that of library
            this.push(file);
        } catch (err) {
            this.emit('error', new PluginError(PLUGIN_NAME, err, {fileName: file.path}));
        }

        cb();
    });
};