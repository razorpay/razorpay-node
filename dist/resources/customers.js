'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _require = require('../utils/razorpay-utils'),
    normalizeNotes = _require.normalizeNotes,
    normalizeBoolean = _require.normalizeBoolean;

module.exports = function (api) {
  return {
    create: function create(params, callback) {
      var notes = params.notes,
          rest = _objectWithoutProperties(params, ['notes']);

      var data = Object.assign(rest, normalizeNotes(notes));

      return api.post({
        url: '/customers',
        data: data
      }, callback);
    },
    edit: function edit(customerId, params, callback) {
      var notes = params.notes,
          rest = _objectWithoutProperties(params, ['notes']);

      var data = Object.assign(rest, normalizeNotes(notes));

      return api.put({
        url: '/customers/' + customerId,
        data: data
      }, callback);
    },
    fetch: function fetch(customerId, callback) {
      return api.get({
        url: '/customers/' + customerId
      }, callback);
    },
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];
      var count = params.count,
          skip = params.skip;


      count = Number(count) || 10;
      skip = Number(skip) || 0;

      return api.get({
        url: '/customers',
        data: {
          count: count,
          skip: skip
        }
      }, callback);
    },
    fetchTokens: function fetchTokens(customerId, callback) {
      return api.get({
        url: '/customers/' + customerId + '/tokens'
      }, callback);
    },
    fetchToken: function fetchToken(customerId, tokenId, callback) {
      return api.get({
        url: '/customers/' + customerId + '/tokens/' + tokenId
      }, callback);
    },
    deleteToken: function deleteToken(customerId, tokenId, callback) {
      return api.delete({
        url: '/customers/' + customerId + '/tokens/' + tokenId
      }, callback);
    }
  };
};