"use strict";

const { normalizeDate } = require('../utils/razorpay-utils');

module.exports = function (api) {
  return {
    all(params = {}, callback) {
      let { from, to, count, skip, payment_id, recipient_settlement_id } = params
      let url = '/transfers'

      if (payment_id) {
        url = `/payments/${payment_id}/transfers`
      }

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
          recipient_settlement_id,
        }
      }, callback)
    },

    fetch(transferId, params = {}, callback) {
      let { payment_id } = params
      if (!transferId) {
        throw new Error('`transfer_id` is mandatory')
      }

      let url = `/transfers/${transferId}`

      return api.get({
        url
      }, callback)
    },

    create(params, callback) {
      return api.post({
        url: '/transfers',
        data: params
      }, callback)
    },

    edit(transferId, params, callback) {
      return api.patch({
        url: `/transfers/${transferId}`,
        data: params
      }, callback)
    },

    reverse(transferId, params, callback) {
      if (!transferId) {
        throw new Error('`transfer_id` is mandatory')
      }

      let url = `/transfers/${transferId}/reversals`;

      return api.post({
        url,
        data: params
      }, callback)
    },

    fetchSettlements(callback) {
     return api.get({
        url: `/transfers?expand[]=recipient_settlement`
      }, callback)
    }
  }
}

