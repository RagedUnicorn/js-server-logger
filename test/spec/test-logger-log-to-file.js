'use strict';

var Logger = require('../../lib/logger.js');
var helper = require('../helper/test-helper.js');
var path = require('path');
var fs = require('fs');

module.exports = {
    setUp: function (callback) {
        this.tmpPath = path.resolve(__dirname, '../tmp');

        // create tmp directory
        helper.createDirSync(this.tmpPath);
        callback();
    },
    tearDown: function (callback) {
        helper.rmdirSync(this.tmpPath);
        callback();
    },
    testLogToFile: function (test) {
        test.expect(2);

        var logPath = path.join(this.tmpPath, 'test.log');

        var logger = new Logger({
            logLevel: 'debug',
            logToFile: true,
            logToConsole: false,
            timeStamp: false,
            file: logPath
        });

        logger.error('error message');

        fs.readFile(logPath, 'utf8', function (err, data) {
            test.strictEqual(err, null, 'expected no error');
            test.equal(data, '[ERROR]: error message\n', 'expected strings to be equal');
            test.done();
        });
    },
    testMissingLogFile: function (test) {
        test.expect(1);

        var logger = new Logger({
            logLevel: 'debug',
            logToFile: true,
            logToConsole: false,
            timeStamp: false
        });

        test.throws(
            function () {
                logger.error('error message');
            },
            function (err) {
                if ((err instanceof Error) && /you must define a filename$/.test(err)) {
                    return true;
                }
            },
            'unexpected or missing error'
        );
        test.done();
    }
};
