'use strict';

/**
 * pad number
 * @param {Number} n
 * @param {Number} width
 * @param {String} z
 * @return padded string if length was < than the expected length
 */
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/**
 * prints something like: 06-08-2013 21:16:54.784
 * @return {String} date-string
 */
function createDefaultDate() {
    var date = new Date();

    return pad(date.getMonth(), 2) + '-' +
        pad(date.getDate(), 2) + '-' +
        date.getFullYear() + ' ' +
        pad(date.getHours(), 2) + ':' +
        pad(date.getMinutes(), 2) + ':' +
        pad(date.getSeconds(), 2) + '.' +
        pad(date.getMilliseconds(), 3);
}

/**
 * @param {String} logMessage
 * @return {String} logMessage with prepended timestamp
 */
function addTimeStamp(logMessage) {
    return '[' + createDefaultDate() + ']' + logMessage;
}

module.exports = {
    addTimeStamp: addTimeStamp
};
