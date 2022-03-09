'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _require = require('../../dist/utils/razorpay-utils'),
    normalizeBoolean = _require.normalizeBoolean;

var _require2 = require('../utils/razorpay-utils'),
    normalizeNotes = _require2.normalizeNotes;

module.exports = function (api) {

  var BASE_URL = "/settlements";

  return {
    createOndemandSettlement: function createOndemandSettlement() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
       * Create on-demand settlement
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = BASE_URL + '/ondemand',
          notes = params.notes,
          settle_full_balance = params.settle_full_balance,
          rest = _objectWithoutProperties(params, ['notes', 'settle_full_balance']);


      var data = Object.assign(_extends({
        settle_full_balance: normalizeBoolean(settle_full_balance)
      }, rest), normalizeNotes(notes));

      return api.post({
        url: url,
        data: data
      }, callback);
    },
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
       * Fetch all settlements
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var from = params.from,
          to = params.to,
          count = params.count,
          skip = params.skip,
          url = BASE_URL;


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
    fetch: function fetch(settlementId, callback) {

      /*
       * Fetch a settlement
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!settlementId) {

        return Promise.reject("settlement Id is mandatroy");
      }

      return api.get({
        url: BASE_URL + '/' + settlementId
      }, callback);
    },

    fetchOndemandSettlementById: function fetchOndemandSettlementById(settlementId, callback) {

      /*
       * Fetch On-demand Settlements by ID
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!settlementId) {

        return Promise.reject("settlment Id is mandatroy");
      }

      return api.get({
        url: BASE_URL + '/ondemand/' + settlementId
      }, callback);
    },
    fetchAllOndemandSettlement: function fetchAllOndemandSettlement() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
       * Fetch all demand settlements
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var from = params.from,
          to = params.to,
          count = params.count,
          skip = params.skip,
          url = BASE_URL + '/ondemand';


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
    reports: function reports() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
      * Settlement report for a month
      *
      * @param {Object} params
      * @param {Function} callback
      *
      * @return {Promise}
      */

      var day = params.day,
          count = params.count,
          skip = params.skip,
          url = BASE_URL + '/report/combined';


      return api.get({
        url: url,
        data: _extends({}, params, {
          day: day,
          count: count,
          skip: skip
        })
      }, callback);
    }
  };
};