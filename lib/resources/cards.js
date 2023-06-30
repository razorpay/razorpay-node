'use strict'

module.exports = function (api) {
  return {
 
    fetch(itemId, callback) {
      if (!itemId) {
        throw new Error('`card_id` is mandatory')
      }

      return api.get({
        url: `/cards/${itemId}`
      }, callback)
    },

    requestCardReference(params, callback) {
      return api.post({
        url: `/cards/fingerprints`,
        data: params
      }, callback)
    }
  }
}
