"use strict";

/*
 * DOCS: https://razorpay.com/docs/subscriptions/api/
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Promise = require("promise"),
    _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate,
    normalizeNotes = _require.normalizeNotes;


module.exports = function plansApi(api) {

  var BASE_URL = "/plans",
      MISSING_ID_ERROR = "Plan ID is mandatory";

  return {
    create: function create() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
       * Creates a plan
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
    fetch: function fetch(planId, callback) {

      /*
       * Fetches a plan given Plan ID
       *
       * @param {String} planId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!planId) {

        return Promise.reject(MISSING_ID_ERROR);
      }

      var url = BASE_URL + "/" + planId;

      return api.get({ url: url }, callback);
    },
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
       * Get all Plans
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