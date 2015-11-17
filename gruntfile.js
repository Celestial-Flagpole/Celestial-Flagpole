
grunt.initConfig({

})
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nwjs: {
    options: {
        platforms: ['win','osx'],
        buildDir: './webkitbuilds', // Where the build version of my NW.js app is saved
    },
    src: ['./client/**/*'] // Your NW.js app
  },

    concat: {
      options: {
        separator: ';',
      },
      dist: {

        src: [ 
          'client/app.js',
          'client/angularApp.js',
          'client/videoFeature.js',
          'client/js/search/searchcontroller.js',
          'client/js/search/searchservice.js',
          'client/js/video/vidcontroller.js',
          'client/js/vidservice.js'
        ],
        dest: '/client/production.js',
      }
    },
    concat: {
      options: {
        separator: ';',
      },
    dist: {

      src: [
        'client/lib/angular.min.js',

       
      ],
      dest: 'public/lib/libraries.js'
    }
   },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        // src: ['test/SeverSpec.js']
        src: 
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      my_target: {
      files: {
        'client/production.min.js': ['/client/production.js'],
        
      }
    }
    },

    jshint: {
      files: [
       
      ],
      options: {
        force: 'false',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'client/production.css': ['client/css/styles.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'client/**/*.js',
          'lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'client/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });
  grunt.loadNpmTasks('grunt-nw-builder')
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  
  grunt.registerTask('default', ['jshint','concat', 'uglify','cssmin', 'mochaTest']);


  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [

  ]);


};