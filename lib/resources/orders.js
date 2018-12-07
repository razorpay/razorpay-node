const { normalizeDate, normalizeBoolean, normalizeNotes } = require('../utils/razorpay-utils');

module.exports = api => Object.freeze({

  all(params = {}, callback) {

    let { from, to, count, skip, authorized } = params;
    const { receipt } = params;

    from = from && normalizeDate(from);
    to = to && normalizeDate(to);
    count = Number(count) || 10;
    skip = Number(skip) || 0;
    authorized = normalizeBoolean(authorized);

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
    }, callback);

  },

  fetch(orderId, callback) {

    if (typeof orderId === 'undefined' || !orderId) {
      throw new TypeError('The parameter "orderId" is required for this function.');
    }

    return api.get({
      url: `/orders/${orderId}`
    }, callback);

  },

  create(params, callback) {

    if (typeof params === 'undefined' || !params) {
      throw new TypeError('No parameter envelope was provided.');
    }

    const {
      amount,
      currency,
      receipt,
      payment_capture,
      notes,
      ...otherParams
    } = params;

    if (typeof amount === 'undefined' || !amount) {
      throw new TypeError('The parameter "amount" is required.');
    }

    if (typeof receipt === 'undefined' || !receipt) {
      throw new TypeError('The parameter "receipt" is required.');
    }

    const data = Object.assign({
      amount,
      currency: currency || 'INR',
      receipt,
      payment_capture: normalizeBoolean(payment_capture),
      ...otherParams
    }, normalizeNotes(notes));

    return api.post({
      url: '/orders',
      data
    }, callback);

  },

  fetchPayments(orderId, callback) {

    if (!orderId) {
      throw new TypeError('The parameter "orderId" is required.');
    }

    return api.get({
      url: `/orders/${orderId}/payments`
    }, callback);

  }

});
