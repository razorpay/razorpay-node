"use strict";

/*
 * DOCS: https://razorpay.com/docs/payment-links/
 */

const Promise = require("promise"),
      { normalizeDate, normalizeNotes } = require('../utils/razorpay-utils');

module.exports = function paymentLinkApi (api) {

  const BASE_URL = "/payment_links",
        MISSING_ID_ERROR = "Payment Link ID is mandatory";

  return {

    create (params={}, callback) {

      /*
       * Creates Payment Link.
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let url = BASE_URL,
          { notes, ...rest } = params,
          data = Object.assign(params);

      return api.post({
        url,
        data
      }, callback,true)
    },
    cancel (paymentLinkId, callback) {

      /*
       * Cancels issued paymentLink
       *
       * @param {String} paymentLinkId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!paymentLinkId) {

        return Promise.reject(MISSING_ID_ERROR);
      }

      let url = `${BASE_URL}/${paymentLinkId}/cancel`;

      return api.post({
        url
      }, callback);
    },

    fetch (paymentLinkId, callback) {

      /*
       * Fetches paymentLink entity with given id
       *
       * @param {String} paymentLinkId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!paymentLinkId) {

        return Promise.reject(MISSING_ID_ERROR);
      }

      let url = `${BASE_URL}/${paymentLinkId}`;

      return api.get({
        url
      }, callback);
    },

    all (params={}, callback) {

      /*
       * Fetches multiple paymentLink with given query options
       *
       * @param {Object} paymentLinkId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let { from, to, count, skip } = params,
          url = BASE_URL;

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
          ...params,
          from,
          to,
          count,
          skip
        }
      }, callback);
    }
  };
};
