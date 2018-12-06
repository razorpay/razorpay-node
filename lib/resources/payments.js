const { normalizeDate, normalizeBoolean, normalizeNotes } = require('../utils/razorpay-utils');
const ID_REQUIRED_MSG = '`payment_id` is mandatory';

module.exports = api => Object.freeze({

  all(params = {}, callback) {

    let { to, from, count, skip } = params;

    to = to && normalizeDate(to);
    from = from && normalizeDate(from);
    count = Number(count) || 10
    skip = Number(skip) || 0

    return api.get({
      url: '/payments',
      data: {
        from,
        to,
        count,
        skip
      }
    }, callback);

  },

  fetch(paymentId, callback) {

    if (typeof paymentId === 'undefined' || !paymentId) {
      throw new TypeError('The parameter "paymentId" is required for this function.');
    }

    return api.get({
      url: `/payments/${paymentId}`
    }, callback);

  },

  capture(paymentId, amount, callback) {

    if (typeof paymentId === 'undefined' || !paymentId) {
      throw new TypeError('The parameter "paymentId" is required.');
    }

    if (typeof amount === 'undefined' || !amount) {
      throw new TypeError('The parameter "amount" is required.');
    }

    return api.post({
      url: `/payments/${paymentId}/capture`,
      data: {
        amount
      }
    }, callback);

  },

  refund(paymentId, params = {}, callback) {

    const { notes, ...otherParams } = params;

    if (typeof paymentId === 'undefined' || !paymentId) {
      throw new TypeError('The parameter "paymentId" is required.');
    }

    const data = Object.assign({}, otherParams, normalizeNotes(notes));

    return api.post({
      url: `/payments/${paymentId}/refund`,
      data
    }, callback);

  },

  transfer(paymentId, params = {}, callback) {

    if (typeof paymentId === 'undefined' || !paymentId) {
      throw new TypeError('The parameter "paymentId" is required.');
    }

    const { notes, ...otherParams } = params;

    let data = Object.assign({}, otherParams, normalizeNotes(notes));
    let { transfers } = data;

    if (transfers) {

      transfers = transfers.map(transfer => {
        transfer.on_hold = normalizeBoolean(transfer.on_hold); // Why snakecase?
      });

      data = Object.assign(data, transfers);

    }

    return api.post({
      url: `/payments/${paymentId}/transfers`,
      data
    }, callback);

  },

  bankTransfer(paymentId, callback) {

    if (typeof paymentId === 'undefined' || !paymentId) {
      throw new TypeError('The parameter "paymentId" is required.');
    }

    return api.get({
      url: `/payments/${paymentId}/bank_transfer`
    }, callback);

  }

});
