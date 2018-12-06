const { normalizeDate, normalizeNotes } = require('../utils/razorpay-utils');
const BASE_URL = '/invoices';

module.exports = api => Object.freeze({

  create(params, callback) {

    const { notes, ...rest } = params;
    const data = Object.assign({}, rest, normalizeNotes(notes));

    return api.post({
      url: BASE_URL,
      data
    }, callback);

  },

  edit(invoiceId, params = {}, callback) {

    const { notes, ...rest } = params;
    const data = Object.assign({}, rest, normalizeNotes(notes));

    if (typeof invoiceId === 'undefined' || !invoiceId) {
      throw new TypeError('The parameter "invoiceId" is required for this function.');
    }

    return api.patch({
      url: `${BASE_URL}/${invoiceId}`,
      data
    }, callback);

  },

  issue(invoiceId, callback) {

    if (typeof invoiceId === 'undefined' || !invoiceId) {
      throw new TypeError('The parameter "invoiceId" is required for this function.');
    }

    return api.post({
      url: `${BASE_URL}/${invoiceId}/issue`
    }, callback);

  },

  delete(invoiceId, callback) {

    if (typeof invoiceId === 'undefined' || !invoiceId) {
      throw new TypeError('The parameter "invoiceId" is required for this function.');
    }

    return api.delete({
      url: `${BASE_URL}/${invoiceId}`
    }, callback);

  },

  cancel(invoiceId, callback) {

    if (typeof invoiceId === 'undefined' || !invoiceId) {
      throw new TypeError('The parameter "invoiceId" is required for this function.');
    }

    return api.post({
      url: `${BASE_URL}/${invoiceId}/cancel`
    }, callback);

  },

  fetch(invoiceId, callback) {

    if (typeof invoiceId === 'undefined' || !invoiceId) {
      throw new TypeError('The parameter "invoiceId" is required for this function.');
    }

    return api.get({
      url: `${BASE_URL}/${invoiceId}`
    }, callback);
  },

  all(params, callback) {

    if (typeof params === 'undefined' || !params) {
      throw new TypeError('Missing parameter envelope.');
    }

    let { from, to, count, skip } = params;

    from = from && normalizeDate(from);
    to = to && normalizeDate(to);
    count = Number(count) || 10;
    skip = Number(skip) || 0;

    return api.get({
      url: BASE_URL,
      data: {
        ...params,
        from,
        to,
        count,
        skip
      }
    }, callback);

  },

  notifyBy (invoiceId, medium, callback) {

    if (typeof invoiceId === 'undefined' || !invoiceId) {
      throw new TypeError('The parameter "invoiceId" is required for this function.');
    }

    if (typeof medium === 'undefined' || !medium) {
      throw new TypeError('The parameter "medium" is required for this function.');
    }

    return api.post({
      url: `${BASE_URL}/${invoiceId}/notify_by/${medium}`
    }, callback);

  }

});
