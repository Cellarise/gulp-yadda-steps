/* jslint node: true */
"use strict";
var fs = require('fs');
var dust = require('dustjs-linkedin');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var through = require('through2');
var path = require('path');

var PLUGIN_NAME = 'gulp-yadda-steps';

/**
 * Render is a transform stream requiring a yadda parsed JSON file.  Render will load test step libraries tagged in the
 * feature (using @libraries=) and will attempt to load a file with the feature filename and suffix '-steps.js'.
 * If one or more libraries are found they will be used to find step matches in the feature and filter them from the output.
 * @memberof module:gulp-yadda-steps
 * @alias Render
 * @param opts {Object} - Parser configuration options
 * @param [opts.template_library='../templates/yadda_library.dust'] {string} -
 * Specifies a path to a template_library dust file. This file controls the layout of new step libraries.
 * @param [opts.template_insertion='../templates/yadda_insert.dust'] {string} -
 * Specifies a path to a template_insertion dust file.
 * This file controls the layout for inserting steps into an existing step library.
 * This template should use dust partial `{~lb}>steps/{~rb}` to insert generated steps from template_steps.
 * @param [opts.template_steps='../templates/yadda_steps.dust'] {string} -
 * Specifies a path to a template_steps dust file. This file controls the layout and generation of test steps.
 * @returns {readable-stream/transform}
 * @example
 {>example-render/}
 */
module.exports = function (opts) {
    var self = this;
    opts = opts || {};

    var template_library = opts.template_library || '../templates/yadda_library.dust';
    var template_insertion = opts.template_insertion || '../templates/yadda_insert.dust';
    var template_steps = opts.template_steps || '../templates/yadda_steps.dust';

    this.render = function (data, output, callback) {
        var tmpl_library = fs.readFileSync(path.join(__dirname, template_library), "UTF-8");
        var tmpl_steps = fs.readFileSync(path.join(__dirname, template_steps), "UTF-8");
        var insertionTemplate = fs.readFileSync(path.join(__dirname, template_insertion), "UTF-8").toString();
        var data2 = JSON.parse(data);

        //check for existing output and check if data contains steps
        if(output && data2 && data2.feature.scenarios.length > 0 && data2.feature.scenarios[0].steps.length) {
            //use regex and replace to find first scenario comment and append insertion template
            output = output.replace(/(\/\*Scenario:.*\*\/)/, insertionTemplate + '$1');
        } else if(output === null) {
            output = '{' + '>library/' + '}'; //jsdoc dust parsing error occurs if not expressed this way
        }

        dust.optimizers.format = function (ctx, node) {
            return node;
        };
        dust.loadSource(dust.compile(tmpl_steps, "steps", false));
        dust.loadSource(dust.compile(tmpl_library, "library", false));
        dust.loadSource(dust.compile(output, "output", false));
        dust.render("output", data2, callback);
    };

    return through.obj(function (file, enc, cb) {
        var filePath = file.path,
            me = this;

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        //check existing file exists
        var outputPath = path.dirname(filePath) + path.sep + path.basename(filePath, path.extname(filePath)) + '.js';
        var output = null;
        if (fs.existsSync(outputPath)) {
            output = fs.readFileSync(outputPath, "UTF-8");
        }

        self.render(file.contents.toString(), output, function(err, output2){
            try {
                file.contents = new Buffer(output2);
                file.path = path.relative(process.cwd(), outputPath);
                me.push(file);
            } catch (err) {
                me.emit('error', new PluginError(PLUGIN_NAME, err, {fileName: file.path}));
            }
            return cb();
        });
    });
};