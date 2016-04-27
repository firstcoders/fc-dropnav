module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // jshint: {
    //   files: ['src'],
    //   options: {
    //     globals: {
    //       console: true,
    //       module: true
    //     }
    //   }
    // },

    concat: {
      pitch: {
        options: {
            // Replace all 'use strict' statements in the code with a single one at the top
            banner: "'use strict';\n",
            process: function(src, filepath) {
                return '// Source: ' + filepath + '\n' +
                src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
            },
        },
        src: [
          'src/directives/fc-dropnav.js',
          'src/*/*.js',
        ],
        dest: 'dist/js/fc-dropnav.js',
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> Mark Cremer <mark@firstcoders.co.uk> */\n',
        mangle: false,
        sourceMap: true
      },
      tms: {
        files: {
          'dist/js/fc-dropnav.min.js' : ['dist/js/fc-dropnav.js']
        }
      }
    },

    less: {
      production: {
        files: {
          "dist/css/fc-dropnav.css": "src/less/fc-dropnav.less"
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/fc-dropnav.min.css': ["dist/css/fc-dropnav.css"]
        }
      }
    }

  });

  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', [/*'jshint', */'concat', 'uglify', 'less', 'cssmin']);

};