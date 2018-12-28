#!/usr/bin/env node
'use strict';

module.exports = function (grunt) {
    var pkg = require("./package.json");

    grunt.initConfig({
        meta: {
            src: 'lib/**/*.js',
            test: 'test/**/*.js',
            specs: 'test/spec/*.js',
            example: 'example/**/*.js'
        },
        pkg: pkg,
        jshint: {
            // global options
            options: {
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                nonew: true,
                plusplus: false,
                quotmark: 'single',
                undef: true,
                unused: true,
                strict: true,
                maxparams: 4,
                maxdepth: 4,
                trailing: true,
                maxlen: 120,
                browser: true,
                node: true,
                white: true,
                "-W040": true
            },
            server_logger: {
                expand: true,
                src: ['<%= meta.src %>', '<%= meta.test %>', '<%= meta.example %>'],
                options: {
                    browser: false
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/logger.min.js': '<%= meta.src %>'
                }
            }
        },
        nodeunit: {
            server_logger: {
                expand: true,
                src: '<%= meta.specs %>'
            }
        }
    });

    // npm tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    /* DEFAULT */
    grunt.registerTask('default', ['jshint', 'test']);

    /* UGLIFY */
    grunt.registerTask('build', 'build production minified logger', ['lint', 'test', 'uglify:dist']);

    /* JSHINT */
    grunt.registerTask('lint', 'lint all', 'jshint');

    /* NODEUNIT */
    grunt.registerTask('test', 'test all', 'nodeunit');
};
