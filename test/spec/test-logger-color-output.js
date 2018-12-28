'use strict';

var Logger = require('../../lib/logger.js');

module.exports = {
    setUp: function (callback) {
        var me = this;

        me.logger = new Logger({
            colorMode: true,
            logLevel: 'debug',
            timeStamp: false
        });
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
    testLogErrorOutput: function (test) {
        test.expect(1);
        this.logger.error('error message');
        test.equal(this.value, '\u001b[31m[ERROR]: error message\u001b[0m', 'expected strings to be equal');
        test.done();
    },
    testLogWarnOutput: function (test) {
        test.expect(1);
        this.logger.warn('warn message');
        test.equal(this.value, '\u001b[33m[WARN]: warn message\u001b[0m', 'expected strings to be equal');
        test.done();
    },
    testLogInfoOutput: function (test) {
        test.expect(1);
        this.logger.info('info message');
        test.equal(this.value, '\u001b[36m[INFO]: info message\u001b[0m', 'expected strings to be equal');
        test.done();
    },
    testLogDebugOutput: function (test) {
        test.expect(1);
        this.logger.debug('debug message');
        test.equal(this.value, '\u001b[35m[DEBUG]: debug message\u001b[0m', 'expected strings to be equal');
        test.done();
    }
};
