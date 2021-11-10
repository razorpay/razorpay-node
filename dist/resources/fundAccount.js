'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../utils/razorpay-utils'),
    normalizeNotes = _require.normalizeNotes;

module.exports = function (api) {
  return {
    create: function create(params, callback) {

      /*
       * Create a Fund Account
       *
       * @param {String} customerId
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      return api.post({
        url: '/fund_accounts',
        data: _extends({}, params)
      }, callback);
    },
    fetch: function fetch(customerId, callback) {

      if (!customerId) {

        return Promise.reject("Customer Id is mandatroy");
      }

      return api.get({
        url: '/fund_accounts?customer_id=' + customerId
      }, callback);
    }
  };
};