'use strict'

const { normalizeDate, normalizeBoolean, normalizeNotes } = require('../utils/razorpay-utils')

module.exports = function (api) {
  return {
    all(params = {}, callback) {
      let { from, to, count, skip, authorized, receipt } = params
      let expand ;

      if (from) {
        from = normalizeDate(from)
      }

      if (to) {
        to = normalizeDate(to)
      }

      if(params.hasOwnProperty("expand[]")) {
        expand = { "expand[]" : params["expand[]"] }
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
          receipt,
          expand
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
      let isNotForm = false
      let { amount, currency, receipt, partial_payment,payment_capture, notes, method,
            ...otherParams } = params
      currency = currency || 'INR'

      if(params.hasOwnProperty("first_payment_min_amount")){
         isNotForm = true
      }      

      let data = Object.assign({
        amount,
        currency,
        receipt,
        method,
        partial_payment: normalizeBoolean(partial_payment),
        payment_capture: normalizeBoolean(payment_capture),
        ...otherParams
      }, normalizeNotes(notes))

      return api.post({
        url: '/orders',
        data
      }, callback, isNotForm)
    },
    
    edit(orderId, params = {}, callback) {
      let { notes } = params
      
      if (!orderId) {
        throw new Error('`order_id` is mandatory')
      }

      let data = Object.assign(normalizeNotes(notes))

      return api.patch({
        url: `/orders/${orderId}`,
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
    },

    fetchTransferOrder(orderId,callback) {
      if (!orderId) {
        throw new Error('`order_id` is mandatory')
      }

      return api.get({
        url: `/orders/${orderId}/?expand[]=transfers&status`
      }, callback)
    }
  }
}
