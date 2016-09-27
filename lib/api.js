'use strict'

const request = require('request-promise')
const nodeify = require('./utils/nodeify')

class API {
  constructor(options) {
    this.rq = request.defaults({
      baseUrl: options.hostUrl,
      json: true,
      auth: {
        user: options.key_id,
        pass: options.key_secret
      }
    })
  }

  get(params, cb) {
    return nodeify(this.rq.get({
      url: params.url,
      qs: params.data,
    }), cb)
  }

  post(params, cb) {
    return nodeify(this.rq.post({
      url: params.url,
      body: params.data
    }), cb)
  }
}

module.exports = API
