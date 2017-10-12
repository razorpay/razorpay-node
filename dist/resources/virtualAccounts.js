"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Promise = require("promise");

var _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate,
    normalizeNotes = _require.normalizeNotes;

module.exports = function (api) {
  return {
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];
      var from = params.from,
          to = params.to,
          count = params.count,
          skip = params.skip;

      var url = '/virtual_accounts';

      if (from) {
        from = normalizeDate(from);
      }

      if (to) {
        to = normalizeDate(to);
      }

      count = Number(count) || 10;
      skip = Number(skip) || 0;

      return api.get({
        url: url,
        data: {
          from: from,
          to: to,
          count: count,
          skip: skip
        }
      }, callback);
    },
    fetch: function fetch(virtualAccountId, callback) {

      if (!virtualAccountId) {

        return Promise.reject('`virtual_account_id` is mandatory');
      }

      var url = "/virtual_accounts/" + virtualAccountId;

      return api.get({
        url: url
      }, callback);
    },
    create: function create(params, callback) {
      var notes = params.notes,
          rest = _objectWithoutProperties(params, ["notes"]);

      var data = Object.assign(rest, normalizeNotes(notes));

      return api.post({
        url: '/virtual_accounts',
        data: data
      }, callback);
    },
    close: function close(virtualAccountId, callback) {

      if (!virtualAccountId) {

        return Promise.reject('`virtual_account_id` is mandatory');
      }

      var data = {
        status: 'closed'
      };

      return api.patch({
        url: "/virtual_accounts/" + virtualAccountId,
        data: data
      }, callback);
    }
  };
};