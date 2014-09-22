/**
 * A gulp build task to check whether the package NPM dependencies are out of date.
 * @alias tasks:david
 */
module.exports = function(gulp) {
    "use strict";
    var david = require('david');
    var npmUtils = require('./utils/npm')();
    // Run tasks synchronously in order
    gulp.task('david', function(cb, context) {
        var pkg = context.package;
        //only install stable versions (i.e. not alpha or beta versions)
        david.getUpdatedDependencies(pkg, { stable: true }, function (er, deps) {
            npmUtils.installDeps(deps, {
                save: true
            }, cb);
        });
    });
};
