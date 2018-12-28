'use strict';

var fs = require('fs');
var path = require('path');
var util = require('../util/util.js');
var config = {};
// defaults for config object
// acts as a known properties object at the same time. All options must be added here
var defaults = {
    levels: ['debug', 'info', 'warn', 'error'],
    logLevel: 'debug',
    colorMode: false,
    logToConsole: true,
    logToFile: false,
    file: null,
    timeStamp: true,
    logActive: true
};

/**
 * check config object for unkown parameters
 * @param {Object} config
 */
function checkConfig(config) {
    for (var option in config) {
        if (config.hasOwnProperty(option)) {
            if (!defaults.hasOwnProperty(option)) {
                throw new Error('checkConfig(): unkown option \'' + option + '\' found');
            }
        }
    }
}

/**
 * @param {Object|String} config
 *                      A javascript object or a path to a file
 * @param {String} workingDirectory
 *                      Optional parameter working directory for relative paths
 */
config.getConfig = function (config, workingDirectory) {
    var configPath;
    var parsedConfig;

    // do not create an empty object if a number or a boolean value is passed
    if (config === undefined || null) {
        config = {};
    }

    if (typeof config === 'string') {
        try {
            configPath = config;

            // if working directory is not passed we assume an absolute path
            if (workingDirectory) {
                configPath = path.resolve(workingDirectory, config);
            }
            var data = fs.readFileSync(configPath, 'utf8');

            parsedConfig = JSON.parse(data);
        } catch (e) {
            // rethrow file not found error
            if (e.code === 'ENOENT') {
                throw e;
            }
            throw new Error('getConfig(): failed to parse config');
        }
        checkConfig(parsedConfig);
        parsedConfig.configPath = configPath;

        return util.merge(defaults, parsedConfig);
    } else if (Object.prototype.toString.call(config) === '[object Object]') {
        checkConfig(config);
        return util.merge(defaults, config);
    } else {
        throw new Error('getConfig(): expected a path to a file or an object');
    }
};

module.exports = config;
