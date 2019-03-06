'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Promise = require("promise");

var _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate,
    normalizeBoolean = _require.normalizeBoolean,
    normalizeNotes = _require.normalizeNotes;

var ID_REQUIRED_MSG = '`payment_id` is mandatory';

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
        url: '/payments',
        data: {
          from: from,
          to: to,
          count: count,
          skip: skip
        }
      }, callback);
    },
    fetch: function fetch(paymentId, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }

      return api.get({
        url: '/payments/' + paymentId
      }, callback);
    },
    capture: function capture(paymentId, amount, currency, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }

      if (!amount) {
        throw new Error('`amount` is mandatory');
      }

      var payload = {
        amount: amount
      };

      /**
       * For backward compatibility,
       * the third argument can be a callback
       * instead of currency.
       * Set accordingly.
       */
      if (typeof currency === 'function' && !callback) {
        callback = currency;
        currency = undefined;
      } else if (typeof currency === 'string') {
        payload.currency = currency;
      }

      return api.post({
        url: '/payments/' + paymentId + '/capture',
        data: payload
      }, callback);
    },
    refund: function refund(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];

      var notes = params.notes,
          otherParams = _objectWithoutProperties(params, ['notes']);

      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }

      var data = Object.assign(otherParams, normalizeNotes(notes));
      return api.post({
        url: '/payments/' + paymentId + '/refund',
        data: data
      }, callback);
    },
    transfer: function transfer(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];

      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }

      var notes = params.notes,
          otherParams = _objectWithoutProperties(params, ['notes']);

      var data = Object.assign(otherParams, normalizeNotes(notes));

      if (data.transfers) {
        var transfers = data.transfers;
        transfers.forEach(function (transfer) {
          transfer.on_hold = normalizeBoolean(!!transfer.on_hold);
        });
      }
      return api.post({
        url: '/payments/' + paymentId + '/transfers',
        data: data
      }, callback);
    },
    bankTransfer: function bankTransfer(paymentId, callback) {

      if (!paymentId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      return api.get({
        url: '/payments/' + paymentId + '/bank_transfer'
      }, callback);
    }
  };
};