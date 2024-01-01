'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate;

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

      var expand = void 0;

      if (from) {
        from = normalizeDate(from);
      }

      if (to) {
        to = normalizeDate(to);
      }

      if (params.hasOwnProperty("expand[]")) {
        expand = { "expand[]": params["expand[]"] };
      }

      count = Number(count) || 10;
      skip = Number(skip) || 0;
      authorized = authorized;

      return api.get({
        url: '/orders',
        data: {
          from: from,
          to: to,
          count: count,
          skip: skip,
          authorized: authorized,
          receipt: receipt,
          expand: expand
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

      var currency = params.currency,
          otherParams = _objectWithoutProperties(params, ['currency']);

      currency = currency || 'INR';

      var data = Object.assign(_extends({
        currency: currency
      }, otherParams));

      return api.post({
        url: '/orders',
        data: data
      }, callback);
    },
    edit: function edit(orderId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];


      if (!orderId) {
        throw new Error('`order_id` is mandatory');
      }

      return api.patch({
        url: '/orders/' + orderId,
        data: params
      }, callback);
    },
    fetchPayments: function fetchPayments(orderId, callback) {
      if (!orderId) {
        throw new Error('`order_id` is mandatory');
      }

      return api.get({
        url: '/orders/' + orderId + '/payments'
      }, callback);
    },
    fetchTransferOrder: function fetchTransferOrder(orderId, callback) {
      if (!orderId) {
        throw new Error('`order_id` is mandatory');
      }

      return api.get({
        url: '/orders/' + orderId + '/?expand[]=transfers&status'
      }, callback);
    }
  };
};