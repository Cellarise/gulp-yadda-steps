/* jslint node: true */
"use strict";
var mocha = require('gulp-mocha');
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var path = require('path');
var fs = require('fs');
var jsdoc2md = require("gulp-jsdoc-to-markdown");
var GulpDustCompileRender = require('gulp-dust-compile-render');

module.exports = function(gulp) {


    gulp.task("test", function() {
        gulp.src('./Test/test.js')
            .pipe(mocha({
                reporter: 'spec'
            }));
    });

    gulp.task("pre-docs", function(cb){
        var dest = "doc_templates";
        var context = JSON.parse(fs.readFileSync('package.json'));

        gulp.src([dest + '/**/*.dust.md'])
            .pipe(new GulpDustCompileRender(context))
            .pipe(rename(function (path) {
                path.basename = path.basename.replace('.dust','');
            }))
            .pipe(gulp.dest(dest))
            .on('end', cb);
    });

    gulp.task("docs", ["pre-docs"], function(cb){
        var dest = "";
        var context = JSON.parse(fs.readFileSync('package.json'));
        var options = {
            template: './doc_templates/readme.md',
            preserveWhitespace: true,
            partialsGlob: path.join(process.cwd(), 'doc_templates/') + '*.dust*'
        };

        //gutil.log("Writing JSDoc API documentation to " + dest);

        gulp.src(['lib/**/*.js'])
            .pipe(concat("README.md"))
            .pipe(new GulpDustCompileRender(context, options))
            .pipe(jsdoc2md(options))
            .pipe(gulp.dest(dest))
            .on('end', cb);
    });
};
