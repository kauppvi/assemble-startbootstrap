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
        },
        connect: {
            server: {
                options: {
                    port: 3001,
                    base: 'docs',
                    livereload: true
                }
            }
        },
        watch: {
            css: {
                files: ['templates/styles/*.css'],
                tasks: ['cssmin']
            },
            js: {
                files: ['templates/scripts/*.js'],
                tasks: ['uglify']
            },
            html: {
                files: ['templates/*.hbs','templates/includes/*.hbs','templates/layouts/*.hbs'],
                tasks: ['assemble']
            }
        }
    });

    // Load minifiers
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');    

    // Load the Assemble plugin
    grunt.loadNpmTasks('assemble');
    
    // Load dev tools
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // The default task to run with the `grunt` command
    grunt.registerTask('default', ['uglify','cssmin','assemble']);
    
    // Start web server
    grunt.registerTask('serve', ['connect:server','watch']);
};
