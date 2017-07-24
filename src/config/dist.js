'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  API_ROOT: '',
  UI_ROOT: 'https://torosolutions.com.au/clubdog/',
  module: 'CSR',
  S3_BUCKET: ''
};

export default Object.freeze(Object.assign({}, baseConfig, config));
