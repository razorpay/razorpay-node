const { normalizeDate, normalizeNotes } = require('../utils/razorpay-utils');
const BASE_URL = '/plans';

module.exports = api => Object.freeze({

  create(params, callback)  {

    if (typeof params === 'undefined' || !params) {
      throw new TypeError('Missing parameter envelope.');
    }

    const { notes, ...rest } = params;
    const data = Object.assign({}, rest, normalizeNotes(notes));

     return api.post({
       url: BASE_URL,
       data
     }, callback);

  },

  fetch(planId, callback) {

    if (typeof planId === 'undefined' || !planId) {
      throw new TypeError('The parameter "planId" is required.');
    }

    return api.get({url: `${BASE_URL}/${planId}`}, callback);

  },

  all(params, callback) {

    if (typeof params === 'undefined' || !params) {
      throw new TypeError('Missing parameter envelope.');
    }

    let { from, to, count, skip } = params;

    to = to && normalizeDate(to);
    from = from && normalizeDate(from);
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

  }

});
