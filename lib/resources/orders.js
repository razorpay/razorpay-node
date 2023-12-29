'use strict'

const { normalizeDate } = require('../utils/razorpay-utils')

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
      authorized = authorized

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
      let { currency, ...otherParams } = params
      currency = currency || 'INR'

      let data = Object.assign({
        currency,
        ...otherParams
      })

      return api.post({
        url: '/orders',
        data
      }, callback)
    },
    
    edit(orderId, params = {}, callback) {
      
      if (!orderId) {
        throw new Error('`order_id` is mandatory')
      }

      return api.patch({
        url: `/orders/${orderId}`,
        data: params
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
    },

    viewRtoReview(orderId, callback) {
      return api.post({
        url: `/orders/${orderId}/rto_review`
      }, callback)
    },
  
    editFulfillment(orderId, param = {}, callback) {
      return api.post({
        url: `/orders/${orderId}/fulfillment`,
        data: param
      })
    }
  }
}
