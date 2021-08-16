'use strict'

const nock = require('nock')
const equal = require('deep-equal')

const FIXTURES = {
  error: {
    "error": {
      "code": "BAD_REQUEST_ERROR",
      "description": "The count may not be greater than 100.",
      "field": "count"
    }
  }
}

function Mocker({ host, version }) {
  this.host = host
  this.version = version
}

Mocker.prototype.mock = function(params) {
  let { url, method = 'GET', requestBody, replyWithError, ignoreParseBody } = params
  let status = replyWithError ? 400 : 200
  let requestQueryParams

  nock(this.host)
    .intercept(normalizeUrl(`/${this.version}/${url}`), method)
    .query((qp) => {
      requestQueryParams = qp
      return true
    })
    .reply(status, function (url, requestBody) {
      if (replyWithError) {
        return FIXTURES.error
      }

      return {
        "success": true,
        __JUST_FOR_TESTS__: {
          url,
          method,
          requestQueryParams,
          requestBody: parseReqBody(requestBody, ignoreParseBody),
          headers: this.req.headers
        }
      }
    })
}

const normalizeUrl = function(url) {
  return url.replace(/\/{2,}/g, '/')
}

const parseReqBody = function(raw, ignoreParseBody) {

  if (ignoreParseBody){
    return raw;
  }

  if (raw.length === 0) {
    return {};
  }

  return raw.split('&').reduce((prev, curr) => {
    let parts = curr.split('=')
    prev[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
    return prev
  }, {})
}

module.exports = new Mocker({
  host: 'https://api.razorpay.com',
  version: '/v1'
})
