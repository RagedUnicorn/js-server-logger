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
    testIsLogLevelDebugEnabled: function (test) {
        test.expect(2);

        var logger1 = new Logger({
            logLevel: 'debug',
            colorMode: false
        });

        var logger2 = new Logger({
            logLevel: 'info',
            colorMode: false
        });

        test.ok(logger1.isDebugEnabled(), 'logLevel debug should be activated');
        test.deepEqual(logger2.isDebugEnabled(), false, 'logLevel debug should be deactivated');
        test.done();
    },
    testIsLogLevelInfoEnabled: function (test) {
        test.expect(2);

        var logger1 = new Logger({
            logLevel: 'info',
            colorMode: false
        });

        var logger2 = new Logger({
            logLevel: 'warn',
            colorMode: false
        });

        test.ok(logger1.isInfoEnabled(), 'logLevel info should be activated');
        test.deepEqual(logger2.isInfoEnabled(), false, 'logLevel info should be deactivated');
        test.done();
    },
    testIsLogLevelWarnEnabled: function (test) {
        test.expect(2);

        var logger1 = new Logger({
            logLevel: 'warn',
            colorMode: false
        });

        var logger2 = new Logger({
            logLevel: 'error',
            colorMode: false
        });

        test.ok(logger1.isWarnEnabled(), 'logLevel warn should be activated');
        test.deepEqual(logger2.isWarnEnabled(), false, 'logLevel warn should be deactivated');
        test.done();
    },
    testIsLogLevelErrorEnabled: function (test) {
        test.expect(1);

        var logger = new Logger({
            logLevel: 'error',
            colorMode: false
        });

        test.ok(logger.isErrorEnabled(), 'logLevel error should be activated');
        test.done();
    }
};
