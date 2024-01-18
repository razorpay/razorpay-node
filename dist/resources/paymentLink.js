"use strict";

/*
 * DOCS: https://razorpay.com/docs/payment-links/
 */
import Promise from "promise";
import { normalizeDate } from "../utils/razorpay-utils.js";
export default function paymentLinkApi(api) {
  const BASE_URL = "/payment_links";
  const MISSING_ID_ERROR = "Payment Link ID is mandatory";
  return {
    create(params, callback) {
      /*
       * Creates Payment Link.
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let url = BASE_URL;
      return api.post({
        url,
        data: params
      }, callback);
    },
    cancel(paymentLinkId, callback) {
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
    fetch(paymentLinkId, callback) {
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
    all(params = {}, callback) {
      /*
       * Fetches multiple paymentLink with given query options
       *
       * @param {Object} paymentLinkId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let {
          from,
          to,
          count,
          skip
        } = params,
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
    edit(paymentLinkId, params, callback) {
      return api.patch({
        url: `${BASE_URL}/${paymentLinkId}`,
        data: params
      }, callback);
    },
    notifyBy(paymentLinkId, medium, callback) {
      /*
       * Send/re-send notification for invoice by given medium
       *
       * @param {String} paymentLinkId
       * @param {String} medium
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!paymentLinkId) {
        return Promise.reject(MISSING_ID_ERROR);
      }
      if (!medium) {
        return Promise.reject("`medium` is required");
      }
      let url = `${BASE_URL}/${paymentLinkId}/notify_by/${medium}`;
      return api.post({
        url
      }, callback);
    }
  };
}