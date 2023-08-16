"use strict";

const Promise = require("promise");
const { normalizeDate, normalizeNotes } = require('../utils/razorpay-utils');

const BASE_URL = '/virtual_accounts',
      ID_REQUIRED_MSG = "`virtual_account_id` is mandatory";

module.exports = function (api) {
  return {
    all(params = {}, callback) {
      let { from, to, count, skip, ...otherParams } = params
      let url = BASE_URL

      if (from) {
        from = normalizeDate(from)
      }

      if (to) {
        to = normalizeDate(to)
      }

      count = Number(count) || 10
      skip = Number(skip) || 0

      return api.get({
        url,
        data: {
          from,
          to,
          count,
          skip,
          ...otherParams
        }
      }, callback)
    },

    fetch(virtualAccountId, callback) {

      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      let url = `${BASE_URL}/${virtualAccountId}`

      return api.get({
        url
      }, callback)
    },

    create(params={}, callback) {
      return api.post({
        url: BASE_URL,
        data: params
      }, callback)
    },

    close(virtualAccountId, callback) {

      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      return api.post({
        url: `${BASE_URL}/${virtualAccountId}/close`,
      }, callback)
    },

    fetchPayments (virtualAccountId, callback) {

      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      let url = `${BASE_URL}/${virtualAccountId}/payments`;

      return api.get({
        url
      }, callback);
    },

    addReceiver(virtualAccountId, params={}, callback){

      /*
       * Add Receiver to an Existing Virtual Account
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      return api.post({
        url: `${BASE_URL}/${virtualAccountId}/receivers`,
        data: params
      }, callback);
    },
    allowedPayer(virtualAccountId,params={},callback) {
    
      /*
       * Add an Allowed Payer Account
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */
       
      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }
      
      return api.post({
        url: `${BASE_URL}/${virtualAccountId}/allowed_payers`,
        data: params
      }, callback);
    },
   deleteAllowedPayer(virtualAccountId,allowedPayerId,callback) {

      /*
      * Delete an Allowed Payer Account
      * @param {String} virtualAccountId
      * @param {String} allowedPayerId
      * @param {Function} callback
      *
      * @return {Promise}
      */

     if (!virtualAccountId) {

       return Promise.reject(ID_REQUIRED_MSG);
     }

     if (!allowedPayerId) {

       return Promise.reject("allowed payer id is mandatory");
     }

     return api.delete({
       url: `${BASE_URL}/${virtualAccountId}/allowed_payers/${allowedPayerId}`,
     }, callback);
   }
  }
}
