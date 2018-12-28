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
        test.expect(4);
        var logger = new Logger({
            logLevel: 'error',
            timeStamp: false
        });

        logger.debug('debug message should not be shown');
        test.equal(this.value, '', 'message should not be printed');
        logger.info('info message should not be shown');
        test.equal(this.value, '', 'message should not be printed');
        logger.warn('warn message should not be shown');
        test.equal(this.value, '', 'message should not be printed');

        logger.error('error message');
        test.equal(this.value, '[ERROR]: error message', 'message should be printed');

        test.done();
    },
    testLogLevelWarn: function (test) {
        test.expect(4);
        var logger = new Logger({
            logLevel: 'warn',
            timeStamp: false
        });

        logger.debug('debug message should not be shown');
        test.equal(this.value, '', 'message should not be printed');
        logger.info('info message should not be shown');
        test.equal(this.value, '', 'message should not be printed');

        logger.warn('warn message');
        test.equal(this.value, '[WARN]: warn message', 'message should be printed');
        logger.error('error message');
        test.equal(this.value, '[ERROR]: error message', 'message should be printed');

        test.done();
    },
    testLogLevelInfo: function (test) {
        test.expect(4);
        var logger = new Logger({
            logLevel: 'info',
            timeStamp: false
        });

        logger.debug('debug message should not be shown');
        test.equal(this.value, '', 'message should not be printed');

        logger.info('info message');
        test.equal(this.value, '[INFO]: info message', 'message should be printed');
        logger.warn('warn message');
        test.equal(this.value, '[WARN]: warn message', 'message should be printed');
        logger.error('error message');
        test.equal(this.value, '[ERROR]: error message', 'message should be printed');

        test.done();
    },
    testLogLevelDebug: function (test) {
        test.expect(4);
        var logger = new Logger({
            logLevel: 'debug',
            timeStamp: false
        });

        logger.debug('debug message');
        test.equal(this.value, '[DEBUG]: debug message', 'message should be printed');
        logger.info('info message');
        test.equal(this.value, '[INFO]: info message', 'message should be printed');
        logger.warn('warn message');
        test.equal(this.value, '[WARN]: warn message', 'message should be printed');
        logger.error('error message');
        test.equal(this.value, '[ERROR]: error message', 'message should be printed');

        test.done();
    }
};
