
/* Feature: Template: Update step library template to move all code within the module exports function */
module.exports = (function() {
    "use strict";
    var English = require('yadda').localisation.English;
    var assert = require('assert');
    return English.library()
    /*Scenario:  */
        .define("Given", function(done) {
            assert(true);
            done();
        })
        .define("When", function(done) {
            assert(true);
            done();
        })
        .define("Then", function(done) {
            assert(true);
            done();
        });
})();