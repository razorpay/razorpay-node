"use strict";

/*
 * DOCS: https://razorpay.com/docs/subscriptions/api/
 */

const Promise = require("promise"),
      { normalizeDate } = require('../utils/razorpay-utils');

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
    },

    all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];

      
      /*
       * Get all Addons
       *
       * @param {Object} params
       * @param {Funtion} callback
       *
       * @return {Promise}
       */

      let { from, to, count, skip } = params,
          url = BASE_URL;

      if (from) {
        from = normalizeDate(from);
      }

      if (to) {
        to = normalizeDate(to);
      }

      count = Number(count) || 10;
      skip = Number(skip) || 0;

      return api.get({
        url: url,
        data: {
          ...params,
          from,
          to,
          count,
          skip
        }
      }, callback);
    }
  }
};

