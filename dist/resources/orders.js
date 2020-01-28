'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
          authorized = params.authorized,
          receipt = params.receipt;


      if (from) {
        from = normalizeDate(from);
      }

      if (to) {
        to = normalizeDate(to);
      }

      count = Number(count) || 10;
      skip = Number(skip) || 0;
      authorized = normalizeBoolean(authorized);

      return api.get({
        url: '/orders',
        data: {
          from: from,
          to: to,
          count: count,
          skip: skip,
          authorized: authorized,
          receipt: receipt
        }
      }, callback);
    },
    fetch: function fetch(orderId, callback) {
      if (!orderId) {
        throw new Error('`order_id` is mandatory');
      }

      return api.get({
        url: '/orders/' + orderId
      }, callback);
    },
    create: function create() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];

      var amount = params.amount,
          currency = params.currency,
          receipt = params.receipt,
          payment_capture = params.payment_capture,
          notes = params.notes,
          method = params.method,
          otherParams = _objectWithoutProperties(params, ['amount', 'currency', 'receipt', 'payment_capture', 'notes', 'method']);

      currency = currency || 'INR';

      if (!(amount || method === 'emandate' && amount === 0)) {
        throw new Error('`amount` is mandatory');
      }

      var data = Object.assign(_extends({
        amount: amount,
        currency: currency,
        receipt: receipt,
        method: method,
        payment_capture: normalizeBoolean(payment_capture)
      }, otherParams), normalizeNotes(notes));

      return api.post({
        url: '/orders',
        data: data
      }, callback);
    },
    fetchPayments: function fetchPayments(orderId, callback) {
      if (!orderId) {
        throw new Error('`order_id` is mandatory');
      }

      return api.get({
        url: '/orders/' + orderId + '/payments'
      }, callback);
    }
  };
};