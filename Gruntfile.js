/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        // Banner license
        banner: '/*! <%= pkg.project %> - Build v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n' +
            'Author: <%= pkg.author.name %> (<%= pkg.author.url %>) */\n',

        // Pkg.name as filename
        filename: '<%= pkg.name %>',

        // Karma (test runner)
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true
            }
        },

        // Task configuration.
        concat: {
          options: {
            banner: '<%= banner %>',
            stripBanners: true,
            separator: ';'
          },
          build: {
            src: ['application/js/libraries/base64.js', 'application/js/libraries/angular.min.js', 'application/js/libraries/angular-resource.min.js', 'application/js/main.js'],
            dest: 'builds/dev/assets/js/<%= filename %>.js'
          }
        },

        // Strip
        strip: {
            main : {
                src : '<%= concat.build.dest %>',
                dest : 'builds/release/assets/js/<%= filename %>.js',
                options: {
                    nodes: ['console.log', 'console.time', 'console.timeEnd']
                }
            }
        },

        // Uglify
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= strip.main.dest %>',
                dest: '<%= strip.main.dest %>'
            }
        },

        // JShint (linter)
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                //unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                devel: true,
                jquery: true,
                es5: true,
                globals: {
                    modernizr: true,
                    angular: true,
                    Base64: true
                }
            },
            gruntfile: {src: 'Gruntfile.js'},
            lib_test: {src: ['application/js/*.js']}
        },

        // HTML template variables
        template: {
            dev: {
                options: {
                    data: {
                        assetPath: 'assets/',
                        pageTitle: 'VERT Services'
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'application/',
                    src: ['*.tpl.html'],
                    dest: 'builds/dev/',
                    ext: '.html'
                }]
            },

            release: {
                options: {
                    data: {
                        assetPath: 'assets/',
                        pageTitle: 'VERT Services'
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'application/',
                    src: ['*.tpl.html'],
                    dest: 'builds/release/',
                    ext: '.html'
                }]
            }
        },

        // Copy image assets
        copy: {
            dev: {
                files: [
                    {expand: true, cwd: 'application/', src: ['img/**', 'fonts/**'], dest: 'builds/dev/assets/'}
                ]
            },
            release: {
                files: [
                    {expand: true, cwd: 'application/', src: ['img/**', 'fonts/**'], dest: 'builds/release/assets/'}
                ]
            }
        },

        // Sassy stylesheets
        sass: {
          dev: {
            options: {
              style: 'expanded',
              debugInfo: false
            },
            files: {
              'builds/dev/assets/css/<%= filename %>.css': 'application/scss/manifest.scss'
            }
          },
          release: {
            options: {
              style: 'compressed'
            },
            files: {
              'builds/release/assets/css/<%= filename %>.css': 'application/scss/manifest.scss'
            }
          }
        },

        // Watch tasks
        watch: {
          gruntfile: {
            files: '<%= jshint.gruntfile.src %>',
            tasks: ['jshint:gruntfile']
          },
          lib_test: {
            files: '<%= jshint.lib_test.src %>',
            tasks: ['jshint', 'concat']
          },
          sassy_pants: {
            files: 'application/scss/**/*.scss',
            tasks: ['sass:dev']
          },
          markup: {
              files: ['application/*.tpl.html'],
              tasks: ['template:dev']
          },
          image_assets: {
              files: ['application/img/*'],
              tasks: ['copy:dev']
          }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-strip');
    grunt.loadNpmTasks('grunt-bump');

    // Tasks
    grunt.registerTask('default', ['jshint', 'concat', 'sass:dev', 'template:dev', 'copy:dev']);
    grunt.registerTask('release', ['jshint', 'concat', 'strip', 'uglify', 'sass:release', 'template:release', 'copy:release', 'bump']);

};