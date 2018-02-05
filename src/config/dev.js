'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  API_ROOT: 'http://api:8000/v1',
  UI_ROOT: 'http://frontend.app:5555/',
  S3_BUCKET: ''
};

export default Object.freeze(Object.assign({}, baseConfig, config));
