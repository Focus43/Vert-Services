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

        // Task configuration.
        concat: {
          options: {
            banner: '<%= banner %>',
            stripBanners: true
          },
          build: {
            src: ['application/js/libraries/angular.min.js', 'application/js/vert.js'],
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
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                devel: true,
                jquery: true,
                es5: true,
                globals: {
                    modernizr: true
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
                        projectName: 'Jons Project'
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'application/',
                    src: ['*.tpl.html'],
                    dest: 'builds/dev/',
                    ext: '.html'
                }]
            }
        },

        /*copy: {
            dev: {
                files: [
                    {expand: true, cwd: 'application/', src: ['img/**'], dest: 'builds/dev/assets/'},
                    {expand: true, cwd: 'application/', src: ['*.html.erb'], dest: 'builds/dev/', filter: 'isFile'}
                ]
            },
            release: {
                files: [
                    {expand: true, cwd: 'application/', src: ['img/**'], dest: 'builds/release/assets/'},
                    {expand: true, cwd: 'application/', src: ['*.html.erb'], dest: 'builds/release/', filter: 'isFile'}
                ]
            }
        },*/

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

        watch: {
          gruntfile: {
            files: '<%= jshint.gruntfile.src %>',
            tasks: ['jshint:gruntfile']
          },
          lib_test: {
            files: '<%= jshint.lib_test.src %>',
            tasks: ['jshint']
          },
          sassy_pants: {
            files: 'application/scss/**/*.scss',
            tasks: ['sass:dev']
          },
          markup: {
              files: ['application/*.html.erb'],
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
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-strip');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('loggable', function(){
        grunt.log.writeln( grunt.tasks('template') );
    });

  grunt.registerTask('default', ['jshint', 'concat', 'sass:dev', 'template']);
  grunt.registerTask('release', ['jshint', 'concat', 'strip', 'uglify', 'sass:release', 'bump']);

};