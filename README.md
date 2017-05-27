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
        <td colspan=4><strong>Version: 0.1.27 - released 2017-05-28</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-48</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.26 - released 2017-01-24</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-47</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.25 - released 2017-01-02</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-46</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.23 - released 2016-12-30</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-45</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.22 - released 2016-10-05</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-44</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.21 - released 2016-09-23</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-43</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.20 - released 2016-09-06</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-42</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.19 - released 2016-08-09</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-41</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.18 - released 2016-08-07</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-40</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.17 - released 2016-03-28</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-39</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.16 - released 2016-02-16</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-38</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-37</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.15 - released 2015-11-13</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-36</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.14 - released 2015-08-25</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-28</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-27</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-35</td>
            <td><p>Package: Update development dependencies and configure for travis-ci</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-34</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-33</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-32</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-31</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
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
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-26</td>
            <td><p>Package: Update development dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.12 - released 2015-05-21</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-25</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.11 - released 2015-05-20</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-24</td>
            <td><p>Package: Replace underscore.js with ramda.js</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-23</td>
            <td><p>Package: Update docs with updated jsdoc2markdown formatting</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-22</td>
            <td><p>Package: Update eslint configuration, test.js runner and dev dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-21</td>
            <td><p>Package: Update eslint configuration, test.js runner and dev dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.10 - released 2014-10-19</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
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
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-18</td>
            <td><p>Package: Migrate from jshint to eslint static code analysis</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.9 - released 2014-10-12</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-17</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-16</td>
            <td><p>Package: Remove all gulp tasks except &#39;test&#39; and update readme docs</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.8 - released 2014-10-06</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
            <td style="width:80px;text-align:left;">Non-functional</td>
            <td style="width:80px;text-align:left;">MDGSTEP-15</td>
            <td><p>Package: Update package dependencies</p><p></p></td>
          </tr>
        

<tr>
        <td colspan=4><strong>Version: 0.1.7 - released 2014-09-22</strong></td>
      </tr>
        
<tr>
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
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
            <td style="width:20px;padding:0;margin:0;text-align:center;"><img src="https://jira.cellarise.com:80/secure/viewavatar?size=xsmall&amp;avatarId=10418&amp;avatarType=issuetype"/></td>
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
[gulp-yadda-steps@0.1.26](&quot;https://github.com/Cellarise/gulp-yadda-steps&quot;) - &quot;MIT License (MIT)&quot;, 
*documented by [npm-licenses](http://github.com/AceMetrix/npm-license.git)*.

