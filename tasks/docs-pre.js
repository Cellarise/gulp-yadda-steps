"use strict";
var rename = require("gulp-rename");
var path = require('path');
var fs = require('fs');
var GulpDustCompileRender = require('gulp-dust-compile-render');
var jiraRest = require('oauth-rest-atlassian').rest;
var asyncPipe = require('gulp-async-func-runner');

/**
 * A gulp build task to compile and render the `doc/templates/readme.dust.md` document template.
 * The document template readme.dust.md references three other templates:
 * 1) readme-license.dust.md (this file is produced by the `license` gulp task)
 * 2) readme-usage.dust.md (this file is updated manually with installation and usage information)
 * 3) readme-changelog.dust.md (this file is using to provide the layout for the changelog)
 * The changelog data is automatically sourced from Jira if the oauth config.json file exists and
 * package.json file contains property `config.projectCode`.
 * The result is saved to `doc/readme.md`.
 * This step is a pre-requisite to running the `doc` gulp task.
 * The `doc` gulp task executes the JSDoc documentation generator, which requires files saved to disk.
 * @alias tasks:docs-pre
 */
module.exports = function(gulp, context) {

    /**
     * Tranform raw changelog data from a JQL query into a JSON object.
     *
     ```
     {
     "releases": [
         {
           "version": {
             "self": "https://jira.cellarise.com/rest/api/2/version/10516",
             "id": "10516",
             "name": "0.1.4",
             "archived": false,
             "released": true,
             "releaseDate": "2014-08-28"
           },
           "issues": []
         }
     }
     ```
     */
    function prepareChangeLogJSON(data){
        var changeLogJSON = {
                releases: []
            },
            i,
            issues = data.issues,
            currentIssue,
            currentVersion,
            release,
            releaseNum = -1,
            date = new Date();

        for(i = 0; i < issues.length; i = i + 1){
            currentIssue = issues[i];
            currentVersion = currentIssue.fields.fixVersions[0];
            //first version or check for change in version
            if(!release || release.name !== currentVersion.name){
                //check if version date set, otherwise set to current date
                if(!currentVersion.releaseDate){
                    currentVersion.releaseDate = date.getFullYear() + "-" +
                        ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
                        ("0" + date.getDate()).slice(-2);
                }
                release = currentVersion;
                releaseNum = releaseNum + 1;
                changeLogJSON.releases[releaseNum] = {
                    version: currentVersion,
                    issues: []
                };
            }
            //add issue to release
            changeLogJSON.releases[releaseNum].issues.push({
                key: currentIssue.key,
                summary: currentIssue.fields.summary,
                issuetype: currentIssue.fields.issuetype,
                status: currentIssue.fields.status,
                priority: currentIssue.fields.priority,
                resolution: currentIssue.fields.resolution,
                components: currentIssue.fields.components,
                resolutiondate: currentIssue.fields.resolutiondate
            });
        }
        return changeLogJSON;
    }

    gulp.task("docs-pre", function(){
        var cwd = context.cwd;
        var pkg = context.package;
        var directories = pkg.directories;
        var options = {
            partialsGlob: path.join(cwd, directories.doc) + '/templates/*.dust*'
        };

        var jiraQuery = "";
        var queryFields = "";
        var config = {};
        var configPath = path.resolve(__dirname, "..") + "/config.json";

        //check if the oauth config file exists
        if(fs.existsSync(configPath) && pkg.config && pkg.config.projectCode){
            config = require(configPath).applications.jira;
            jiraQuery = "search?jql=(project = " + pkg.config.projectCode + " AND " +
                "issuetype in standardIssueTypes() AND issuetype != Task AND " +
                "resolution != Unresolved AND " +
                "fixVersion in (unreleasedVersions(), releasedVersions())) ORDER BY fixVersion DESC, resolutiondate DESC";
            queryFields = "&fields=Key,summary,issuetype,status,fixVersions,priority,components,resolution,resolutiondate";
        }

        return gulp.src(directories.doc + '/templates/readme.dust.md')
            .pipe(asyncPipe({
                oneTimeRun: true,
                passThrough: true,
                config: config,
                query: jiraQuery + queryFields
            },
                function(opts, chunk, cb){
                    jiraRest(opts, cb);
                },
                function(error, data){
                if(!error){
                    pkg.changelog = prepareChangeLogJSON(data);
                }
            }))
            .pipe(new GulpDustCompileRender(pkg, options))
            .pipe(rename(function (path) {
                path.basename = path.basename.replace('.dust','');
            }))
            .pipe(gulp.dest(directories.doc));
    });
};

