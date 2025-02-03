'use strict'

const axios = require('axios').default
const nodeify = require('./utils/nodeify')
const {
  isNonNullObject
} = require('./utils/razorpay-utils');

const allowedHeaders = {
  "X-Razorpay-Account": "",
  "Content-Type": "application/json"
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
    statusCode: err.response.status,
    error: err.response.data.error
  }
}

class API {
  constructor(options) {
    this.rq = axios.create(this._createConfig(options))
  }

  _createConfig(options) {
    const config = {
      baseURL: options.hostUrl,
      headers: Object.assign(
        { 'User-Agent': options.ua },
        getValidHeaders(options.headers)
      ),
    };
  
    if (options.key_id && options.key_secret) {
      config.auth = {
        username: options.key_id,
        password: options.key_secret,
      };
    }

    if(options.oauthToken){
      config.headers = {
        'Authorization': `Bearer ${options.oauthToken}`,
        ...config.headers
      }
    }
    return config;
  }

  version = 'v1';

  getEntityUrl(params){
    return params.hasOwnProperty('version') ? `/${params.version}${params.url}` : `/${this.version}${params.url}` ;
  }

  get(params, cb) {
    return nodeify(this.rq.get(this.getEntityUrl(params), {
      params: params.data
    }).catch(normalizeError), cb)
  }

  post(params, cb) {
    return nodeify(this.rq.post(this.getEntityUrl(params), params.data)
    .catch(normalizeError), cb);
  }

  // postFormData method for file uploads.
  postFormData(params, cb){
     return nodeify(this.rq.post(this.getEntityUrl(params), params.formData, {
       'headers': {
         'Content-Type': 'multipart/form-data'
       }
     })
     .catch(normalizeError), cb);    
  }

  put(params, cb) {
    return nodeify(this.rq.put(this.getEntityUrl(params), params.data)
    .catch(normalizeError), cb);
  }

  patch(params, cb) {
    return nodeify(this.rq.patch(this.getEntityUrl(params), params.data)
    .catch(normalizeError), cb);
  }

  delete(params, cb) {
    return nodeify(this.rq.delete(this.getEntityUrl(params))
    .catch(normalizeError), cb)
  }
}

module.exports = API
