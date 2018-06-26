'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request-promise');
var nodeify = require('./utils/nodeify');

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
      headers: {
        'User-Agent': options.ua
      }
    });
  }
  // TODO: remove console logs


  _createClass(API, [{
    key: 'get',
    value: function get(params, cb) {
      console.info('API:get >', JSON.stringify(params, null, 2));
      return nodeify(this.rq.get({
        url: params.url,
        qs: params.data
      }).catch(normalizeError), cb);
    }
  }, {
    key: 'post',
    value: function post(params, cb) {
      console.info('API:post >', JSON.stringify(params, null, 2));
      return nodeify(this.rq.post({
        url: params.url,
        form: params.data
      }).catch(normalizeError), cb);
    }
  }, {
    key: 'put',
    value: function put(params, cb) {
      console.info('API:put >', JSON.stringify(params, null, 2));
      return nodeify(this.rq.put({
        url: params.url,
        form: params.data
      }).catch(normalizeError), cb);
    }
  }, {
    key: 'patch',
    value: function patch(params, cb) {
      console.info('API:patch >', JSON.stringify(params, null, 2));
      return nodeify(this.rq.patch({
        url: params.url,
        form: params.data
      }).catch(normalizeError), cb);
    }
  }, {
    key: 'delete',
    value: function _delete(params, cb) {
      console.info('API:delete >', JSON.stringify(params, null, 2));
      return nodeify(this.rq.delete({
        url: params.url
      }).catch(normalizeError), cb);
    }
  }]);

  return API;
}();

module.exports = API;