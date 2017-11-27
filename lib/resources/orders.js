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
      let { amount, currency, receipt, payment_capture, notes,
            bank, method, account_number } = params
      currency = currency || 'INR'

      if (!amount) {
        throw new Error('`amount` is mandatory')
      }

      if (!receipt) {
        throw new Error('`receipt` is mandatory')
      }

      let data = Object.assign({
        amount,
        currency,
        receipt,
        payment_capture: normalizeBoolean(payment_capture),
        ...(!!bank && {bank}),
        ...(!!method && {method}),
        ...(!!account_number && {account_number})
      }, normalizeNotes(notes))

      console.log(data);

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
