'use strict'

const Promise = require("promise");

const { normalizeDate, normalizeBoolean, normalizeNotes } = require('../utils/razorpay-utils')

const ID_REQUIRED_MSG = '`payment_id` is mandatory',
      BASE_URL = '/payments';

module.exports = function (api) {
  return {
    all(params = {}, callback) {

      let { from, to, count, skip } = params
      let expand ;

      if (from) {
        from = normalizeDate(from)
      }

      if (to) {
        to = normalizeDate(to)
      }

      if(params.hasOwnProperty("expand[]")) {
        expand = { "expand[]" : params["expand[]"] }
      }

      count = Number(count) || 10
      skip = Number(skip) || 0

      return api.get({
        url: `${BASE_URL}`,
        data: {
          from,
          to,
          count,
          skip,
          expand
        }
      }, callback)
    },

    fetch(paymentId, params = {}, callback) {
      let expand ;

      if (!paymentId) {
        throw new Error('`payment_id` is mandatory')
      }

      if(params.hasOwnProperty("expand[]")) {
        expand = { "expand[]" : params["expand[]"] }
      }

      return api.get({
        url: `${BASE_URL}/${paymentId}`,
        data: {
          expand
        }
      }, callback)
    },

    capture(paymentId, amount, currency, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory')
      }

      if (!amount) {
        throw new Error('`amount` is mandatory')
      }

      const payload = {
        amount,
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
        url: `${BASE_URL}/${paymentId}/capture`,
        data: payload
      }, callback)
    },
    createPaymentJson(params, callback) {
      
      let url = `${BASE_URL}/create/json`,
      {...rest} = params,
      data = Object.assign(rest);
      return api.post({
        url,
        data
      }, callback);
    },
    createRecurringPayment(params, callback) {
      let { notes, ...rest } = params
      let data = Object.assign(rest, normalizeNotes(notes))

      return api.post({
        url: `${BASE_URL}/create/recurring`,
        data
      }, callback)
    },
    edit(paymentId, params = {}, callback) {
      let { notes } = params
      
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory')
      }

      let data = Object.assign(normalizeNotes(notes))

      return api.patch({
        url: `${BASE_URL}/${paymentId}`,
        data
      }, callback)
    },

    refund(paymentId, params = {}, callback) {
      let { notes, ...otherParams } = params

      if (!paymentId) {
        throw new Error('`payment_id` is mandatory')
      }

      let data = Object.assign(otherParams, normalizeNotes(notes))
      return api.post({
        url: `${BASE_URL}/${paymentId}/refund`,
        data
      }, callback)
    },
     
    fetchMultipleRefund (paymentId, params={}, callback) {

      /*
       * Fetch multiple refunds for a payment
       *
       * @param {String} paymentId 
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let { from, to, count, skip } = params,
          url = `${BASE_URL}/${paymentId}/refunds`;

      return api.get({
        url,
        data: {
          ...params,
          from,
          to,
          count,
          skip
        }
      }, callback);
    },

    fetchRefund(paymentId, refundId, callback) {

      if (!paymentId) {
        throw new Error('payment Id` is mandatory')
      }

      if (!refundId) {
        throw new Error('refund Id` is mandatory')
      }

      return api.get({
        url: `${BASE_URL}/${paymentId}/refunds/${refundId}`
      }, callback)
    },
    
    fetchTransfer(paymentId, callback) {

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
        url: `${BASE_URL}/${paymentId}/transfers`
      }, callback);
    },
   transfer(paymentId, params = {}, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory')
      }

      let { notes, ...otherParams } = params

      let data = Object.assign(otherParams, normalizeNotes(notes))

      if (data.transfers) {
        let transfers = data.transfers
        transfers.forEach(function (transfer) {
          transfer.on_hold = normalizeBoolean(!!transfer.on_hold);
        })
      }
      return api.post({
        url: `${BASE_URL}/${paymentId}/transfers`,
        data
      }, callback)
    },

    bankTransfer(paymentId, callback) {

      if (!paymentId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      return api.get({
        url: `${BASE_URL}/${paymentId}/bank_transfer`
      }, callback);
    },
    fetchCardDetails(paymentId, callback) {
      
      if (!paymentId) {
  
        return Promise.reject(ID_REQUIRED_MSG);
      }
  
      return api.get({
        url: `${BASE_URL}/${paymentId}/card`
      }, callback);
    },
    fetchPaymentDowntime(callback) {
  
      return api.get({
        url: `${BASE_URL}/downtimes`
      }, callback);
    },
    fetchPaymentDowntimeById(downtimeId, callback) {

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
        url: `${BASE_URL}/downtimes/${downtimeId}`
      }, callback);
    },
    otpGenerate(paymentId, callback){

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
        url: `${BASE_URL}/${paymentId}/otp_generate`
      }, callback);
    },
    otpSubmit(paymentId, params={}, callback){

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
        url: `${BASE_URL}/${paymentId}/otp/submit`,
        data : params
      }, callback);
    },
    
    otpResend(paymentId, callback){

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
        url: `${BASE_URL}/${paymentId}/otp/resend`
      }, callback);
     },
    
    createUpi(params={}, callback){

      /*
       * Initiate a payment
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let url = `${BASE_URL}/create/upi`,
      {...rest} = params,
      data = Object.assign(rest);
      return api.post({
        url,
        data
      }, callback);
    },
    
    validateVpa(params={}, callback){
      
      /*
       * Validate the VPA
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let url = `${BASE_URL}/validate/vpa`,
      {...rest} = params,
      data = Object.assign(rest);
      return api.post({
        url,
        data
      }, callback);
    },
    fetchPaymentMethods(callback){
      /*
       * Validate the VPA
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let url = `/methods`;
      return api.get({
        url
      }, callback);      
    }
  }
}
