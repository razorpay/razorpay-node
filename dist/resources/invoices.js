"use strict";

/*
 * DOCS: https://razorpay.com/docs/invoices/
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Promise = require("promise"),
    _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate,
    normalizeNotes = _require.normalizeNotes;


module.exports = function invoicesApi(api) {

  var BASE_URL = "/invoices",
      MISSING_ID_ERROR = "Invoice ID is mandatory";

  /**
   * Invoice entity gets used for both Payment Links and Invoices system.
   * Few of the methods are only meaningful for Invoices system and
   * calling those for against/for a Payment Link would throw
   * Bad request error.
   */

  return {
    create: function create() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
       * Creates invoice of any type(invoice|link|ecod).
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = BASE_URL,
          notes = params.notes,
          rest = _objectWithoutProperties(params, ["notes"]),
          data = Object.assign(rest, normalizeNotes(notes));


      return api.post({
        url: url,
        data: data
      }, callback);
    },
    edit: function edit(invoiceId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];


      /*
       * Patches given invoice with new attributes
       *
       * @param {String} invoiceId
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = BASE_URL + "/" + invoiceId,
          notes = params.notes,
          rest = _objectWithoutProperties(params, ["notes"]),
          data = Object.assign(rest, normalizeNotes(notes));


      if (!invoiceId) {

        return Promise.reject("Invoice ID is mandatory");
      }

      return api.patch({
        url: url,
        data: data
      }, callback);
    },
    issue: function issue(invoiceId, callback) {

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

      var url = BASE_URL + "/" + invoiceId + "/issue";

      return api.post({
        url: url
      }, callback);
    },
    delete: function _delete(invoiceId, callback) {

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

      var url = BASE_URL + "/" + invoiceId;

      return api.delete({
        url: url
      }, callback);
    },
    cancel: function cancel(invoiceId, callback) {

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

      var url = BASE_URL + "/" + invoiceId + "/cancel";

      return api.post({
        url: url
      }, callback);
    },
    fetch: function fetch(invoiceId, callback) {

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

      var url = BASE_URL + "/" + invoiceId;

      return api.get({
        url: url
      }, callback);
    },
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
       * Fetches multiple invoices with given query options
       *
       * @param {Object} invoiceId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var from = params.from,
          to = params.to,
          count = params.count,
          skip = params.skip,
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
        data: _extends({}, params, {
          from: from,
          to: to,
          count: count,
          skip: skip
        })
      }, callback);
    },
    notifyBy: function notifyBy(invoiceId, medium, callback) {

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

      var url = BASE_URL + "/" + invoiceId + "/notify_by/" + medium;

      return api.post({
        url: url
      }, callback);
    }
  };
};