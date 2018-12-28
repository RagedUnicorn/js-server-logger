'use strict';

var fs = require('fs');
var os = require('os');
var eol = os.EOL || '\n';
var openedFile;

/**
 * close all streams on exit
 */
process.on('exit', function () {
    if (openedFile) {
        openedFile.end();
    }
});

/**
 * @param {String} path to a file
 * @return {Object} writeStream to passed file
 */
function openStream(file) {
    var stream;

    if (!file) {
        throw new Error('openStream(): you must define a filename');
    }

    stream = fs.createWriteStream(
        file,
        {
            encoding: 'utf8',
            mode: parseInt('0644', 8),
            flags: 'a'
        }
    );

    stream.on('error', function (err) {
        throw new Error('openStream(): error while writing to stream', err);
    });
    return stream;
}

/**
 * @param {String} path to a file
 * @return {Function} write to stream function
 */
var FileAppender = function (file) {
    this.file = file;

    var logFile = openStream(file);
    openedFile = logFile;

    return function (message) {
        logFile.write(message + eol, 'utf8');
    };
};

module.exports = FileAppender;
