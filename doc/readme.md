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

## Dependencies
[ansi-regex@0.2.1](&quot;https://github.com/sindresorhus/ansi-regex&quot;) - &quot;MIT&quot;, [ansi-styles@1.1.0](&quot;https://github.com/sindresorhus/ansi-styles&quot;) - &quot;MIT&quot;, [chalk@0.5.1](&quot;https://github.com/sindresorhus/chalk&quot;) - &quot;MIT&quot;, [clone-stats@0.0.1](&quot;https://github.com/hughsk/clone-stats&quot;) - &quot;MIT&quot;, [core-util-is@1.0.1](&quot;https://github.com/isaacs/core-util-is&quot;) - &quot;MIT&quot;, [dateformat@1.0.8-1.2.3](&quot;https://github.com/felixge/node-dateformat&quot;) - &quot;MIT*&quot;, [duplexer2@0.0.2](&quot;https://github.com/deoxxa/duplexer2&quot;) - &quot;BSD&quot;, [dustjs-helpers@1.2.0](&quot;https://github.com/linkedin/dustjs-helpers&quot;) - &quot;MIT&quot;, [dustjs-linkedin@2.3.5](&quot;https://github.com/linkedin/dustjs&quot;) - &quot;MIT&quot;, [escape-string-regexp@1.0.1](&quot;https://github.com/sindresorhus/escape-string-regexp&quot;) - &quot;MIT&quot;, [gulp-util@3.0.0](&quot;https://github.com/wearefractal/gulp-util&quot;) - [&quot;MIT&quot;], [gulp-yadda-steps@0.0.0](&quot;https://github.com/Cellarise/gulp-yadda-steps&quot;) - &quot;MIT License (MIT)&quot;, [has-ansi@0.1.0](&quot;https://github.com/sindresorhus/has-ansi&quot;) - &quot;MIT&quot;, [inherits@2.0.1](&quot;https://github.com/isaacs/inherits&quot;) - &quot;ISC&quot;, [isarray@0.0.1](&quot;https://github.com/juliangruber/isarray&quot;) - &quot;MIT&quot;, [lodash._escapehtmlchar@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._escapestringchar@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._htmlescapes@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._isnative@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._objecttypes@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._reinterpolate@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._reunescapedhtml@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash._shimkeys@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.defaults@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.escape@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.isobject@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.keys@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.template@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.templatesettings@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash.values@2.4.1](&quot;https://github.com/lodash/lodash-cli&quot;) - &quot;MIT&quot;, [lodash@2.4.1](&quot;https://github.com/lodash/lodash&quot;) - &quot;MIT&quot;, [minimist@0.2.0](&quot;https://github.com/substack/minimist&quot;) - &quot;MIT&quot;, [multipipe@0.1.1](&quot;https://github.com/segmentio/multipipe&quot;) - &quot;MIT*&quot;, [readable-stream@1.0.27-1](&quot;https://github.com/isaacs/readable-stream&quot;) - &quot;MIT&quot;, [readable-stream@1.1.13](&quot;https://github.com/isaacs/readable-stream&quot;) - &quot;MIT&quot;, [streamifier@0.1.0](&quot;https://github.com/gagle/node-streamifier&quot;) - &quot;MIT&quot;, [string_decoder@0.10.31](&quot;https://github.com/rvagg/string_decoder&quot;) - &quot;MIT&quot;, [strip-ansi@0.3.0](&quot;https://github.com/sindresorhus/strip-ansi&quot;) - &quot;MIT&quot;, [supports-color@0.2.0](&quot;https://github.com/sindresorhus/supports-color&quot;) - &quot;MIT&quot;, [through2@0.5.1](&quot;https://github.com/rvagg/through2&quot;) - &quot;MIT&quot;, [vinyl@0.2.3](&quot;https://github.com/wearefractal/vinyl&quot;) - [&quot;MIT&quot;], [xtend@3.0.0](&quot;https://github.com/Raynos/xtend&quot;) - [&quot;MIT&quot;], [yadda@0.11.2](&quot;https://github.com/acuminous/yadda&quot;) - &quot;Apache2&quot;, 
*documented by [npm-licenses](http://github.com/AceMetrix/npm-license.git)*.