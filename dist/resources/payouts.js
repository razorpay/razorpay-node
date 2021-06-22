"use strict";

/*
 * DOCS: https://razorpay.com/docs/subscriptions/api/
 */


//custom created

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Promise = require("promise"),
    _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate,
    normalizeNotes = _require.normalizeNotes;


module.exports = function payoutsApi(api) {

  var BASE_URL = "/";

  return {
    createContact: function createContact(data, callback) {
        /*
         * Create a contact for payout
         *
         * @data {Object} object
         * @param {Function} callback
         *
         * @return {Promise}
         */
  
        var url = BASE_URL+"contacts";
        
        return api.post({ url: url, data: data }, callback);
    },
    
    createFundAccount: function createFundAccount(data, callback) {
        /*
         * Create a account for payout contact
         *
         * @data {Object} object
         * @param {Function} callback
         *
         * @return {Promise}
         */
  
        var url = BASE_URL+"fund_accounts";

        console.log("url is ", url)
        
        return api.post({ url: url, data: data }, callback);
        
    },

    deleteFundAccount: function deleteFundAccount(accountId, callback) {
        /*
         * Delete a account for payout contact
         *
         * @data {Object} object
         * @param {Function} callback
         *
         * @return {Promise}
         */
  
        var url = BASE_URL+"fund_accounts/"+accountId;

        let data = {
          active: false
        }
        console.log("url is ", url, data);
        
        return api.patch({ url: url, data: data }, callback);
    },

    fetchFundAccount: function fetchFundAccount(accountId, callback) {
              /*
         * Fetch a account for payout contact
         *
         * @data {Object} object
         * @param {Function} callback
         *
         * @return {Promise}
         */
      var url = BASE_URL+"fund_accounts/"+accountId;

      console.log("url is ", url)
      
      return api.get({ url: url }, callback);
    },

    createPayout: function createPayout(data, callback) {
      /*
       * Create a account for payout contact
       *
       * @data {Object} object
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = BASE_URL+"payouts";

      console.log("inside url is ", data)
      
      return api.post({ url: url, data: data }, callback);
      
  },
  };
};