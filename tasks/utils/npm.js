
/**
 * NPM build utilities
 * @exports utils/jira
 * @returns {Object}
 */
module.exports = function()  {
    "use strict";
    var npm = require('npm');
    return {
        /**
         * Install the passed dependencies
         *
         * @param {Object} deps Dependencies to install (result from david)
         * @param {Object} opts Install options
         * @param {Boolean} [opts.global] Install globally
         * @param {Boolean} [opts.save] Save installed dependencies to dependencies/devDependencies/optionalDependencies
         * @param {Boolean} [opts.dev] Provided dependencies are dev dependencies
         * @param {Boolean} [opts.optional] Provided dependencies are optional dependencies
         * @param {String} [opts.registry] The npm registry URL to use
         * @param {Function} cb Callback
         */
        installDeps: function  (deps, opts, cb) {
            opts = opts || {};

            var depNames = Object.keys(deps);

            // Nothing to install!
            if (!depNames.length) {
                return cb(null);
            }

            depNames = depNames.filter(function (depName) {
                return !deps[depName].warn;
            });

            npm.load({
                registry: opts.registry,
                global: opts.global
            }, function (er) {
                if (er) {
                    return cb(er);
                }

                if (opts.save) {
                    npm.config.set("save" + (opts.dev ? "-dev" : opts.optional ? "-optional" : ""), true);
                }

                var installArgs = depNames.map(function (depName) {
                    return depName + "@" + deps[depName].stable;
                });

                npm.commands.install(installArgs, function (er) {
                    npm.config.set("save" + (opts.dev ? "-dev" : opts.optional ? "-optional" : ""), false);
                    cb(er);
                });
            });
        }
    };
};

