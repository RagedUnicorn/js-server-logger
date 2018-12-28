'use strict';

var Logger = require('../../lib/logger.js');

module.exports = {
    setUp: function (callback) {
        var me = this;

        me.logger = new Logger({
            colorMode: false,
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
    testLogMultipleStatements: function (test) {
        test.expect(1);
        this.logger.error('error1', 'error2');
        test.equal('[ERROR]: error1,error2', this.value, 'expected strings to be equal');
        test.done();
    },
    testLogMultipleStatementsShortCut: function (test) {
        test.expect(1);
        this.logger.log('error', 'error1', 'error2');
        test.equal('[ERROR]: error1,error2', this.value, 'expected strings to be equal');
        test.done();
    },
    testLogObject: function (test) {
        test.expect(1);
        var foo = {
            'foo': 'bar'
        };

        this.logger.error(foo);
        test.equal('[ERROR]: ' + JSON.stringify({foo: 'bar'}, null, 4), this.value, 'expected strings to be equal');
        test.done();
    },
    testLogObjectShortCut: function (test) {
        test.expect(1);
        var foo = {
            'foo': 'bar'
        };

        this.logger.log('error', foo);
        test.equal('[ERROR]: ' + JSON.stringify({foo: 'bar'}, null, 4), this.value, 'expected strings to be equal');
        test.done();
    },
    testLogFunction: function (test) {
        test.expect(1);

        var foo = function () {};

        this.logger.log('error', foo);
        test.equal('[ERROR]: [Function]', this.value, 'expected strings to be equal');
        test.done();
    },
    testLogFunctionShortCut: function (test) {
        test.expect(1);

        var foo = function () {};

        this.logger.error(foo);
        test.equal('[ERROR]: [Function]', this.value, 'expected strings to be equal');
        test.done();
    }
};
