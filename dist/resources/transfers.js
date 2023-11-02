"use strict";

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
      return api.post({
        url: '/transfers',
        data: params
      }, callback);
    },
    edit: function edit(transferId, params, callback) {
      return api.patch({
        url: '/transfers/' + transferId,
        data: params
      }, callback);
    },
    reverse: function reverse(transferId, params, callback) {
      if (!transferId) {
        throw new Error('`transfer_id` is mandatory');
      }

      var url = '/transfers/' + transferId + '/reversals';

      return api.post({
        url: url,
        data: params
      }, callback);
    },
    fetchSettlements: function fetchSettlements(callback) {
      return api.get({
        url: '/transfers?expand[]=recipient_settlement'
      }, callback);
    }
  };
};