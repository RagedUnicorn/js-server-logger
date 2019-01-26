# js-server-logger

> This logger is a simple server side logger for nodejs. It's goal is to be very lightweight and easy to use.

## Instantiate a logger

The easiest way to use the logger is by creating a separate logger file and then require this file in each of your modules.

```js
// log.js
var Logger = require('logger.js');

var logger = new Logger();

module.exports = logger;
```

```js
// example.js
var log = require('./log.js');
```

By exporting the instantiated logger you can then require the logger in every file you need it.
All the configuration takes place in one single location. The example above uses all the defaults for the logger, but you can override all the default values.

```js
var logger = new Logger({
    logLevel: 'warn',
    colorMode: true
});
```

If you prefer a separate config file you can also save your configuration into a json file.

```js
var logger = new Logger('/path/to/file');
```

Make sure you pass `__dirname` if you use a relative path to the config file

```js
var logger = new Logger('../relative/path/config.json', __dirname);
```
or

```js
var path = require('path');

var logger = new Logger(path.join(__dirname, '../relative/path/config.json'));
```


## Debuglevels in order:

- debug
- info
- warn
- error

```js
logger.log('debug'|'info'|'warn'|'error', [message])

logger.debug([message]);
logger.info([message]);
logger.warn([message]);
logger.error([message]);
```

## Options

### logLevel
Type `String` Default value `debug`

Sets the level of which messages should get displayed.


### colorMode
Type `Boolean` Default value `false`

Displays logs with color if set to true. If you didn't change the colors in your terminal the following colors should be displayed.

- error (red)
- warn (yellow)
- info (cyan)
- debug (magenta)

### logToFile
Type `Boolean` Default value `false`

Logs all messages to a file if set to true

### logToConsole
Type `Boolean` Default value `true`

Logs all messages to the console if set to true

### file
Type `String` Default value `null`

### timeStamp
Type `Boolean` Default value `false`

Adds a timestamp to each logmessage if set to true, e.g. `06-08-2013 21:16:54.784`

## Disable logging

Logging can get completely disabled and enabled at a later point.
**Note:** Disables the following native logging functions:

- console.log
- console.info
- console.warn
- console.error

```js
logger.disableLog();
console.log('will not be displayed');

logger.enableLog();
console.log('will be displayed');
```

## Check if loglevel is enabled

For every loglevel there is a method to check if the current loglevel is available. This can be used as a little performance boost,
when concatenating long strings or doing some other work before logging.

```js
logger.isDebugEnabled()
logger.isInfoEnabled();
logger.isWarnEnabled();
logger.isErrorEnabled();
```
Example:

```js
var logger = new Logger({
    logLevel: 'warn'
});

if (logger.isWarnEnabled()) {
    logger.warn('warn message');
}
```

## Events

The logger emits a log event each time a message was logged. It does not fire the log event multiple times even if logTofile and logToConsole are both true.

```js
var logger = new Logger(path.join(__dirname, 'config.json'));

logger.on('log', function (level, message) {
    console.log('logged: ' + message + ' with level of: ' + level);
});
```

## Grunt
This project uses grunt and has pre-configured tasks for linting and running a testsuite. To get started install all dependencies with:

```js
npm install
```

You can create a minified single file with:

```js
grunt build
```

## License

Copyright (c) 2019 Michael Wiesendanger

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
