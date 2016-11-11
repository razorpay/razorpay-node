'use strict'

const { normalizeNotes } = require('../utils/razorpay-utils')

module.exports = function (api) {
  return {
    create(params, callback) {
      return api.post({
        url: '/customers',
        data: params
      }, callback)
    }

    edit(customerId, params, callback) {
      return api.put({
        url: `/customers/${customerId}`,
        data: params
      }, callback)
    }

    fetch(customerId, callback) {
      return api.get({
        url: `/customers/${customerId}`
      }, callback)
    },

    delete(customerId, callback) {
      return api.delete({
        url: `/customers/${customerId}`
      }, callback)
    }

    fetchTokens(customerId, callback) {
      return api.get({
        url: `/customers/${customerId}/tokens`,
      }, callback)
    },

    fetchToken(customerId, tokenId, callback) {
      return api.get({
        url: `/customers/${customerId}/tokens/${tokenId}`,
      }, callback)
    },

    deleteToken(customerId, tokenId, callback) {
      return api.delete({
        url: `/customers/${customerId}/tokens/${tokenId}`
      }, callback)
    }
  }
}
