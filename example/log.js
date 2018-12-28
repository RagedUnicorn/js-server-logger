'use strict';

var Logger = require('../lib/logger.js');
var path = require('path');

// setup config
var logger = new Logger(path.join(__dirname, 'config.json'));

logger.on('log', function (level, message) {
    console.log('logged: ' + message + ' with level of: ' + level);
});

module.exports = logger;
