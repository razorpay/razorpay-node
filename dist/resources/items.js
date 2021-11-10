'use strict';

var _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate,
    normalizeBoolean = _require.normalizeBoolean;

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
        url: '/items',
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
    fetch: function fetch(itemId, callback) {
      if (!itemId) {
        throw new Error('`item_id` is mandatory');
      }

      return api.get({
        url: '/items/' + itemId
      }, callback);
    },
    create: function create() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];
      var amount = params.amount,
          currency = params.currency,
          description = params.description;

      currency = currency || 'INR';

      if (!amount) {
        throw new Error('`amount` is mandatory');
      }

      var data = Object.assign({
        amount: amount,
        currency: currency,
        description: description
      });

      return api.post({
        url: '/items',
        data: data
      }, callback);
    },
    edit: function edit(itemId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];


      if (!itemId) {
        throw new Error('`item_id` is mandatory');
      }

      return api.patch({
        url: '/items/' + itemId,
        data: params
      }, callback);
    },


    delete: function _delete(itemId, callback) {

      if (!itemId) {
        throw new Error('`item_id` is mandatory');
      }

      return api.delete({
        url: '/items/' + itemId
      }, callback);
    }
  };
};