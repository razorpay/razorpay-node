"use strict";

const Promise = require("promise");
const { normalizeDate, normalizeNotes } = require('../utils/razorpay-utils');

const BASE_URL = '/virtual_accounts',
      ID_REQUIRED_MSG = "`virtual_account_id` is mandatory";

module.exports = function (api) {
  return {
    all(params = {}, callback) {
      let { from, to, count, skip, ...otherParams } = params
      let url = BASE_URL

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
          from,
          to,
          count,
          skip,
          ...otherParams
        }
      }, callback)
    },

    fetch(virtualAccountId, callback) {

      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      let url = `${BASE_URL}/${virtualAccountId}`

      return api.get({
        url
      }, callback)
    },

    create(params={}, callback) {
      let { notes, ...rest } = params
      let data = Object.assign(rest, normalizeNotes(notes))

      return api.post({
        url: BASE_URL,
        data
      }, callback)
    },

    close(virtualAccountId, callback) {

      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      let data = {
        status: 'closed'
      }

      return api.patch({
        url: `${BASE_URL}/${virtualAccountId}`,
        data
      }, callback)
    },

    fetchPayments (virtualAccountId, callback) {

      if (!virtualAccountId) {

        return Promise.reject(ID_REQUIRED_MSG);
      }

      let url = `${BASE_URL}/${virtualAccountId}/payments`;

      return api.get({
        url
      }, callback);
    }
  }
}
