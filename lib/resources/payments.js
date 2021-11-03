'use strict'

const Promise = require("promise");

const { normalizeDate, normalizeBoolean, normalizeNotes } = require('../utils/razorpay-utils')

const ID_REQUIRED_MSG = '`payment_id` is mandatory';

module.exports = function (api) {
  return {
    all(params = {}, callback) {
      let { from, to, count, skip } = params

      if (from) {
        from = normalizeDate(from)
      }

      if (to) {
        to = normalizeDate(to)
      }

      count = Number(count) || 10
      skip = Number(skip) || 0

      return api.get({
        url: '/payments',
        data: {
          from,
          to,
          count,
          skip
        }
      }, callback)
    },

    fetch(paymentId, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory')
      }

      return api.get({
        url: `/payments/${paymentId}`
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
        url: `/payments/${paymentId}/capture`,
        data: payload
      }, callback)
    },
    createPaymentJson(params, callback) {
      
      let url = `payments/create/json`,
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
        url: '/payments/create/recurring',
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
        url: `/payments/${paymentId}`,
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
        url: `/payments/${paymentId}/refund`,
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
          url = `/payments/${paymentId}/refunds`;

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
        url: `/payments/${paymentId}/refunds/${refundId}`
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
        url: '/payments/' + paymentId + '/transfers'
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
        url: `/payments/${paymentId}/transfers`,
        data
      }, callback)
    },

    bankTransfer(paymentId, callback) {

      if (!paymentId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      return api.get({
        url: `/payments/${paymentId}/bank_transfer`
      }, callback);
    },
    fetchCardDetails(paymentId, callback) {
      
      if (!paymentId) {
  
        return Promise.reject(ID_REQUIRED_MSG);
      }
  
      return api.get({
        url: `/payments/${paymentId}/card`
      }, callback);
    },
    fetchPaymentDowntime(callback) {
  
      return api.get({
        url: `/payments/downtimes`
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
        url: '/payments/downtimes/'+ downtimeId
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
        url: `/payments/${paymentId}/otp/submit`,
        data : params
      }, callback);
    }
  }
}
