"use strict";

/*
 * DOCS: https://razorpay.com/docs/subscriptions/api/
 */

const Promise = require("promise");

module.exports = function (api) {

  const BASE_URL = "/addons",
        MISSING_ID_ERROR = "Addon ID is mandatory";

  return {

    fetch (addonId, callback) {

      /*
       * Fetches addon given addon id
       * @param {String} addonId
       * @param {Function} callback
       *
       * @return {Promise}
       */
  
      if (!addonId) {
      
        return Promise.reject(MISSING_ID_ERROR);
      }

      const url = `${BASE_URL}/${addonId}`;

      return api.get({
        url
      }, callback);
    },

    delete (addonId, callback) {

      /*
       * Deletes addon given addon id
       * @param {String} addonId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!addonId) {
      
        return Promise.reject(MISSING_ID_ERROR);
      }

      const url = `${BASE_URL}/${addonId}`;

      return api.delete({
        url
      }, callback);
    }
  }
};

