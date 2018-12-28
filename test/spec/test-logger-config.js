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
    testNoConfig: function (test) {
        test.expect(1);

        var logger = new Logger();
        var config = logger.getConfig();
        var defaults = {
            levels: ['debug', 'info', 'warn', 'error'],
            logLevel: 'debug',
            colorMode: false,
            logToFile: false,
            logToConsole: true,
            timeStamp: true,
            file: null,
            logActive: true
        };

        test.deepEqual(config, defaults, 'objects should be equal');
        test.done();
    },
    testCustomConfig: function (test) {
        test.expect(2);

        var logger = new Logger({
            logLevel: 'info',
            colorMode: true
        });

        var config = logger.getConfig();

        test.equal(config.logLevel, 'info', 'logLevel should be `info`');
        test.ok(config.colorMode, 'colorMode should be activated');
        test.done();
    },
    testInvalidConfig: function (test) {
        test.expect(4);

        var logger1;
        var logger2;

        test.throws(
            function () {
                logger1 = new Logger(0);
            },
            function (err) {
                if ((err instanceof Error) && /expected a path to a file or an object$/.test(err)) {
                    return true;
                }
            },
            'unexpected or missing error'
        );

        test.throws(
            function () {
                logger2 = new Logger(true);
            },
            function (err) {
                if ((err instanceof Error) && /expected a path to a file or an object$/.test(err)) {
                    return true;
                }
            },
            'unexpected or missing error'
        );

        test.equal(logger1, undefined, 'logger should be still undefined');
        test.equal(logger2, undefined, 'logger should be still undefined');
        test.done();
    },
    testConfigUnkownProperty: function (test) {
        test.expect(2);

        var logger;

        test.throws(
            function () {
                logger = new Logger({
                    customProperty: 'foo'
                });
            },
            function (err) {
                if ((err instanceof Error) && /unkown option 'customProperty' found$/.test(err)) {
                    return true;
                }
            },
            'unexpected or missing error'
        );
        test.equal(logger, undefined, 'logger should be still undefined');
        test.done();
    },
    testPrivateConfig: function (test) {
        test.expect(1);

        var logger1 = new Logger({
            logLevel: 'foo'
        });

        var logger2 = new Logger({
            logLevel: 'bar'
        });

        var config1 = logger1.getConfig();
        var config2 = logger2.getConfig();
        test.notEqual(config1.logLevel, config2.logLevel, 'each logger should get its own configuration');
        test.done();
    },
    testNonExistingFileConfig: function (test) {
        test.expect(2);

        var logger;

        test.throws(
            function () {
                logger = new Logger('../config.json');
            },
            function (err) {
                if ((err instanceof Error) && /ENOENT, no such file or directory/.test(err)) {
                    return true;
                }
            },
            'unexpected or missing error'
        );
        test.equal(logger, undefined, 'logger should be still undefined');
        test.done();
    },
    testValidFileConfig: function (test) {
        test.expect(3);

        var logger;
        var configName = 'test-config.json';
        var me = this;
        var config = {
            logLevel: 'warn',
            colorMode: true
        };
        var finalConfig;

        helper.writeConfigSync(config, path.join(me.tmpPath, configName));

        test.doesNotThrow(
            function () {
                logger = new Logger(path.resolve(me.tmpPath, configName));
            },
            function (err) {
                if ((err instanceof Error) && /ENOENT, no such file or directory/.test(err)) {
                    return true;
                }
            },
            'unexpected or missing error'
        );
        finalConfig = logger.getConfig();

        test.equal(finalConfig.logLevel, config.logLevel, 'final config should be equal to the defined one');
        test.equal(finalConfig.colorMode, config.colorMode, 'final config should be equal to the defined one');
        test.done();
    },
    testInvalidFileConfig: function (test) {
        test.expect(2);

        var logger;
        var configName = 'test-config.json';
        var me = this;

        // write {\"logLevel\": \"info\", \"colorMode\": true,} to file which is invalid json
        helper.writeStringSync('{"logLevel": "info", "colorMode": true,}', path.join(me.tmpPath, configName));

        test.throws(
            function () {
                logger = new Logger(path.resolve(me.tmpPath, configName));
            },
            function (err) {
                if ((err instanceof Error) && /failed to parse config$/.test(err)) {
                    return true;
                }
            },
            'unexpected or missing error'
        );
        test.equal(logger, undefined, 'logger should be still undefined');
        test.done();
    },
    testAbsoluteFileConfig: function (test) {
        test.expect(2);

        var configPath = path.join(__dirname, '../tmp/test-config.json');
        var config = {
            logLevel: 'warn',
            colorMode: true
        };
        var logger;
        var finalConfig;

        helper.writeConfigSync(config, configPath);
        logger = new Logger(configPath, __dirname);
        finalConfig = logger.getConfig();

        test.equal(finalConfig.logLevel, config.logLevel, 'final config should be equal to the defined one');
        test.equal(finalConfig.colorMode, config.colorMode, 'final config should be equal to the defined one');
        test.done();
    },
    testRelativeFileConfig: function (test) {
        test.expect(2);

        var configPath = '../tmp/test-config.json';
        var config = {
            logLevel: 'warn',
            colorMode: true
        };
        var logger;
        var finalConfig;

        helper.writeConfigSync(config, configPath, __dirname);
        logger = new Logger(configPath, __dirname);
        finalConfig = logger.getConfig();

        test.equal(finalConfig.logLevel, config.logLevel, 'final config should be equal to the defined one');
        test.equal(finalConfig.colorMode, config.colorMode, 'final config should be equal to the defined one');
        test.done();
    }
};
