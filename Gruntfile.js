/*
 * assemble-examples <https://github.com/assemble/assemble-examples>
 */


module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        assemble: {
            options: {
                flatten: true,
                partials: ['templates/includes/*.hbs'],
                layoutdir: 'templates/layouts',
                layout: 'default.hbs'
            },
            site: {
                files: {'docs/': ['templates/*.hbs']}   
            }
        },
        uglify: {
            my_target: {
                files: [{
                  expand: true,
                  cwd: 'templates/scripts',
                  src: ['*.js', '!*.min.js'],
                  dest: 'docs/js',
                  ext: '.min.js'
                }]
            }
        },
        cssmin: {
            my_target: {
                files: [{
                  expand: true,
                  cwd: 'templates/styles',
                  src: ['*.css', '!*.min.css'],
                  dest: 'docs/css',
                  ext: '.min.css'
                }]
            }
        }
    });

    // Load minifiers
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');    

    // Load the Assemble plugin.
    grunt.loadNpmTasks('assemble');

    // The default task to run with the `grunt` command.
    grunt.registerTask('default', ['uglify','cssmin','assemble']);
};
