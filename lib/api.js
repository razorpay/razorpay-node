'use strict'

const request = require('request-promise')
const nodeify = require('./utils/nodeify')
const {
  isNonNullObject
} = require('./utils/razorpay-utils');

const allowedHeaders = {
  "X-Razorpay-Account": ""
};

function getValidHeaders (headers) {

  const result = {};

  if (!isNonNullObject(headers)) {

    return result;
  }

  return Object.keys(headers).reduce(function (result, headerName) {

    if (allowedHeaders.hasOwnProperty(headerName)) {

      result[headerName] = headers[headerName];
    }

    return result;
  }, result);
}

function normalizeError(err) {
  throw {
    statusCode: err.statusCode,
    error: err.error.error
  }
}

class API {
  constructor(options) {
    this.rq = request.defaults({
      baseUrl: options.hostUrl,
      json: true,
      auth: {
        user: options.key_id,
        pass: options.key_secret
      },
      headers: Object.assign(
        {'User-Agent': options.ua},
        getValidHeaders(options.headers)
      )
    })
  }

  get(params, cb) {
    return nodeify(this.rq.get({
      url: params.url,
      qs: params.data,
    }).catch(normalizeError), cb)
  }

  post(params, cb) {
    return nodeify(this.rq.post({
      url: params.url,
      form: params.data
    }).catch(normalizeError), cb)
  }

  put(params, cb) {
    return nodeify(this.rq.put({
      url: params.url,
      form: params.data
    }).catch(normalizeError), cb)
  }

  patch(params, cb) {
    return nodeify(this.rq.patch({
      url: params.url,
      form: params.data
    }).catch(normalizeError), cb)
  }

  delete(params, cb) {
    return nodeify(this.rq.delete({
      url: params.url
    }).catch(normalizeError), cb)
  }
}

module.exports = API
