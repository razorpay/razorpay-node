const { normalizeDate, normalizeNotes } = require('../utils/razorpay-utils');

const BASE_URL = '/virtual_accounts';

module.exports = api => Object.freeze({

  all(params = {}, callback) {

    let { from, to, count, skip, ...otherParams } = params;

    to = to && normalizeDate(to);
    from = from && normalizeDate(from);
    count = Number(count) || 10;
    skip = Number(skip) || 0;

    return api.get({
      url: BASE_URL,
      data: {
        from,
        to,
        count,
        skip,
        ...otherParams
      }
    }, callback);

  },

  fetch(virtualAccountId, callback) {

    if (typeof virtualAccountId === 'undefined' || !virtualAccountId) {
      throw new TypeError('The parameter "virtualAccountId" is required.');
    }

    return api.get({
      url: `${BASE_URL}/${virtualAccountId}`
    }, callback);

  },

  create(params = {}, callback) {

    const { notes, ...rest } = params;

    return api.post({
      url: BASE_URL,
      data: Object.assign(rest, normalizeNotes(notes))
    }, callback);

  },

  close(virtualAccountId, callback) {

    if (typeof virtualAccountId === 'undefined' || !virtualAccountId) {
      throw new TypeError('The parameter "virtualAccountId" is required.');
    }

    return api.patch({
      url: `${BASE_URL}/${virtualAccountId}`,
      data: {
        status: 'closed'
      }
    }, callback);

  },

  fetchPayments(virtualAccountId, callback) {

    if (typeof virtualAccountId === 'undefined' || !virtualAccountId) {
      throw new TypeError('The parameter "virtualAccountId" is required.');
    }

    return api.get({
      url: `${BASE_URL}/${virtualAccountId}/payments`
    }, callback);

  }

});
