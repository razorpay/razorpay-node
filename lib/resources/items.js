'use strict'

const { normalizeDate, normalizeBoolean } = require('../utils/razorpay-utils')

module.exports = function (api) {
  return {
    all(params = {}, callback) {
      let { from, to, count, skip, active } = params

      if (from) {
        from = normalizeDate(from)
      }

      if (to) {
        to = normalizeDate(to)
      }

      count = Number(count) || 10
      skip = Number(skip) || 0
      active = normalizeBoolean(active)

      return api.get({
        url: '/items',
        data: {
          from,
          to,
          count,
          skip,
          active
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
      let { amount, currency , ...rest } = params
      currency = currency || 'INR'

      if (!amount) {
        throw new Error('`amount` is mandatory')
      }

      let data = Object.assign({
        currency,
        amount,
        ...rest
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
      
      let url = `/items/${itemId}`;
      return api.patch({
        url,
        data: params
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
