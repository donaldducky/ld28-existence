module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      scripts: {
        files: [ 'public/**/*' ],
        options: {
          livereload: true
        }
      }
    },
    php: {
      watch: {
        options: {
          base: 'public',
          hostname: 'localhost',
          port: 4848
        }
      }
    }
  });

  grunt.registerTask('default', [ 'php:watch', 'watch' ]);
};
