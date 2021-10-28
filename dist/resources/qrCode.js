'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _require = require('../utils/razorpay-utils'),
    normalizeNotes = _require.normalizeNotes;

module.exports = function (api) {

  var BASE_URL = "/payments/qr_codes";

  return {
    create: function create() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
       * Creates a QrCode
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      var url = BASE_URL,
          notes = params.notes,
          rest = _objectWithoutProperties(params, ['notes']),
          data = Object.assign(rest, normalizeNotes(notes));


      return api.post({
        url: url,
        data: data
      }, callback);
    },
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];


      /*
       * Fetch all fund accounts
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
    fetchAllPayments: function fetchAllPayments(qrCodeId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];


      /*
       * Fetch all payment for a qrCode
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
          url = BASE_URL + '/' + qrCodeId + '/payments';


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
    fetch: function fetch(qrCodeId, callback) {

      if (!qrCodeId) {

        return Promise.reject("qrCode Id is mandatroy");
      }

      return api.get({
        url: BASE_URL + '/' + qrCodeId
      }, callback);
    },
    close: function close(qrCodeId, callback) {

      if (!qrCodeId) {

        return Promise.reject("qrCode Id is mandatroy");
      }

      var url = BASE_URL + '/' + qrCodeId + '/close';

      return api.post({
        url: url
      }, callback);
    }
  };
};