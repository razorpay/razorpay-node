"use strict";

/*
 * DOCS: https://razorpay.com/docs/invoices/
 */

const Promise = require("promise"),
      { normalizeDate, normalizeNotes } = require('../utils/razorpay-utils');

module.exports = function invoicesApi (api) {

  const BASE_URL = "/invoices",
        MISSING_ID_ERROR = "Invoice ID is mandatory";

  /**
   * Invoice entity gets used for both Payment Links and Invoices system.
   * Few of the methods are only meaningful for Invoices system and
   * calling those for against/for a Payment Link would throw
   * Bad request error.
   */

  return {

    create (params={}, callback) {

      /*
       * Creates invoice of any type(invoice|link|ecod).
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let url = BASE_URL,
          { notes, ...rest } = params,
          data = Object.assign(rest, normalizeNotes(notes));

      return api.post({
        url,
        data
      }, callback)
    },

    edit (invoiceId, params={}, callback) {

      /*
       * Patches given invoice with new attributes
       *
       * @param {String} invoiceId
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let url = `${BASE_URL}/${invoiceId}`,
          { notes, ...rest } = params,
          data = Object.assign(rest, normalizeNotes(notes));

      if (!invoiceId) {

        return Promise.reject("Invoice ID is mandatory");
      }

      return api.patch({
        url,
        data
      }, callback);
    },

    issue (invoiceId, callback) {

      /*
       * Issues drafted invoice
       *
       * @param {String} invoiceId
       * @param {Function} callback
       * 
       * @return {Promise}
       */

      if (!invoiceId) {

        return Promise.reject(MISSING_ID_ERROR);
      }

      let url = `${BASE_URL}/${invoiceId}/issue`;

      return api.post({
        url
      }, callback);
    },

    delete (invoiceId, callback) {

      /*
       * Deletes drafted invoice
       *
       * @param {String} invoiceId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!invoiceId) {

        return Promise.reject(MISSING_ID_ERROR);
      }

      let url = `${BASE_URL}/${invoiceId}`;

      return api.delete({
        url
      }, callback);
    },

    cancel (invoiceId, callback) {

      /*
       * Cancels issued invoice
       * 
       * @param {String} invoiceId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!invoiceId) {

        return Promise.reject(MISSING_ID_ERROR);
      }

      let url = `${BASE_URL}/${invoiceId}/cancel`;

      return api.post({
        url
      }, callback);
    },

    fetch (invoiceId, callback) {

      /*
       * Fetches invoice entity with given id
       *
       * @param {String} invoiceId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!invoiceId) {

        return Promise.reject(MISSING_ID_ERROR);
      }

      let url = `${BASE_URL}/${invoiceId}`;

      return api.get({
        url
      }, callback);
    },

    all (params={}, callback) {

      /*
       * Fetches multiple invoices with given query options
       *
       * @param {Object} invoiceId
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
    },

    notifyBy (invoiceId, medium, callback) {

      /*
       * Send/re-send notification for invoice by given medium
       * 
       * @param {String} invoiceId
       * @param {String} medium
       * @param {Function} callback
       * 
       * @return {Promise}
       */

      if (!invoiceId) {

        return Promise.reject(MISSING_ID_ERROR);
      }

      if (!medium) {

        return Promise.reject("`medium` is required");
      }

      let url = `${BASE_URL}/${invoiceId}/notify_by/${medium}`;

      return api.post({
        url
      }, callback);
    }
  };
};
