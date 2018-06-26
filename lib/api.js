'use strict'

const request = require('request-promise')
const nodeify = require('./utils/nodeify')

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
      headers: {
        'User-Agent': options.ua
      }
    })
  }
  // TODO: remove console logs
  get(params, cb) {
    console.info('API:get >', JSON.stringify(params, null, 2));
    return nodeify(this.rq.get({
      url: params.url,
      qs: params.data,
    }).catch(normalizeError), cb)
  }

  post(params, cb) {
    console.info('API:post >', JSON.stringify(params, null, 2));
    return nodeify(this.rq.post({
      url: params.url,
      form: params.data
    }).catch(normalizeError), cb)
  }

  put(params, cb) {
    console.info('API:put >', JSON.stringify(params, null, 2));
    return nodeify(this.rq.put({
      url: params.url,
      form: params.data
    }).catch(normalizeError), cb)
  }

  patch(params, cb) {
    console.info('API:patch >', JSON.stringify(params, null, 2));
    return nodeify(this.rq.patch({
      url: params.url,
      form: params.data
    }).catch(normalizeError), cb)
  }

  delete(params, cb) {
    console.info('API:delete >', JSON.stringify(params, null, 2));
    return nodeify(this.rq.delete({
      url: params.url
    }).catch(normalizeError), cb)
  }
}

module.exports = API
