/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');

console.log("Starting...\n");
console.log(config.devServer);
console.log(config.output.path);

new WebpackDevServer(webpack(config), config.devServer)
.listen(config.port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:' + config.port);
//  console.log('Opening your system browser...');
//  open('http://10.0.2.15:' + config.port + '/webpack-dev-server/');
});
