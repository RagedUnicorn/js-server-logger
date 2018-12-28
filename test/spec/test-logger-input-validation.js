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

        me.logger = new Logger({
            logLevel: 'debug',
            timeStamp: false
        });

        callback();
    },
    tearDown: function (callback) {
        console.log = this.preservedConsoleLog;
        callback();
    },
    testMissingParameter: function (test) {
        test.expect(1);

        var me = this;

        test.throws(
            function () {
                me.logger.log('debug');
            },
            function (err) {
                if ((err instanceof Error) && /log\(\): Missing parameter$/.test(err)) {
                    return true;
                }
            },
            'unexpected or missing error'
        );
        test.done();
    },
    testInvalidLogLevel: function (test) {
        test.expect(1);

        var me = this;

        test.throws(
            function () {
                me.logger.log('invalid loglevel', 'some message');
            },
            function (err) {
                if ((err instanceof Error) && /log\(\): Invalid loglevel$/.test(err)) {
                    return true;
                }
            },
            'unexpected or missing error'
        );
        test.done();
    }
};
