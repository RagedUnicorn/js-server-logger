'use strict';

var util = exports;

util.isObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

/**
 * @param {Object}
 * @return true if it is a number, false if not
 */
util.isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

/**
 * @param {Object} obj
 * @return true if it is an array, false if not
 */
util.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

/**
 * @param {Object} obj
 * @return true if it is an arguments object, false if not
 */
util.isArguments = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Arguments]';
};

/**
 * @param {Object} obj
 * @return true if it is a function, false if not
 */
util.isFunction = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
};

/**
 * Merge objects into one. Multiple objects can be passed. Objects will be merged in the order they are passed
 * overwritting already set properties.
 * There will be a new object created, the passed objects are not modified
 */
util.merge = function () {
    var obj = {},
        args = Array.prototype.slice.call(arguments);

    if (!args) {
        throw new Error('merge(): Missing parameter');
    }

    args.forEach(function (item) {
        // ignore non-objects
        if (!util.isObject(item)) {
            return;
        }

        for (var attr in item) {
            if (item.hasOwnProperty(attr)) {
                obj[attr] = item[attr];
            }
        }
    });

    return obj;
};
