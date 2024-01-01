"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require("axios");
var nodeify = require("./utils/nodeify");

var _require = require("./utils/razorpay-utils"),
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

    this.version = "v1";

    this.rq = request.create({
      baseURL: options.hostUrl,
      auth: {
        username: options.key_id,
        password: options.key_secret
      },
      headers: Object.assign({ "User-Agent": options.ua }, getValidHeaders(options.headers))
    });
  }

  _createClass(API, [{
    key: "getEntityUrl",
    value: function getEntityUrl(params) {
      return params.hasOwnProperty("version") ? "" + params.version + params.url : "" + this.version + params.url;
    }
  }, {
    key: "get",
    value: function get(params, cb) {
      var request = {
        url: this.getEntityUrl(params)
      };

      return nodeify(this.rq.get(request.url, {
        params: params.data
      }).then(function (res) {
        return res.data;
      }).catch(normalizeError), cb);
    }
  }, {
    key: "post",
    value: function post(params, cb) {
      var request = {
        url: this.getEntityUrl(params),
        body: params.data
      };

      return nodeify(this.rq.post(request.url, request.body).then(function (res) {
        return res.data;
      }).catch(normalizeError), cb);
    }

    // postFormData method for file uploads.

  }, {
    key: "postFormData",
    value: function postFormData(params, cb) {
      var request = {
        url: this.getEntityUrl(params),
        formData: params.formData
      };
      return nodeify(this.rq.postForm(request.url, request.formData).then(function (res) {
        return res.data;
      }).catch(normalizeError), cb);
    }
  }, {
    key: "put",
    value: function put(params, cb) {
      var request = {
        url: this.getEntityUrl(params),
        body: params.data
      };

      return nodeify(this.rq.put(request.url, request.body).then(function (res) {
        return res.data;
      }).catch(normalizeError), cb);
    }
  }, {
    key: "patch",
    value: function patch(params, cb) {
      var request = {
        url: this.getEntityUrl(params),
        body: params.data
      };
      return nodeify(this.rq.patch(request.url, request.body).then(function (res) {
        return res.data;
      }).catch(normalizeError), cb);
    }
  }, {
    key: "delete",
    value: function _delete(params, cb) {
      var request = {
        url: this.getEntityUrl(params)
      };

      return nodeify(this.rq.delete(request.url).then(function (res) {
        return res.data;
      }).catch(normalizeError), cb);
    }
  }]);

  return API;
}();

module.exports = API;