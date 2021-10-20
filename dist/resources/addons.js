"use strict";

/*
 * DOCS: https://razorpay.com/docs/subscriptions/api/
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Promise = require("promise"),
    _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate;


module.exports = function (api) {

  var BASE_URL = "/addons",
      MISSING_ID_ERROR = "Addon ID is mandatory";

  return {
    fetch: function fetch(addonId, callback) {

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

      var url = BASE_URL + "/" + addonId;

      return api.get({
        url: url
      }, callback);
    },
    delete: function _delete(addonId, callback) {

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

      var url = BASE_URL + "/" + addonId;

      return api.delete({
        url: url
      }, callback);
    },
    all: function all() {
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
    }
  };
};