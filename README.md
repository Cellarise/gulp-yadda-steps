# gulp-yadda-steps
[![view on npm](http://img.shields.io/npm/v/gulp-yadda-steps.svg?style=flat)](https://www.npmjs.org/package/gulp-yadda-steps)
[![npm module downloads per month](http://img.shields.io/npm/dm/gulp-yadda-steps.svg?style=flat)](https://www.npmjs.org/package/gulp-yadda-steps)
[![Dependency status](https://david-dm.org/Cellarise/gulp-yadda-steps.svg?style=flat)](https://david-dm.org/Cellarise/gulp-yadda-steps)
[![Build Status](https://travis-ci.org/Cellarise/gulp-yadda-steps.svg?branch=master)](https://travis-ci.org/Cellarise/gulp-yadda-steps)
[![Code
Climate](https://codeclimate.com/github/Cellarise/gulp-yadda-steps/badges/gpa.svg)](https://codeclimate.com/github/Cellarise/gulp-yadda-steps)
[![Test Coverage](https://codeclimate.com/github/Cellarise/gulp-yadda-steps/badges/coverage.svg)](https://codeclimate.com/github/Cellarise/gulp-yadda-steps/badges/coverage.svg)

> A gulp task to generate or update Yadda test step libraries from Gherkin features (natural language test scripts).


## Usage

This gulp task expects a feature file, written in Gherkin syntax, as input, and outputs the matching Yadda test step libraries for this feature file.

### As a gulp task

Require this package and use as part of your gulp task.

```js
var GulpYaddaSteps = require('gulp-yadda-steps');
gulp.src('local.feature')
.pipe(new GulpYaddaSteps())
.pipe(fs.createWriteStream('output.js'));
```



## API
### Modules
<dl>
<dt><a href="#module_gulp-yadda-steps">gulp-yadda-steps</a> ⇒ <code>through2</code></dt>
<dd><p>A gulp task to generate or update Yadda test step libraries from Gherkin features (natural language test scripts).</p>
</dd>
<dt><a href="#module_/parser">/parser</a> ⇒ <code>through2</code></dt>
<dd><p>Parser is a transform stream requiring a valid feature file.  Parser will load test step libraries tagged in the feature (using @libraries=) and will attempt to load a file with the feature filename and suffix &quot;-steps.js&quot;.  If one or more libraries are found they will be used to find step matches in the feature and filter them from the output.</p>
</dd>
<dt><a href="#module_/render">/render</a> ⇒ <code>through2</code></dt>
<dd><p>Render is a transform stream requiring a yadda parsed JSON file.  Render will load test step libraries tagged in the feature (using @libraries=) and will attempt to load a file with the feature filename and suffix &quot;-steps.js&quot;.  If one or more libraries are found they will be used to find step matches in the feature and filter them from the output.</p>
</dd>
</dl>
<a name="module_gulp-yadda-steps"></a>
### gulp-yadda-steps ⇒ <code>through2</code>
A gulp task to generate or update Yadda test step libraries from Gherkin features (natural language test scripts).

**Returns**: <code>through2</code> - readable-stream/transform  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Task configuration options (see modules Parser and Render for more information) |

**Example**  
Given the feature file:

```markdown
Feature: Generate test steps from gherkin features
As a developer
I want to be able to generate test step boilerplate code from gherkin features
So that I can focus effort on building quality test steps

Scenario: Generating test steps

Given I have a simple feature file
When I read the feature file
Then a test steps file is generated
```

When you pass the feature file to a `new gulpYaddaSteps()`, and pipe it to a given destination.

```js
var gulpYaddaSteps = require('gulp-yadda-steps');
gulp.src('local.feature')
.pipe(new gulpYaddaSteps())
.pipe(fs.createWriteStream('output.js'));
```

Then you'll get a Yadda style test step library:

```js
"use strict";
var English = require('yadda').localisation.English;
/* Feature: Generate test steps from gherkin features */
module.exports = (function() {
 return English.library()
   /* Generating test steps */
   .define("Given I have a simple feature file", function(done) {
       this.assert(false);
       done();
   })
   .define("When I read the feature file", function(done) {
       this.assert(false);
       done();
   })
   .define("Then a test steps file is generated", function(done) {
       this.assert(false);
       done();
   });
})();
```

Note that the output is a vinyl file which will have the filePath overridden if the libraryBasePath and featureBasePath options are set.

-

<a name="module_/parser"></a>
### /parser ⇒ <code>through2</code>
Parser is a transform stream requiring a valid feature file.  Parser will load test step libraries tagged in the feature (using @libraries=) and will attempt to load a file with the feature filename and suffix "-steps.js".  If one or more libraries are found they will be used to find step matches in the feature and filter them from the output.

**Returns**: <code>through2</code> - readable-stream/transform  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opts | <code>Object</code> |  | Parser configuration options |
| [opts.libraryBasePath=] | <code>string</code> |  | Specifies a path to the base location for the test step libraries. E.g. if the base path to the test step library is `Test/unit/steps/` use `path.join(__dirname, "./steps/")` if the script is running from `"Test/unit"`. Note: featureBasePath must also be set for this option to take effect. |
| [opts.featureBasePath=] | <code>string</code> |  | Specifies a path to the base location for the features. Note: libraryBasePath must also be set for this option to take effect. |
| [opts.librarySuffix] | <code>string</code> | <code>&quot;-steps&quot;</code> | Specifies the suffix for step libraries |

**Example**  
Given the feature file:

```markdown
Feature: Generate test steps from gherkin features
As a developer
I want to be able to generate test step boilerplate code from gherkin features
So that I can focus effort on building quality test steps

Scenario: Generating test steps

Given I have a simple feature file
When I read the feature file
Then a test steps file is generated
```

When you pass the feature file to a `new Parser()`, and pipe it to a given destination.

```js
var Parser = require('gulp-yadda-steps').Parser;
gulp.src('local.feature')
.pipe(new Parser())
.pipe(fs.createWriteStream('output.json'));
```

Then you'll get a Yadda parsed JSON output:

```js
{"feature":{"title":"Generate test steps from gherkin features","annotations":{},
"description":["As a developer","I want to be able to generate test step boilerplate code from gherkin features",
"So that I can focus effort on building quality test steps"],
"scenarios":[{"title":"Generating test steps",
"annotations":{},"description":[],
"steps":["Given I have a simple feature file","When I read the feature file","Then a test steps file is generated"]}]}}
```

Note that the output is a vinyl file which will have the filePath overridden if the libraryBasePath and featureBasePath options are set.

-

<a name="module_/render"></a>
### /render ⇒ <code>through2</code>
Render is a transform stream requiring a yadda parsed JSON file.  Render will load test step libraries tagged in the feature (using @libraries=) and will attempt to load a file with the feature filename and suffix "-steps.js".  If one or more libraries are found they will be used to find step matches in the feature and filter them from the output.

**Returns**: <code>through2</code> - readable-stream/transform  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opts | <code>Object</code> |  | Parser configuration options |
| [opts.template_library] | <code>string</code> | <code>&quot;../templates/yadda_library.dust&quot;</code> | Specifies a path to a template_library dust file. This file controls the layout of new step libraries. |
| [opts.template_insertion] | <code>string</code> | <code>&quot;../templates/yadda_insert.dust&quot;</code> | Specifies a path to a template_insertion dust file.  This file controls the layout for inserting steps into an existing step library.  This template should use dust partial `steps` to insert generated steps from template_steps. |
| [opts.template_steps] | <code>string</code> | <code>&quot;../templates/yadda_steps.dust&quot;</code> | Specifies a path to a template_steps dust file. This file controls the layout and generation of test steps. |

**Example**  
Given a yadda parsed JSON file:

```js
{"feature":{"title":"Generate test steps from gherkin features","annotations":{},
"description":["As a developer","I want to be able to generate test step boilerplate code from gherkin features",
"So that I can focus effort on building quality test steps"],
"scenarios":[{"title":"Generating test steps",
"annotations":{},
"description":[],
"steps":["Given I have a simple feature file","When I read the feature file","Then a test steps file is generated"]}]}}
```

When you pass the yadda parsed JSON file to a `new Render()`, and pipe it to a given destination.

```js
var Render = require('gulp-yadda-steps').Render;
gulp.src('output.json')
.pipe(new Render())
.pipe(fs.createWriteStream('output.js'));
```

Then you'll get a Yadda style test step library:

```js
"use strict";
var English = require('yadda').localisation.English;
var assert = require('assert');
/* Feature: Generate test steps from gherkin features */
module.exports = (function() {
return English.library()
   /* Generating test steps */
   .define("Given I have a simple feature file", function(done) {
       assert(true);
       done();
   })
   .define("When I read the feature file", function(done) {
       assert(true);
       done();
   })
   .define("Then a test steps file is generated", function(done) {
       assert(true);
       done();
   });
})();
```

Note that the output is a vinyl file which will have the filePath overridden if the libraryBasePath and featureBasePath options are set.

-

*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*.


# Changelog

<table style="width:100%;border-spacing:0px;border-collapse:collapse;margin:0px;padding:0px;border-width:0px;">
  <tr>
    <th style="width:20px;text-align:center;"></th>
    <th style="width:80px;text-align:center;">Type</th>
    <th style="width:80px;text-align:left;">ID</th>
    <th style="text-align:left;">Summary</th>
  </tr>
    
<tr>
        <td colspan=4><strong>Version: 0.1.14 - released 2015-08-25</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-34</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-33</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-32</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-31</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-30</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDGSTEP-29</td>
            <td><p>Render: Fix missing callback err handling</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.13 - released 2015-05-24</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-26</td>
            <td><p>Package: Update development dependencies</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.12 - released 2015-05-21</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-25</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.11 - released 2015-05-20</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-24</td>
            <td><p>Package: Replace underscore.js with ramda.js</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-23</td>
            <td><p>Package: Update docs with updated jsdoc2markdown formatting</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-22</td>
            <td><p>Package: Update eslint configuration, test.js runner and dev dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-21</td>
            <td><p>Package: Update eslint configuration, test.js runner and dev dependencies</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.10 - released 2014-10-19</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-20</td>
            <td><p>Parser: Change option &#39;library_suffix&#39; to camelcase &#39;librarySuffix&#39;</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDGSTEP-19</td>
            <td><p>Template: Update step library template to match new eslint rules</p><p>As a developer
I can automatically add missing steps to my step library based on my test feature
So that I can make frequent changes to my test feature and keep my step library up to date with minimal time and effort</p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-18</td>
            <td><p>Package: Migrate from jshint to eslint static code analysis</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.9 - released 2014-10-12</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-17</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-16</td>
            <td><p>Package: Remove all gulp tasks except &#39;test&#39; and update readme docs</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.8 - released 2014-10-06</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-15</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.7 - released 2014-09-22</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-14</td>
            <td><p>Parser: Add error logger to require step library function</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.6 - released 2014-09-20</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDGSTEP-9</td>
            <td><p>Render: Fix steps not being created in existing step-libraries.</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDGSTEP-13</td>
            <td><p>Template: Update step library template to move all code within the module exports function</p><p>  As a developer
  I want to be able to generate test step boilerplate code (within the module exports function)
  So that I can focus effort on building quality test steps</p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.5 - released 2014-09-13</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDGSTEP-8</td>
            <td><p>Template: Update step library to require assert package.</p><p>As a developer
I want to be able to generate test step boilerplate code that requires the assert package
So that I can focus effort on building quality test steps</p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.4 - released 2014-08-28</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10419&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-6</td>
            <td><p>Package: Migrate to new Cellarise Package Manager.</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.3 - released 2014-08-17</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDGSTEP-5</td>
            <td><p>Render: Fix duplicate steps generated in output.</p><p>Duplicate steps being generated when I rerun the task</p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.2 - released 2014-08-14</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10403&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Bug</td>
            <td style="width:80px;text-align:left;">MDGSTEP-4</td>
            <td><p>Package: Fix path to main library in package.json.</p><p></p></td>
          </tr>
        
    
<tr>
        <td colspan=4><strong>Version: 0.1.0 - released 2014-08-13</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDGSTEP-3</td>
            <td><p>Package: Automate adding missing test steps from a test feature script.</p><p>As a developer
I can automatically add missing steps to my step library based on my test feature
So that I can make frequent changes to my test feature and keep my step library up to date with minimal time and effort</p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10411&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Feature</td>
            <td style="width:80px;text-align:left;">MDGSTEP-2</td>
            <td><p>Package: Generate test steps from gherkin features.</p><p>As a developer
I want to be able to generate test step boilerplate code from gherkin features
So that I can focus effort on building quality test steps</p></td>
          </tr>
        
    
</table>



# License

MIT License (MIT). All rights not explicitly granted in the license are reserved.

Copyright (c) 2015 John Barry
## Dependencies
[ansi-green@0.1.1](&quot;git+https://github.com/jonschlinkert/ansi-green&quot;) - &quot;MIT&quot;, [ansi-regex@2.0.0](&quot;git+https://github.com/sindresorhus/ansi-regex&quot;) - &quot;MIT&quot;, [ansi-styles@2.1.0](&quot;git+https://github.com/chalk/ansi-styles&quot;) - &quot;MIT&quot;, [ansi-wrap@0.1.0](&quot;git+https://github.com/jonschlinkert/ansi-wrap&quot;) - &quot;MIT&quot;, [anymatch@1.3.0](&quot;git+https://github.com/es128/anymatch&quot;) - &quot;ISC&quot;, [arr-diff@1.1.0](&quot;git+https://github.com/jonschlinkert/arr-diff&quot;) - &quot;MIT&quot;, [arr-flatten@1.0.1](&quot;https://github.com/jonschlinkert/arr-flatten&quot;) - &quot;MIT&quot;, [array-differ@1.0.0](&quot;https://github.com/sindresorhus/array-differ&quot;) - &quot;MIT&quot;, [array-slice@0.2.3](&quot;https://github.com/jonschlinkert/array-slice&quot;) - &quot;MIT&quot;, [array-uniq@1.0.2](&quot;git+https://github.com/sindresorhus/array-uniq&quot;) - &quot;MIT&quot;, [array-unique@0.2.1](&quot;https://github.com/jonschlinkert/array-unique&quot;) - &quot;MIT&quot;, [arrify@1.0.0](&quot;git+https://github.com/sindresorhus/arrify&quot;) - &quot;MIT&quot;, [async-each@0.1.6](&quot;https://github.com/paulmillr/async-each&quot;) - &quot;MIT&quot;, [beeper@1.1.0](&quot;git+https://github.com/sindresorhus/beeper&quot;) - &quot;MIT&quot;, [binary-extensions@1.3.1](&quot;git+https://github.com/sindresorhus/binary-extensions&quot;) - &quot;MIT&quot;, [braces@1.8.1](&quot;git+https://github.com/jonschlinkert/braces&quot;) - &quot;MIT&quot;, [camelcase-keys@1.0.0](&quot;git+https://github.com/sindresorhus/camelcase-keys&quot;) - &quot;MIT&quot;, [camelcase@1.2.1](&quot;git+https://github.com/sindresorhus/camelcase&quot;) - &quot;MIT&quot;, [chalk@1.1.1](&quot;git+https://github.com/chalk/chalk&quot;) - &quot;MIT&quot;, [chokidar@1.0.5](&quot;git+https://github.com/paulmillr/chokidar&quot;) - &quot;MIT&quot;, [cli@0.6.6](&quot;git+ssh://git@github.com/chriso/cli&quot;) - [&quot;MIT&quot;], [clone-stats@0.0.1](&quot;https://github.com/hughsk/clone-stats&quot;) - &quot;MIT&quot;, [clone@1.0.2](&quot;https://github.com/pvorb/node-clone&quot;) - &quot;MIT&quot;, [core-util-is@1.0.1](&quot;https://github.com/isaacs/core-util-is&quot;) - &quot;MIT&quot;, [dateformat@1.0.11](&quot;git+https://github.com/felixge/node-dateformat&quot;) - &quot;MIT&quot;, [duplexer2@0.0.2](&quot;https://github.com/deoxxa/duplexer2&quot;) - &quot;BSD&quot;, [dustjs-helpers@1.7.3](&quot;git+https://github.com/linkedin/dustjs-helpers&quot;) - &quot;MIT&quot;, [dustjs-linkedin@2.7.2](&quot;git+https://github.com/linkedin/dustjs&quot;) - &quot;MIT&quot;, [escape-string-regexp@1.0.3](&quot;git+https://github.com/sindresorhus/escape-string-regexp&quot;) - &quot;MIT&quot;, [exit@0.1.2](&quot;https://github.com/cowboy/node-exit&quot;) - [&quot;MIT&quot;], [expand-brackets@0.1.4](&quot;git+https://github.com/jonschlinkert/expand-brackets&quot;) - &quot;MIT&quot;, [expand-range@1.8.1](&quot;https://github.com/jonschlinkert/expand-range&quot;) - &quot;MIT&quot;, [extglob@0.3.1](&quot;https://github.com/jonschlinkert/extglob&quot;) - &quot;MIT&quot;, [filename-regex@2.0.0](&quot;https://github.com/regexps/filename-regex&quot;) - &quot;MIT&quot;, [fill-range@2.2.2](&quot;https://github.com/jonschlinkert/fill-range&quot;) - &quot;MIT&quot;, [for-in@0.1.4](&quot;https://github.com/jonschlinkert/for-in&quot;) - &quot;MIT&quot;, [for-own@0.1.3](&quot;https://github.com/jonschlinkert/for-own&quot;) - &quot;MIT&quot;, [get-stdin@4.0.1](&quot;git+https://github.com/sindresorhus/get-stdin&quot;) - &quot;MIT&quot;, [glob-base@0.2.0](&quot;https://github.com/jonschlinkert/glob-base&quot;) - &quot;MIT&quot;, [glob-parent@1.2.0](&quot;git+https://github.com/es128/glob-parent&quot;) - &quot;ISC&quot;, [glob@3.2.11](&quot;https://github.com/isaacs/node-glob&quot;) - &quot;BSD&quot;, [graceful-fs@4.1.2](&quot;git+https://github.com/isaacs/node-graceful-fs&quot;) - &quot;ISC&quot;, [gulp-util@3.0.6](&quot;git+https://github.com/wearefractal/gulp-util&quot;) - &quot;MIT&quot;, [gulp-yadda-steps@0.1.13](&quot;https://github.com/Cellarise/gulp-yadda-steps&quot;) - &quot;MIT License (MIT)&quot;, [has-ansi@2.0.0](&quot;git+https://github.com/sindresorhus/has-ansi&quot;) - &quot;MIT&quot;, [indent-string@1.2.2](&quot;git+https://github.com/sindresorhus/indent-string&quot;) - &quot;MIT&quot;, [inherits@2.0.1](&quot;https://github.com/isaacs/inherits&quot;) - &quot;ISC&quot;, [is-binary-path@1.0.1](&quot;git+https://github.com/sindresorhus/is-binary-path&quot;) - &quot;MIT&quot;, [is-dotfile@1.0.1](&quot;https://github.com/jonschlinkert/is-dotfile&quot;) - &quot;MIT&quot;, [is-equal-shallow@0.1.3](&quot;https://github.com/jonschlinkert/is-equal-shallow&quot;) - &quot;MIT&quot;, [is-extglob@1.0.0](&quot;git+https://github.com/jonschlinkert/is-extglob&quot;) - &quot;MIT&quot;, [is-finite@1.0.1](&quot;git+https://github.com/sindresorhus/is-finite&quot;) - &quot;MIT&quot;, [is-glob@1.1.3](&quot;git+https://github.com/jonschlinkert/is-glob&quot;) - &quot;MIT&quot;, [is-number@1.1.2](&quot;https://github.com/jonschlinkert/is-number&quot;) - &quot;MIT&quot;, [is-primitive@2.0.0](&quot;https://github.com/jonschlinkert/is-primitive&quot;) - &quot;MIT&quot;, [isarray@0.0.1](&quot;https://github.com/juliangruber/isarray&quot;) - &quot;MIT&quot;, [isobject@1.0.2](&quot;https://github.com/jonschlinkert/isobject&quot;) - &quot;MIT&quot;, [kind-of@1.1.0](&quot;https://github.com/jonschlinkert/kind-of&quot;) - &quot;MIT&quot;, [lazy-cache@0.2.3](&quot;git+https://github.com/jonschlinkert/lazy-cache&quot;) - &quot;MIT&quot;, [lodash._basecopy@3.0.1](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash._basetostring@3.0.1](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash._basevalues@3.0.0](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash._getnative@3.9.1](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash._isiterateecall@3.0.9](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash._reescape@3.0.0](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash._reevaluate@3.0.0](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash._reinterpolate@3.0.0](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.escape@3.0.0](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.isarguments@3.0.4](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.isarray@3.0.4](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.keys@3.1.2](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.restparam@3.6.1](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.template@3.6.2](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lodash.templatesettings@3.1.0](&quot;git+https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [lru-cache@2.6.5](&quot;https://github.com/isaacs/node-lru-cache&quot;) - &quot;ISC&quot;, [map-obj@1.0.1](&quot;git+https://github.com/sindresorhus/map-obj&quot;) - &quot;MIT&quot;, [meow@3.3.0](&quot;git+https://github.com/sindresorhus/meow&quot;) - &quot;MIT&quot;, [micromatch@2.2.0](&quot;git+https://github.com/jonschlinkert/micromatch&quot;) - &quot;MIT&quot;, [minimatch@0.2.14](&quot;https://github.com/isaacs/minimatch&quot;) - &quot;MIT&quot;, [minimatch@0.3.0](&quot;https://github.com/isaacs/minimatch&quot;) - &quot;MIT&quot;, [minimist@1.2.0](&quot;https://github.com/substack/minimist&quot;) - &quot;MIT&quot;, [multipipe@0.1.2](&quot;git+https://github.com/juliangruber/multipipe&quot;) - &quot;MIT&quot;, [number-is-nan@1.0.0](&quot;git+https://github.com/sindresorhus/number-is-nan&quot;) - &quot;MIT&quot;, [object-assign@3.0.0](&quot;git+https://github.com/sindresorhus/object-assign&quot;) - &quot;MIT&quot;, [object.omit@1.1.0](&quot;https://github.com/jonschlinkert/object.omit&quot;) - &quot;MIT&quot;, [parse-glob@3.0.2](&quot;https://github.com/jonschlinkert/parse-glob&quot;) - &quot;MIT&quot;, [path-is-absolute@1.0.0](&quot;git+https://github.com/sindresorhus/path-is-absolute&quot;) - &quot;MIT&quot;, [preserve@0.2.0](&quot;https://github.com/jonschlinkert/preserve&quot;) - &quot;MIT&quot;, [process-nextick-args@1.0.2](&quot;git+https://github.com/calvinmetcalf/process-nextick-args&quot;) - &quot;MIT&quot;, [ramda@0.14.0](&quot;https://github.com/ramda/ramda&quot;) - &quot;MIT&quot;, [randomatic@1.1.0](&quot;git+https://github.com/jonschlinkert/randomatic&quot;) - &quot;MIT&quot;, [readable-stream@1.0.33](&quot;https://github.com/isaacs/readable-stream&quot;) - &quot;MIT&quot;, [readable-stream@1.1.13](&quot;https://github.com/isaacs/readable-stream&quot;) - &quot;MIT&quot;, [readable-stream@2.0.2](&quot;https://github.com/nodejs/readable-stream&quot;) - &quot;MIT&quot;, [readdirp@1.4.0](&quot;https://github.com/thlorenz/readdirp&quot;) - &quot;MIT&quot;, [regex-cache@0.4.2](&quot;https://github.com/jonschlinkert/regex-cache&quot;) - &quot;MIT&quot;, [repeat-element@1.1.2](&quot;https://github.com/jonschlinkert/repeat-element&quot;) - &quot;MIT&quot;, [repeat-string@1.5.2](&quot;https://github.com/jonschlinkert/repeat-string&quot;) - &quot;MIT&quot;, [repeating@1.1.3](&quot;git+https://github.com/sindresorhus/repeating&quot;) - &quot;MIT&quot;, [replace-ext@0.0.1](&quot;https://github.com/wearefractal/replace-ext&quot;) - [&quot;MIT&quot;], [sigmund@1.0.1](&quot;https://github.com/isaacs/sigmund&quot;) - &quot;ISC&quot;, [streamifier@0.1.1](&quot;https://github.com/gagle/node-streamifier&quot;) - &quot;MIT&quot;, [string_decoder@0.10.31](&quot;https://github.com/rvagg/string_decoder&quot;) - &quot;MIT&quot;, [strip-ansi@3.0.0](&quot;git+https://github.com/sindresorhus/strip-ansi&quot;) - &quot;MIT&quot;, [success-symbol@0.1.0](&quot;git+https://github.com/jonschlinkert/success-symbol&quot;) - &quot;MIT&quot;, [supports-color@2.0.0](&quot;git+https://github.com/chalk/supports-color&quot;) - &quot;MIT&quot;, [through2@0.6.5](&quot;git+https://github.com/rvagg/through2&quot;) - &quot;MIT&quot;, [through2@2.0.0](&quot;git+https://github.com/rvagg/through2&quot;) - &quot;MIT&quot;, [util-deprecate@1.0.1](&quot;https://github.com/TooTallNate/util-deprecate&quot;) - &quot;MIT&quot;, [vinyl@0.5.1](&quot;https://github.com/wearefractal/vinyl&quot;) - &quot;MIT&quot;, [xtend@4.0.0](&quot;https://github.com/Raynos/xtend&quot;) - [&quot;MIT&quot;], [yadda@0.11.7](&quot;https://github.com/acuminous/yadda&quot;) - &quot;Apache2&quot;, 
*documented by [npm-licenses](http://github.com/AceMetrix/npm-license.git)*.
