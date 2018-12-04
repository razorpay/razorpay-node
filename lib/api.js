const request = require('request-promise-native');
const nodeify = require('./utils/nodeify');
const { isNonNullObject } = require('./utils/razorpay-utils');

const allowedHeaders = ['X-Razorpay-Account'];

const getValidHeaders = headers => {

  const result = {};

  if (!isNonNullObject(headers)) {
    return result;
  }

  return Object.keys(headers)
    .filter(header => allowedHeaders.indexOf(header) > -1 )
    .reduce((acc, current) => {
      acc[current] = headers[current];
      return result;
    }, result);

}

const captureAndThrowError = err => {
  throw new Error(JSON.stringify(err));
}

class API {

  constructor(options) {

    this._request = request.defaults({

      baseUrl: options.hostUrl,
      json: true,
      auth: {
        user: options.keyId,
        pass: options.keySecret
      },
      headers: {
        'User-Agent': options.ua,
        ...getValidHeaders(options.headers)
      }

    });

  }

  get({url, data}, cb) {
    return nodeify(this._request.get({
      url,
      qs: data,
    }).catch(captureAndThrowError), cb);
  }

  post({url, data}, cb) {
    return nodeify(this._request.post({
      url,
      form: data
    }).catch(captureAndThrowError), cb);
  }

  put({url, data}, cb) {
    return nodeify(this._request.put({
      url,
      form: data
    }).catch(captureAndThrowError), cb);
  }

  patch({url, data}, cb) {
    return nodeify(this._request.patch({
      url,
      form: data
    }).catch(captureAndThrowError), cb);
  }

  delete({url}, cb) {
    return nodeify(this._request.delete({
      url
    }).catch(captureAndThrowError), cb);
  }
}

module.exports = API;
