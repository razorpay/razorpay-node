'use strict'

const { normalizeDate, normalizeBoolean, normalizeNotes } = require('../utils/razorpay-utils')

module.exports = function (api) {
  return {
    all(params = {}, callback) {
      let { from, to, count, skip, authorized, receipt } = params

      if (from) {
        from = normalizeDate(from)
      }

      if (to) {
        to = normalizeDate(to)
      }

      count = Number(count) || 10
      skip = Number(skip) || 0
      authorized = normalizeBoolean(authorized)

      return api.get({
        url: '/orders',
        data: {
          from,
          to,
          count,
          skip,
          authorized,
          receipt
        }
      }, callback)
    },

    fetch(orderId, callback) {
      if (!orderId) {
        throw new Error('`order_id` is mandatory')
      }

      return api.get({
        url: `/orders/${orderId}`
      }, callback)
    },

    create(params = {}, callback) {
      let { amount, currency, receipt, payment_capture, notes, method,
            ...otherParams } = params
      currency = currency || 'INR'

      if (!(amount || (method === 'emandate' && amount === 0))) {
        throw new Error('`amount` is mandatory')
      }

      let data = Object.assign({
        amount,
        currency,
        receipt,
        method,
        payment_capture: normalizeBoolean(payment_capture),
        ...otherParams
      }, normalizeNotes(notes))

      return api.post({
        url: '/orders',
        data
      }, callback)
    },

    fetchPayments(orderId, callback) {
      if (!orderId) {
        throw new Error('`order_id` is mandatory')
      }

      return api.get({
        url: `/orders/${orderId}/payments`
      }, callback)
    }
  }
}
