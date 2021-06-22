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


module.exports = function subscriptionsApi(api) {

  var BASE_URL = "/subscriptions",
      MISSING_ID_ERROR = "Subscription ID is mandatory";

  return {
    create: function create() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
       * Creates a Subscription
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
    fetch: function fetch(subscriptionId, callback) {

      /*
       * Fetch a Subscription given Subcription ID
       *
       * @param {String} subscriptionId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!subscriptionId) {

        return Promise.reject(MISSING_ID_ERROR);
      }

      var url = BASE_URL + "/" + subscriptionId;

      return api.get({ url: url }, callback);
    },
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
       * Get all Subscriptions
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
    },
    cancel: function cancel(data, callback) {

      let subscriptionId = data.id;
      let cancelAtCycleEnd = data.cancelAtCycleEnd;
      var url = BASE_URL + "/" + subscriptionId + "/cancel";

      if (!subscriptionId) {
        return Promise.reject(MISSING_ID_ERROR);
      }

      return api.post(_extends({
        url: url
      }, cancelAtCycleEnd && { data: { cancel_at_cycle_end: 1 } }), callback);
    },
    createAddon: function createAddon(subscriptionId, params, callback) {

      /*
       * Creates addOn for a given subscription
       *
       * @param {String} subscriptionId
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = BASE_URL + "/" + subscriptionId + "/addons";

      if (!subscriptionId) {

        return Promise.reject(MISSING_ID_ERROR);
      }

      return api.post({
        url: url,
        data: _extends({}, params)
      }, callback);
    },

    //custom created
    update: function update(subscriptionId, data, callback) {
      /*
       * Update a Subscription for a given Subcription ID
       *
       * @subscriptionId {string} subscriptionId
       * @data {Object} object
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!subscriptionId) {
        return Promise.reject(MISSING_ID_ERROR);
      }

      var url = BASE_URL + "/" + subscriptionId;
      console.log("url is ", url);
      
      return api.patch({ url: url, data: data }, callback);
    },
    pause: function pause(subscriptionId, callback) {
      /*
       * Update a Subscription for a given Subcription ID
       *
       * @subscriptionId {string} subscriptionId
       * @data {Object} object
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!subscriptionId) {
        return Promise.reject(MISSING_ID_ERROR);
      }

      var url = BASE_URL + "/" + subscriptionId + "/pause";
      console.log("url is ", url);
      
      return api.post({ url: url }, callback);
    },
    resume: function resume(subscriptionId, callback) {
      /*
       * Update a Subscription for a given Subcription ID
       *
       * @subscriptionId {string} subscriptionId
       * @data {Object} object
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!subscriptionId) {
        return Promise.reject(MISSING_ID_ERROR);
      }

      var url = BASE_URL + "/" + subscriptionId + "/resume";
      console.log("url is ", url);
      
      return api.post({ url: url }, callback);
    },
    getInvoice: function getInvoice(subscriptionId, callback) {
      
      if (!subscriptionId) {
        return Promise.reject(MISSING_ID_ERROR);
      }

      var url = "/invoices?subscription_id=" + subscriptionId;
      console.log("url is ", url);
      
      return api.get({ url: url }, callback);
    }
  };
};