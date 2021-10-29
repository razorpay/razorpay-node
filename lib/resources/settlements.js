'use strict'

const { normalizeNotes } = require('../utils/razorpay-utils')

module.exports = function (api) {

  const BASE_URL = "/settlements";
       
  return {
    createOndemandSettlement (params={}, callback) {

        /*
         * Create on-demand settlement
         *
         * @param {Object} params
         * @param {Function} callback
         *
         * @return {Promise}
         */
  
        let url = `${BASE_URL}/ondemand`,
            {notes, ...rest} = params,
            data = Object.assign(rest, normalizeNotes(notes));
  
        return api.post({
          url,
          data        
        }, callback);
    },
    all (params={}, callback) {

        /*
         * Fetch all fund accounts
         *
         * @param {Object} params
         * @param {Function} callback
         *
         * @return {Promise}
         */
  
        let { from, to, count, skip } = params,
            url = BASE_URL;
  
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
      fetchAllPayments (qrCodeId, params={}, callback) {

        /*
         * Fetch all payment for a qrCode
         *
         * @param {Object} params
         * @param {Function} callback
         *
         * @return {Promise}
         */
  
        let { from, to, count, skip } = params,
            url = `${BASE_URL}/${qrCodeId}/payments`;
  
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
      fetch(qrCodeId, callback) {

      /*
       * Fetch a settlement
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */
      
        if (!qrCodeId) {
  
          return Promise.reject("qrCode Id is mandatroy");
        }
  
        return api.get({
          url: `${BASE_URL}/${qrCodeId}`,
        }, callback)
      },
      fetchOndemandSettlementById: function fetchOndemandSettlementById(settlementId, callback) {

        /*
         * Fetch On-demand Settlements by ID
         *
         * @param {Object} params
         * @param {Function} callback
         *
         * @return {Promise}
         */
  
        if (!settlementId) {
  
          return Promise.reject("settlment Id is mandatroy");
        }
  
        return api.get({
          url: `${BASE_URL}/ondemand/${settlementId}`
        }, callback);
      },
      fetchAllOndemandSettlement (params={}, callback) {

        /*
         * Fetch all fund accounts
         *
         * @param {Object} params
         * @param {Function} callback
         *
         * @return {Promise}
         */
  
        let { from, to, count, skip } = params,
            url = `${BASE_URL}/ondemand`;
  
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
      reports(params={}, callback) {
      
        /*
       * Settlement report for a month
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */
  
        let { day, count, skip } = params,
        url = `${BASE_URL}/report/combined`;
  
        return api.get({
          url,
          data: {
            ...params,
            day,
            count,
            skip
          }
        }, callback)
      },
      settlementRecon(params={}, callback) {
      
      /*
       * Settlement Recon
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */
  
        let { day } = params,
        url = `${BASE_URL}/recon/combined`;
  
        return api.get({
          url,
          data: {
            ...params,
            day
          }
        }, callback)
      },
      close (qrCodeId, callback) {

        if (!qrCodeId) {
  
          return Promise.reject("qrCode Id is mandatroy");
        }
  
        let url = `${BASE_URL}/${qrCodeId}/close`;
  
        return api.post({
          url
        }, callback);
      }  
  }
}
