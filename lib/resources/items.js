'use strict'

const { normalizeDate, normalizeBoolean } = require('../utils/razorpay-utils')

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
        url: '/items',
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

    fetch(itemId, callback) {
      if (!itemId) {
        throw new Error('`item_id` is mandatory')
      }

      return api.get({
        url: `/items/${itemId}`
      }, callback)
    },

    create(params = {}, callback) {
      let { amount, currency, description } = params
      currency = currency || 'INR'

      if (!amount) {
        throw new Error('`amount` is mandatory')
      }

      let data = Object.assign({
        amount,
        currency,
        description
      })

      return api.post({
        url: '/items',
        data
      }, callback)
    },
    
    edit(itemId, params = {}, callback) {

      if (!itemId) {
        throw new Error('`item_id` is mandatory')
      }

      return api.patch({
        url: `/items/${itemId}`,
        data : params
      }, callback)
    },

    delete: function _delete(itemId, callback) {
      
      if (!itemId) {
        throw new Error('`item_id` is mandatory');
      }

      return api.delete({
        url: '/items/' + itemId
      }, callback);
    }
  }
}
