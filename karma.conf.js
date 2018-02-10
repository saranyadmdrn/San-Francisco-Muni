// Karma configuration
// Generated on Sat Jan 13 2018 23:46:22 GMT-0800 (Pacific Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'static/scripts/lib/angular.min.js',
        'static/scripts/lib/angular-mocks.js',
        'static/scripts/lib/angular-route.js',
        'static/scripts/lib/d3-v4.min.js',
        'static/scripts/lib/ui-bootstrap-tpls-0.14.3.min.js',
        'static/scripts/**/*.js',
        'static/services/*.js',
        'static/controller/*.js',
        'test/spec/**/*.js',
        //'static/**/*.json',

        /*{pattern: 'static/sfmaps/arteries.json',included:true},
        {pattern: 'static/sfmaps/freeways.json',watched: true, served: true, included: true},
        {pattern: 'static/sfmaps/neighborhoods.json',included:true},
        {pattern: 'static/sfmaps/streets.json',watched: true, served: true, included: true},
        */
        //{pattern: 'static/sfmaps/*.json', watched: true, served: true, included: false}
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      //  'static/sfmaps/*.json':['json_fixtures']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 8080,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    ngHtml2JsPreprocessor: {
    stripPrefix: 'static/view/',
        // stripSufix: '.ext',

        // setting this option will create only a single module that contains templates
        // from all the files, so you can load them all with module('foo')
        moduleName: 'main'
}
  })
}
