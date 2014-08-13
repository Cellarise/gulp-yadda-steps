/* jslint node: true */
"use strict";
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var through = require('through2').obj;
var Parser = require('./parser');
var Render = require('./render');
var streamifier = require('streamifier');

var PLUGIN_NAME = 'gulp-yadda-steps';

/**
 * A gulp task to generate or update Yadda test step libraries from Gherkin features (natural language test scripts).
 * @module gulp-yadda-steps
 * @param opts {Object} - Task configuration options (see modules Parser and Render for more information)
 * @returns {readable-stream/transform}
 * @example
 {>example-index/}
 */
var task  = module.exports = function (opts) {
    opts = opts || {};
    return through(function (file, enc, cb) {
        var self = this;

        //if (file.isNull()) {
            // Do nothing if no contents
        //}

        if (file.isStream()) {
            return cb(new PluginError(PLUGIN_NAME, 'streams not supported'), undefined);
        }

        if (file.isBuffer()) {
            try {
                var bufferStream = new streamifier.createReadStream(file);
                bufferStream
                    .pipe(new Parser(opts))
                    .pipe(new Render(opts))
                    .on('data', function(vinyl) {
                        file = vinyl;
                        self.push(file);
                        cb();
                    });
            } catch (err) {
                this.emit('error', new PluginError(PLUGIN_NAME, err, {fileName: file.path}));
            }
        }
    });
};

task.Parser = Parser;
task.Render = Render;