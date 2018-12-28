'use strict';

var Logger = require('../../lib/logger.js');

module.exports = {
    setUp: function (callback) {
        var me = this;

        me.value = '';
        me.preservedConsoleLog = console.log;

        // overwrite console log so we can spy on it
        console.log = function (str) {
            me.value = str;
        };

        callback();
    },
    tearDown: function (callback) {
        console.log = this.preservedConsoleLog;
        callback();
    },
    testLogLevelError: function (test) {
        test.expect(2);
        var logger = new Logger({
            logLevel: 'debug',
            timeStamp: false
        });

        logger.on('log', function (level, message) {
            test.equal(level, 'debug', 'loglevel should be `debug`');
            test.equal(message, '[DEBUG]: debug message', 'expected strings to be equal');
            test.done();
        });

        logger.debug('debug message');
    }
};
