'use strict';

var Logger = require('../../lib/logger.js');

module.exports = {
    setUp: function (callback) {
        var me = this;

        me.logger = new Logger({
            logLevel: 'debug',
            timeStamp: false
        }); // default values for config
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
        test.equal(this.value, '[ERROR]: error message', 'expected strings to be equal');
        test.done();
    },
    testLogWarnOutput: function (test) {
        test.expect(1);
        this.logger.warn('warn message');
        test.equal(this.value, '[WARN]: warn message', 'expected strings to be equal');
        test.done();
    },
    testLogInfoOutput: function (test) {
        test.expect(1);
        this.logger.info('info message');
        test.equal(this.value, '[INFO]: info message', 'expected strings to be equal');
        test.done();
    },
    testLogDebugOutput: function (test) {
        test.expect(1);
        this.logger.debug('debug message');
        test.equal(this.value, '[DEBUG]: debug message', 'expected strings to be equal');
        test.done();
    },
    testParamLogErrorOutput: function (test) {
        test.expect(1);
        this.logger.log('error', 'error message');
        test.equal(this.value, '[ERROR]: error message', 'expected strings to be equal');
        test.done();
    },
    testParamLogWarnOutput: function (test) {
        test.expect(1);
        this.logger.log('warn', 'warn message');
        test.equal(this.value, '[WARN]: warn message', 'expected strings to be equal');
        test.done();
    },
    testParamLogInfoOutput: function (test) {
        test.expect(1);
        this.logger.log('info', 'info message');
        test.equal(this.value, '[INFO]: info message', 'expected strings to be equal');
        test.done();
    },
    testParamLogDebugOutput: function (test) {
        test.expect(1);
        this.logger.log('debug', 'debug message');
        test.equal(this.value, '[DEBUG]: debug message', 'expected strings to be equal');
        test.done();
    }
};
