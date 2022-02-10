"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate,
    normalizeBoolean = _require.normalizeBoolean,
    normalizeNotes = _require.normalizeNotes;

module.exports = function (api) {
  return {
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];
      var from = params.from,
          to = params.to,
          count = params.count,
          skip = params.skip,
          payment_id = params.payment_id,
          recipient_settlement_id = params.recipient_settlement_id;

      var url = '/transfers';

      if (payment_id) {
        url = '/payments/' + payment_id + '/transfers';
      }

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
          skip: skip,
          recipient_settlement_id: recipient_settlement_id
        }
      }, callback);
    },
    fetch: function fetch(transferId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];
      var payment_id = params.payment_id;

      if (!transferId) {
        throw new Error('`transfer_id` is mandatory');
      }

      var url = '/transfers/' + transferId;

      return api.get({
        url: url
      }, callback);
    },
    create: function create(params, callback) {
      var notes = params.notes,
          rest = _objectWithoutProperties(params, ['notes']);

      var data = Object.assign(rest, normalizeNotes(notes));

      if (data.on_hold) {
        data.on_hold = normalizeBoolean(data.on_hold);
      }

      return api.post({
        url: '/transfers',
        data: data
      }, callback);
    },
    edit: function edit(transferId, params, callback) {
      var notes = params.notes,
          rest = _objectWithoutProperties(params, ['notes']);

      var data = Object.assign(rest, normalizeNotes(notes));

      if (typeof data.on_hold !== "undefined") {
        data.on_hold = normalizeBoolean(data.on_hold);
      }

      return api.patch({
        url: '/transfers/' + transferId,
        data: data
      }, callback);
    },
    reverse: function reverse(transferId, params, callback) {
      if (!transferId) {
        throw new Error('`transfer_id` is mandatory');
      }

      var notes = params.notes,
          rest = _objectWithoutProperties(params, ['notes']);

      var data = Object.assign(rest, normalizeNotes(notes));
      var url = '/transfers/' + transferId + '/reversals';

      return api.post({
        url: url,
        data: data
      }, callback);
    },
    fetchSettlements: function fetchSettlements(callback) {
      return api.get({
        url: 'transfers?expand[]=recipient_settlement'
      }, callback);
    }
  };
};