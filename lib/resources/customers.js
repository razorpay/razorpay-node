const { normalizeNotes } = require('../utils/razorpay-utils')

module.exports = api => Object.freeze({

  create(params, callback) {
    const { notes, ...rest } = params;

    return api.post({
      url: '/customers',
      data: Object.assign({}, rest, normalizeNotes(notes))
    }, callback);
  },

  edit(customerId, params, callback) {
    const { notes, ...rest } = params;

    return api.put({
      url: `/customers/${customerId}`,
      data: Object.assign({}, rest, normalizeNotes(notes))
    }, callback);
  },

  fetch(customerId, callback) {
    return api.get({
      url: `/customers/${customerId}`
    }, callback);
  },

  fetchTokens(customerId, callback) {
    return api.get({
      url: `/customers/${customerId}/tokens`,
    }, callback);
  },

  fetchToken(customerId, tokenId, callback) {
    return api.get({
      url: `/customers/${customerId}/tokens/${tokenId}`,
    }, callback);
  },

  deleteToken(customerId, tokenId, callback) {
    return api.delete({
      url: `/customers/${customerId}/tokens/${tokenId}`
    }, callback);
  }

});
