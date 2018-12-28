'use strict';

var fs = require('fs');
var path = require('path');

/**
 * @param {Object} config
 * @param {String} configPath
 * @param {String} workingDirectory
 */
function writeConfigSync(config, filePath, workingDirectory) {
    fs.writeFileSync(path.resolve(workingDirectory, filePath), JSON.stringify(config));
}

/**
 * @param {Object} config
 * @param {String} configPath
 * @param {String} workingDirectory
 */
function writeStringSync(content, filePath, workingDirectory) {
    fs.writeFileSync(path.resolve(workingDirectory, filePath), content);
}

/**
 * @param {String} dir
 */
function rmdirSync(dir) {
    var filename;
    var list;
    var stat;
    var i;

    if (!fs.existsSync(dir)) {
        return;
    }

    list = fs.readdirSync(dir);

    for (i = 0; i < list.length; i++) {
        filename = path.join(dir, list[i]);
        stat = fs.statSync(filename);

        if (stat.isDirectory()) {
            fs.rmdir(filename);
        } else {
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir);
}

/**
 * @param {String} path
 */
function createDirSync(path) {
    try {
        if (fs.existsSync(path)) {
            rmdirSync(path);
        }
        fs.mkdirSync(path);
    } catch (e) {
        throw new Error('createDir(): failed to create dir ' + path);
    }
}

module.exports = {
    writeConfigSync: writeConfigSync,
    rmdirSync: rmdirSync,
    createDirSync: createDirSync,
    writeStringSync: writeStringSync
};
