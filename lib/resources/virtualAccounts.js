"use strict";

const Promise = require("promise");
const { normalizeDate, normalizeNotes } = require('../utils/razorpay-utils');

module.exports = function (api) {
  return {
    all(params = {}, callback) {
      let { from, to, count, skip } = params
      let url = '/virtual_accounts'

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
          skip
        }
      }, callback)
    },

    fetch(virtualAccountId, callback) {

      if (!virtualAccountId) {

        return Promise.reject('`virtual_account_id` is mandatory');
      }

      let url = `/virtual_accounts/${virtualAccountId}`

      return api.get({
        url
      }, callback)
    },

    create(params, callback) {
      let { notes, ...rest } = params
      let data = Object.assign(rest, normalizeNotes(notes))

      return api.post({
        url: '/virtual_accounts',
        data
      }, callback)
    },

    close(virtualAccountId, callback) {

      if (!virtualAccountId) {

        return Promise.reject('`virtual_account_id` is mandatory');
      } 

      let data = {
        status: 'closed'
      }

      return api.patch({
        url: `/virtual_accounts/${virtualAccountId}`,
        data
      }, callback)
    },
  }
}
