'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _require = require('../utils/razorpay-utils'),
    normalizeNotes = _require.normalizeNotes,
    normalizeDate = _require.normalizeDate;

module.exports = function (api) {
  return {
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];
      var from = params.from,
          to = params.to,
          count = params.count,
          skip = params.skip;


      if (from) {
        from = normalizeDate(from);
      }

      if (to) {
        to = normalizeDate(to);
      }

      count = Number(count) || 10;
      skip = Number(skip) || 0;

      return api.get({
        url: '/customers',
        data: {
          from: from,
          to: to,
          count: count,
          skip: skip
        }
      }, callback);
    },
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