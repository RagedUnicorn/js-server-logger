'use strict';

var Logger = require('../../lib/logger.js');
var helper = require('../helper/test-helper.js');
var path = require('path');

module.exports = {
    setUp: function (callback) {
        var me = this;

        me.value = '';
        me.preservedConsoleLog = console.log;
        me.tmpPath = path.resolve(__dirname, '../tmp');

        // overwrite console log so we can spy on it
        console.log = function (str) {
            me.value = str;
        };

        // create tmp directory
        helper.createDirSync(me.tmpPath);
        callback();
    },
    tearDown: function (callback) {
        helper.rmdirSync(this.tmpPath);
        console.log = this.preservedConsoleLog;
        callback();
    },
    testDefaultTimeStamp: function (test) {
        test.expect(1);

        var logger = new Logger({
            logLevel: 'debug',
            logToConsole: true,
            timeStamp: true
        });
        var reg = /(\d{2}-){2}(\d){4}\s(((\d){2}):){2}(\d){2}\.(\d){0,3}/;
        var timeStamp;

        logger.error('error message');
        timeStamp = this.value.split(/\]\[/)[0].substr(1);

        test.ok(reg.test(timeStamp), 'regular expression should match the generated string');
        test.done();
    }
};
