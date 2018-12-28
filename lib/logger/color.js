'use strict';

var colors = {
    'error': '\u001b[31m', // red
    'warn': '\u001b[33m', // yellow
    'info': '\u001b[36m', // cyan
    'debug': '\u001b[35m', // magenta
    'reset': '\u001b[0m'
};

/**
 * @param {String} message
 * @param {String} color
 * @return {String}
 */
exports.colorize = function (level, message) {
    if (typeof colors[level] !== 'string') {
        throw new Error('colorize(): Unkown logLevel');
    }

    return [colors[level], message, colors.reset].join('');
};
