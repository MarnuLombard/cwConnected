'use strict';
module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // watch for changes and trigger sass, concat, uglify and livereload
    watch: {
      icons: {
        files: ['icons/*.svg'],
        tasks: ['webfont']
      },
      svg: {
        files: ['svg/*.svg'],
        tasks: ['svgmin', 'svg2png']
      },
      sass: {
        files: ['scss/**/*', 'scss/*'],
        tasks: ['sass']
      },
      js: {
        files: [
          'js/*',
          'js/**/*'
        ],
        tasks: ['uglify']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'Gruntfile.js',
          '../dist/*.html',
          '../dist/**/**/*.php',
          // '../dist/includes/*.php',
          '../dist/css/*',
          '../dist/fonts/*',
          '../dist/js/*.js',
          '../dist/img/*.svg'
        ]
      }
    },

    // To generate the icon fonts from the files in my ./src/icons/ directory
    webfont: {
      icons: {
        src: "icons/*.svg",
        dest: "../dist/fonts",
        destCSS: "../src/delete/",
        options: {
          hashes: false,
          htmlDemo: false,
        }
      }
    },

    // minify svg files
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'svg',
          src: ['**/*.svg'],
          dest: '../dist/img/',
          ext: '.svg'
        }]
      }
    },

    // convert svg to png for fallbacks (via modernizr)
    svg2png: {
      all: {
        // specify files in array format with multiple src-dest mapping
        files: [
          // rasterize all SVG files in "img" and its subdirectories to "img/png"
          { src: ['svg/**/*.svg'], dest: '../dist/img/' }
        ]
      }
    },

    // sass and scss
    sass: {
      dist: {
        options: {
          sourcemap: true,
          style: 'indented',
          precision: '2',
          compass: true,
          cache: 'delete/'
        },
        files: {
          '../dist/css/ccp-color.css':'scss/style.scss'
        }
      }
    },

    // uglify to concat & minify
    uglify: {
      dist: {
        files: {
          /*'../dist/js/script.min.js': [
            'js/vendor/*',
            'js/plugins/*'
          ],*/
          '../dist/js/app.min.js': [
            'js/app.js'
          ],
          '../dist/js/modernizr.min.js' : [
            'js/modernizr.js'
          ]
        }
      }
    },

  });
// register task
grunt.registerTask('default', ['watch']);

};
