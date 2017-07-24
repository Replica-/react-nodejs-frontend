'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: '#eval-source-map',
  output: {
    path: path.join(__dirname, '/../../Assets/assets'),
    filename: 'app.js',
    publicPath: 'http://cms.app:5555/assets'
  },
  devServer: {

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },

    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false,

  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      amplifier: `${defaultSettings.srcPath}/amplifier/`,
      app: `${defaultSettings.srcPath}/app/`,
      common: `${defaultSettings.srcPath}/app/common/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
    }
  },
  module: {}
};
