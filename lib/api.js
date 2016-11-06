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
}

module.exports = API
