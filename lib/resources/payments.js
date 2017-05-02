'use strict'

const { normalizeDate, normalizeNotes } = require('../utils/razorpay-utils')

module.exports = function (api) {
  return {
    all(params = {}, callback) {
      let { from, to, count, skip } = params

      if (from) {
        from = normalizeDate(from)
      }

      if (to) {
        to = normalizeDate(to)
      }

      count = Number(count) || 10
      skip = Number(skip) || 0

      return api.get({
        url: '/payments',
        data: {
          from,
          to,
          count,
          skip
        }
      }, callback)
    },

    fetch(paymentId, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory')
      }

      return api.get({
        url: `/payments/${paymentId}`
      }, callback)
    },

    capture(paymentId, amount, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory')
      }

      if (!amount) {
        throw new Error('`amount` is mandatory')
      }

      return api.post({
        url: `/payments/${paymentId}/capture`,
        data: {
          amount
        }
      }, callback)
    },

    refund(paymentId, params = {}, callback) {
      let { notes, ...otherParams } = params

      if (!paymentId) {
        throw new Error('`payment_id` is mandatory')
      }

      let data = Object.assign(otherParams, normalizeNotes(notes))
      return api.post({
        url: `/payments/${paymentId}/refund`,
        data
      }, callback)
    },

    transfer(paymentId, params = {}, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory')
      }

      let { notes, ...otherParams } = params

      let data = Object.assign(otherParams, normalizeNotes(notes))
      return api.post({
        url: `/payments/${paymentId}/transfers`,
        data
      }, callback)
    }
  }
}
