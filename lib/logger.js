'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var FileAppender = require('./logger/appender.js');
var config = require('./logger/config.js');
var color = require('./logger/color.js');
var date = require('./logger/date.js');
var logUtils = require('./util/util.js');

/**
 * Constructor
 * @param {Object} conf
 * @param {String} workingDirectory
 *                          Option parameter - working directory
 */
var Logger = function (conf, workingDirectory) {
    this.config = config.getConfig(conf, workingDirectory);
};

util.inherits(Logger, EventEmitter);

/**
 * @param {String} level
 * @param {Array} args
 */
function buildLogMessage(level, args) {
    var message = [];

    for (var i = 0; i < args.length; i++) {
        var item = args[i];

        if (logUtils.isFunction(item)) {
            message.push('[Function]');
        } else if (typeof item !== 'string' && !logUtils.isNumber(item)) {
            message.push(JSON.stringify(item, null, 4));
        } else {
            message.push(item);
        }
    }

    return '[' + level.toUpperCase() + ']: ' + message;
}

/**
 * @return true if the loglevel is available, false if not
 */
function isLogLevelActive(level, config) {
    if (config.levels.indexOf(level) >= config.levels.indexOf(config.logLevel) && config.logActive) {
        return true;
    }
    return false;
}

/**
 * @param {String} level
 * @param {String} message
 */
Logger.prototype.log = function (level, args) {
    var logMessage;
    var config = this.config;

    if (!args) {
        throw new Error('log(): Missing parameter');
    }

    if (config.levels.indexOf(level) === -1) {
        throw new Error('log(): Invalid loglevel');
    }

    // direct call to log
    if (!logUtils.isArguments(args)) {
        args = Array.prototype.slice.call(arguments);
        level = args.splice(0, 1)[0]; // get level
    }

    if (isLogLevelActive(level, config)) {
        logMessage = buildLogMessage(level, args);

        if (config.timeStamp) {
            logMessage = date.addTimeStamp(logMessage);
        }

        if (config.logToFile) {
            if (!this.appender) {
                this.appender = new FileAppender(config.file);
            }
            this.appender(logMessage);
        }

        if (config.logToConsole) {
            if (config.colorMode) {
                console.log(color.colorize(level, logMessage));
            } else {
                console.log(logMessage);
            }
        }
        this.emit('log', level, logMessage);
    }
};

Logger.prototype.error = function () {
    this.log('error', arguments);
};

Logger.prototype.warn = function () {
    this.log('warn', arguments);
};

Logger.prototype.info = function () {
    this.log('info', arguments);
};

Logger.prototype.debug = function () {
    this.log('debug', arguments);
};

Logger.prototype.isDebugEnabled = function () {
    return isLogLevelActive('debug', this.config);
};

Logger.prototype.isInfoEnabled = function () {
    return isLogLevelActive('info', this.config);
};

Logger.prototype.isWarnEnabled = function () {
    return isLogLevelActive('warn', this.config);
};

Logger.prototype.isErrorEnabled = function () {
    return isLogLevelActive('error', this.config);
};

Logger.prototype.disableLog = function () {
    this.config.logActive = false;

    this.retainedLog = console.log;
    this.retainedInfo = console.info;
    this.retainedWarn = console.warn;
    this.retainedError = console.error;

    console.log = function () {};
    console.info = function () {};
    console.warn = function () {};
    console.error = function () {};
};

Logger.prototype.enableLog = function () {
    this.config.logActive = true;

    console.log = this.retainedLog;
    console.info = this.retainedInfo;
    console.warn = this.retainedWarn;
    console.error = this.retainedError;
};

/**
 * @param {String} message
 */
Logger.prototype.getConfig = function () {
    return this.config;
};

module.exports = Logger;
