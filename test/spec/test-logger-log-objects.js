'use strict';

var Logger = require('../../lib/logger.js');

module.exports = {
    setUp: function (callback) {
        var me = this;

        me.logger = new Logger({
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
    testLogString: function (test) {
        test.expect(1);
        this.logger.error('error message');
        test.equal(this.value, '[ERROR]: error message', 'expected strings to be equal');
        test.done();
    },
    testLogNumber: function (test) {
        test.expect(1);
        this.logger.error(1);
        test.equal(this.value, '[ERROR]: 1', 'expected strings to be equal');
        test.done();
    },
    testLogArray: function (test) {
        test.expect(1);
        this.logger.error(['foo', 'bar']);
        test.equal(this.value, '[ERROR]: [\n    "foo",\n    "bar"\n]', 'expected strings to be equal');
        test.done();
    },
    testLogObject: function (test) {
        test.expect(1);
        this.logger.error({'foo': 'value', 'bar': 'value'});
        test.equal(this.value, '[ERROR]: {\n    "foo": "value",\n    "bar": "value"\n}',
            'expected strings to be equal');
        test.done();
    },
    testLogFunction: function (test) {
        test.expect(1);
        this.logger.error(function () {
            console.log('foo');
        });
        test.equal(this.value, '[ERROR]: [Function]', 'expected strings to be equal');
        test.done();
    },
    testLogMixed: function (test) {
        test.expect(1);
        this.logger.error(function () {
            console.log('foo');
        }, {
            'foo': 'bar'
        }, [
            'foo',
            'bar'
        ], 1, 'foo');
        test.equal(this.value, '[ERROR]: [Function],{\n    "foo": "bar"\n},[\n    "foo",\n    "bar"\n],1,foo',
            'expected strings to be equal');
        test.done();
    }
};
