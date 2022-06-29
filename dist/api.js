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
    key: 'get',
    value: function get(params, cb) {
      return nodeify(this.rq.get({
        url: params.url,
        qs: params.data
      }).catch(normalizeError), cb);
    }
  }, {
    key: 'post',
    value: function post(params, cb) {
      var isNotForm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var request = {
        url: params.url,
        form: params.data
      };

      if (isNotForm) {
        delete request['form'];
        request.body = params.data;
      }

      return nodeify(this.rq.post(request).catch(normalizeError), cb);
    }
  }, {
    key: 'put',
    value: function put(params, cb) {
      return nodeify(this.rq.put({
        url: params.url,
        form: params.data
      }).catch(normalizeError), cb);
    }
  }, {
    key: 'patch',
    value: function patch(params, cb) {
      var request = {
        url: params.url,
        form: params.data
      };

      if (params.data.hasOwnProperty("isbody")) {
        delete request['form'];
        delete params.data.isbody;
        request.body = params.data;
      }
      return nodeify(this.rq.patch(request).catch(normalizeError), cb);
    }
  }, {
    key: 'delete',
    value: function _delete(params, cb) {
      return nodeify(this.rq.delete({
        url: params.url
      }).catch(normalizeError), cb);
    }
  }]);

  return API;
}();

module.exports = API;