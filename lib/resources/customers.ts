'use strict'

const { normalizeNotes } = require('../utils/razorpay-utils')

module.exports = function (api) {
  return {
    create(params, callback) {
      let { notes, ...rest } = params
      let data = Object.assign(rest, normalizeNotes(notes))

      return api.post({
        url: '/customers',
        data
      }, callback)
    },

    edit(customerId, params, callback) {
      let { notes, ...rest } = params
      let data = Object.assign(rest, normalizeNotes(notes))

      return api.put({
        url: `/customers/${customerId}`,
        data
      }, callback)
    },

    fetch(customerId, callback) {
      return api.get({
        url: `/customers/${customerId}`
      }, callback)
    },

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
