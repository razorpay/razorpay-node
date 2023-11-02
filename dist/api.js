'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request-promise');
var nodeify = require('./utils/nodeify');

var _require = require('./utils/razorpay-utils'),
    isNonNullObject = _require.isNonNullObject;

var allowedHeaders = {
  "X-Razorpay-Account": "",
  "Content-Type": "application/json"
};

function getValidHeaders(headers) {

  var result = {};

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
  };
}

var API = function () {
  function API(options) {
    _classCallCheck(this, API);

    this.version = 'v1';

    this.rq = request.defaults({
      baseUrl: options.hostUrl,
      json: true,
      auth: {
        user: options.key_id,
        pass: options.key_secret
      },
      headers: Object.assign({ 'User-Agent': options.ua }, getValidHeaders(options.headers))
    });
  }

  _createClass(API, [{
    key: 'getEntityUrl',
    value: function getEntityUrl(params) {
      return params.hasOwnProperty('version') ? '/' + params.version + params.url : '/' + this.version + params.url;
    }
  }, {
    key: 'get',
    value: function get(params, cb) {
      return nodeify(this.rq.get({
        url: this.getEntityUrl(params),
        qs: params.data
      }).catch(normalizeError), cb);
    }
  }, {
    key: 'post',
    value: function post(params, cb) {
      var request = {
        url: this.getEntityUrl(params),
        body: params.data
      };
      return nodeify(this.rq.post(request).catch(normalizeError), cb);
    }

    // postFormData method for file uploads.

  }, {
    key: 'postFormData',
    value: function postFormData(params, cb) {
      var request = {
        url: this.getEntityUrl(params),
        formData: params.formData
      };
      return nodeify(this.rq.post(request).catch(normalizeError), cb);
    }
  }, {
    key: 'put',
    value: function put(params, cb) {
      return nodeify(this.rq.put({
        url: this.getEntityUrl(params),
        body: params.data
      }).catch(normalizeError), cb);
    }
  }, {
    key: 'patch',
    value: function patch(params, cb) {
      var request = {
        url: this.getEntityUrl(params),
        body: params.data
      };
      return nodeify(this.rq.patch(request).catch(normalizeError), cb);
    }
  }, {
    key: 'delete',
    value: function _delete(params, cb) {
      return nodeify(this.rq.delete({
        url: this.getEntityUrl(params)
      }).catch(normalizeError), cb);
    }
  }]);

  return API;
}();

module.exports = API;