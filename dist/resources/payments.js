'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Promise = require("promise");

var _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate;

var ID_REQUIRED_MSG = '`payment_id` is mandatory',
    BASE_URL = '/payments';

module.exports = function (api) {
  return {
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];
      var from = params.from,
          to = params.to,
          count = params.count,
          skip = params.skip;

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

      return api.get({
        url: '' + BASE_URL,
        data: {
          from: from,
          to: to,
          count: count,
          skip: skip,
          expand: expand
        }
      }, callback);
    },
    fetch: function fetch(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];

      var expand = void 0;

      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }

      if (params.hasOwnProperty("expand[]")) {
        expand = { "expand[]": params["expand[]"] };
      }

      return api.get({
        url: BASE_URL + '/' + paymentId,
        data: {
          expand: expand
        }
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
        url: BASE_URL + '/' + paymentId + '/capture',
        data: payload
      }, callback);
    },
    createPaymentJson: function createPaymentJson(params, callback) {
      var url = BASE_URL + '/create/json',
          rest = _objectWithoutProperties(params, []),
          data = Object.assign(rest);

      return api.post({
        url: url,
        data: data
      }, callback);
    },
    createRecurringPayment: function createRecurringPayment(params, callback) {
      return api.post({
        url: BASE_URL + '/create/recurring',
        data: params
      }, callback);
    },
    edit: function edit(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];

      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }

      return api.patch({
        url: BASE_URL + '/' + paymentId,
        data: params
      }, callback);
    },
    refund: function refund(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];

      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }
      return api.post({
        url: BASE_URL + '/' + paymentId + '/refund',
        data: params
      }, callback);
    },
    fetchMultipleRefund: function fetchMultipleRefund(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];


      /*
       * Fetch multiple refunds for a payment
       *
       * @param {String} paymentId 
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var from = params.from,
          to = params.to,
          count = params.count,
          skip = params.skip,
          url = BASE_URL + '/' + paymentId + '/refunds';


      return api.get({
        url: url,
        data: _extends({}, params, {
          from: from,
          to: to,
          count: count,
          skip: skip
        })
      }, callback);
    },
    fetchRefund: function fetchRefund(paymentId, refundId, callback) {

      if (!paymentId) {
        throw new Error('payment Id` is mandatory');
      }

      if (!refundId) {
        throw new Error('refund Id` is mandatory');
      }

      return api.get({
        url: BASE_URL + '/' + paymentId + '/refunds/' + refundId
      }, callback);
    },
    fetchTransfer: function fetchTransfer(paymentId, callback) {

      /*
       * Fetch transfers for a payment
       *
       * @param {String} paymentId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!paymentId) {
        throw new Error('payment Id` is mandatory');
      }

      return api.get({
        url: BASE_URL + '/' + paymentId + '/transfers'
      }, callback);
    },
    transfer: function transfer(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];

      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }
      return api.post({
        url: BASE_URL + '/' + paymentId + '/transfers',
        data: params
      }, callback);
    },
    bankTransfer: function bankTransfer(paymentId, callback) {

      if (!paymentId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      return api.get({
        url: BASE_URL + '/' + paymentId + '/bank_transfer'
      }, callback);
    },
    fetchCardDetails: function fetchCardDetails(paymentId, callback) {

      if (!paymentId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      return api.get({
        url: BASE_URL + '/' + paymentId + '/card'
      }, callback);
    },
    fetchPaymentDowntime: function fetchPaymentDowntime(callback) {

      return api.get({
        url: BASE_URL + '/downtimes'
      }, callback);
    },
    fetchPaymentDowntimeById: function fetchPaymentDowntimeById(downtimeId, callback) {

      /*
       * Fetch Payment Downtime
       *
       * @param {String} downtimeId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!downtimeId) {

        return Promise.reject("Downtime Id is mandatory");
      }

      return api.get({
        url: BASE_URL + '/downtimes/' + downtimeId
      }, callback);
    },
    otpGenerate: function otpGenerate(paymentId, callback) {

      /*
       * OTP Generate
       *
       * @param {String} paymentId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!paymentId) {

        return Promise.reject("payment Id is mandatory");
      }

      return api.post({
        url: BASE_URL + '/' + paymentId + '/otp_generate'
      }, callback);
    },
    otpSubmit: function otpSubmit(paymentId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];


      /*
       * OTP Submit
       *
       * @param {String} paymentId
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!paymentId) {

        return Promise.reject("payment Id is mandatory");
      }

      return api.post({
        url: BASE_URL + '/' + paymentId + '/otp/submit',
        data: params
      }, callback);
    },
    otpResend: function otpResend(paymentId, callback) {

      /*
       * OTP Resend
       *
       * @param {String} paymentId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!paymentId) {

        return Promise.reject("payment Id is mandatory");
      }

      return api.post({
        url: BASE_URL + '/' + paymentId + '/otp/resend'
      }, callback);
    },
    createUpi: function createUpi() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
       * Initiate a payment
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = BASE_URL + '/create/upi',
          rest = _objectWithoutProperties(params, []),
          data = Object.assign(rest);

      return api.post({
        url: url,
        data: data
      }, callback);
    },
    validateVpa: function validateVpa() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
       * Validate the VPA
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = BASE_URL + '/validate/vpa',
          rest = _objectWithoutProperties(params, []),
          data = Object.assign(rest);

      return api.post({
        url: url,
        data: data
      }, callback);
    },
    fetchPaymentMethods: function fetchPaymentMethods(callback) {
      /*
       * Validate the VPA
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = '/methods';
      return api.get({
        url: url
      }, callback);
    }
  };
};