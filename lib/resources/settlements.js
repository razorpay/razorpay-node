'use strict'

const { normalizeBoolean } = require('../../dist/utils/razorpay-utils');
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
            {notes, settle_full_balance, ...rest} = params;
            

        let data = Object.assign({
            settle_full_balance: normalizeBoolean(settle_full_balance),
            ...rest
        },normalizeNotes(notes));
        
        return api.post({
          url,
          data        
        }, callback);
    },
    all (params={}, callback) {

        /*
         * Fetch all settlements
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
      fetch(settlementId, callback) {

      /*
       * Fetch a settlement
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */
      
        if (!settlementId) {
  
          return Promise.reject("settlement Id is mandatroy");
        }
  
        return api.get({
          url: `${BASE_URL}/${settlementId}`,
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
         * Fetch all demand settlements
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
        url = `${BASE_URL}/recon/combined`;
  
        return api.get({
          url,
          data: {
            ...params,
            day,
            count,
            skip
          }
        }, callback)
      }
  }
}
