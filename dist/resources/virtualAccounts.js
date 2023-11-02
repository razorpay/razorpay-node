"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Promise = require("promise");

var _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate,
    normalizeNotes = _require.normalizeNotes;

var BASE_URL = '/virtual_accounts',
    ID_REQUIRED_MSG = "`virtual_account_id` is mandatory";

module.exports = function (api) {
  return {
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];

      var from = params.from,
          to = params.to,
          count = params.count,
          skip = params.skip,
          otherParams = _objectWithoutProperties(params, ["from", "to", "count", "skip"]);

      var url = BASE_URL;

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
        data: _extends({
          from: from,
          to: to,
          count: count,
          skip: skip
        }, otherParams)
      }, callback);
    },
    fetch: function fetch(virtualAccountId, callback) {

      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      var url = BASE_URL + "/" + virtualAccountId;

      return api.get({
        url: url
      }, callback);
    },
    create: function create() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];

      return api.post({
        url: BASE_URL,
        data: params
      }, callback);
    },
    close: function close(virtualAccountId, callback) {

      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      return api.post({
        url: BASE_URL + "/" + virtualAccountId + "/close"
      }, callback);
    },
    fetchPayments: function fetchPayments(virtualAccountId, callback) {

      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      var url = BASE_URL + "/" + virtualAccountId + "/payments";

      return api.get({
        url: url
      }, callback);
    },
    addReceiver: function addReceiver(virtualAccountId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];


      /*
       * Add Receiver to an Existing Virtual Account
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      return api.post({
        url: BASE_URL + "/" + virtualAccountId + "/receivers",
        data: params
      }, callback);
    },
    allowedPayer: function allowedPayer(virtualAccountId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];


      /*
       * Add an Allowed Payer Account
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      return api.post({
        url: BASE_URL + "/" + virtualAccountId + "/allowed_payers",
        data: params
      }, callback);
    },
    deleteAllowedPayer: function deleteAllowedPayer(virtualAccountId, allowedPayerId, callback) {

      /*
      * Delete an Allowed Payer Account
      * @param {String} virtualAccountId
      * @param {String} allowedPayerId
      * @param {Function} callback
      *
      * @return {Promise}
      */

      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      if (!allowedPayerId) {

        return Promise.reject("allowed payer id is mandatory");
      }

      return api.delete({
        url: BASE_URL + "/" + virtualAccountId + "/allowed_payers/" + allowedPayerId
      }, callback);
    }
  };
};