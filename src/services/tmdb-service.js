import http from '../utils/http';
import _ from '../utils/_';

const TIMEOUT = 30000;

const BASE = 'http://api.themoviedb.org/3';

const DEFAULT_PARAMETERS = {
  api_key: '6547f8d13335a379d104582c87dab7f3',
};

const errorInterceptor = (err) => {
  if (err.xhrStatus === 'abort') {
    if (!err.config) {
      err.config = {timeout: TIMEOUT};
    }
    console.warn(`REQUEST CANCELED (config timeout: ${err.config.timeout}ms)`);
  }
  throw err;
};

const responseInterceptor = (res) => {
  return res;
};

const requestInterceptor = (config) => {
  const conf = _.mergeAll([{timeout: TIMEOUT}, config]);

  if (_.undef(conf.headers)) {
    conf.headers = {};
  }
  return conf;
};

const send = (path, params, config) => {
  return http(
    BASE + path + '?' + _.serialize(_.mergeAll([DEFAULT_PARAMETERS, params])),
    requestInterceptor(config)
  )
    .then(responseInterceptor)
    .catch(errorInterceptor);
};

const get = (path, params, config) =>
  send(path, params, _.mergeAll([config, {method: 'GET'}]));

export default send;

export {get};
