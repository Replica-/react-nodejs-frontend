'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  API_ROOT: '',
  UI_ROOT: 'http://csr.app:5555/',
  module: 'CSR',
  S3_BUCKET: ''
};

export default Object.freeze(Object.assign({}, baseConfig, config));
