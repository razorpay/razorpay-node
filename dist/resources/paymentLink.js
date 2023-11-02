"use strict";

/*
 * DOCS: https://razorpay.com/docs/payment-links/
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Promise = require("promise"),
    _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate,
    normalizeNotes = _require.normalizeNotes;


module.exports = function paymentLinkApi(api) {

      var BASE_URL = "/payment_links",
          MISSING_ID_ERROR = "Payment Link ID is mandatory";

      return {
            create: function create(params, callback) {

                  /*
                   * Creates Payment Link.
                   *
                   * @param {Object} params
                   * @param {Function} callback
                   *
                   * @return {Promise}
                   */

                  var url = BASE_URL;
                  return api.post({
                        url: url,
                        data: params
                  }, callback);
            },
            cancel: function cancel(paymentLinkId, callback) {

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

                  var url = BASE_URL + "/" + paymentLinkId + "/cancel";

                  return api.post({
                        url: url
                  }, callback);
            },
            fetch: function fetch(paymentLinkId, callback) {

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

                  var url = BASE_URL + "/" + paymentLinkId;

                  return api.get({
                        url: url
                  }, callback);
            },
            all: function all() {
                  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                  var callback = arguments[1];


                  /*
                   * Fetches multiple paymentLink with given query options
                   *
                   * @param {Object} paymentLinkId
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
            edit: function edit(paymentLinkId, params, callback) {
                  return api.patch({
                        url: BASE_URL + "/" + paymentLinkId,
                        data: params
                  }, callback);
            },
            notifyBy: function notifyBy(paymentLinkId, medium, callback) {

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

                  var url = BASE_URL + "/" + paymentLinkId + "/notify_by/" + medium;

                  return api.post({
                        url: url
                  }, callback);
            }
      };
};