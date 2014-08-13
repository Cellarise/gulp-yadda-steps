# gulp-yadda-steps
[![view on npm](http://img.shields.io/npm/v/gulp-yadda-steps.svg)](https://www.npmjs.org/package/gulp-yadda-steps)
[![npm module downloads per month](http://img.shields.io/npm/dm/gulp-yadda-steps.svg)](https://www.npmjs.org/package/gulp-yadda-steps)
[![Dependency Status](https://david-dm.org/Cellarise/gulp-yadda-steps.svg)](https://david-dm.org/Cellarise/gulp-yadda-steps)

> A gulp task to generate or update Yadda test step libraries from Gherkin features (natural language test scripts).


##Usage 

This gulp task expects a feature file, written in Gherkin syntax, as input, and outputs the matching Yadda test step libraries for this feature file.

### As a gulp task

Require this package and use as part of your gulp task.

```js
var GulpYaddaSteps = require('gulp-yadda-steps');
gulp.src('local.feature')
.pipe(new GulpYaddaSteps())
.pipe(fs.createWriteStream('output.js'));
```


# API
{{>main}}
*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*.


# License

MIT License (MIT)

Copyright (c) 2014 John Barry