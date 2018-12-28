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
    testDisableLog: function (test) {
        test.expect(1);

        this.logger.disableLog();
        this.logger.error('error message');
        test.equal(this.value, '', 'value should be an empty string');

        test.done();
    },
    testEnableLog: function (test) {
        test.expect(2);

        this.logger.disableLog();
        this.logger.error('error message');
        test.equal(this.value, '', 'value should be an empty string');

        this.logger.enableLog();
        this.logger.error('error message');
        test.equal(this.value, '[ERROR]: error message', 'expected strings to be equal');

        test.done();
    },
    testIsEnabled: function (test) {
        test.expect(4);

        this.logger.disableLog();

        test.equal(this.logger.isDebugEnabled(), false);
        test.equal(this.logger.isInfoEnabled(), false);
        test.equal(this.logger.isWarnEnabled(), false);
        test.equal(this.logger.isErrorEnabled(), false);

        test.done();
    }
};
