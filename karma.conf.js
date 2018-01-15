'use strict';

var path = require('path');
var webpackCfg = require('./webpack.config');
webpackCfg.entry = {};

module.exports = function(config) {
  config.set({
    basePath: './src',
    browsers: [ 'Chrome' ],
    files: [
      'loadtests.js'
    ],
    port: 8080,
    captureTimeout: 60000,
    frameworks: [ 'mocha', 'chai' ],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: [ 'dots' ], 
    preprocessors: {
      'loadtests.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' }
      ]
    }
  });
};
