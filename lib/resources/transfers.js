const { normalizeDate, normalizeBoolean, normalizeNotes } = require('../utils/razorpay-utils');

const getUrl = (transferId, payment_id) => {
  return (
    `${ ( payment_id && `/payments/${payment_id}` ) || '' }` +
    `/transfers${ ( transferId && `/${transferId}` ) || '' }`
  );
}

module.exports = api => Object.freeze({

  all(params = {}, callback) {

    let { from, to, count, skip, payment_id } = params;

    to = to && normalizeDate(to);
    from = from && normalizeDate(from);
    count = Number(count) || 10;
    skip = Number(skip) || 0;

    return api.get({
      url: getUrl(null, payment_id),
      data: {
        from,
        to,
        count,
        skip
      }
    }, callback);

  },

  fetch(transferId, callback) {

    if (typeof transferId === 'undefined' || !transferId) {
      throw new TypeError('The parameter "transferId" is required.');
    }

    return api.get({
      url: `/transfers/${transferId}`
    }, callback);

  },

  create({ notes, ...rest }, callback) {

    const data = Object.assign({}, rest, normalizeNotes(notes));

    if (typeof data.on_hold !== 'undefined') {
      data.on_hold = normalizeBoolean(data.on_hold);
    }

    return api.post({
      url: '/transfers',
      data
    }, callback);

  },

  edit(transferId, { notes, ...rest }, callback) {

    const data = Object.assign(rest, normalizeNotes(notes))

    if (typeof data.on_hold !== "undefined") {
      data.on_hold = normalizeBoolean(data.on_hold);
    }

    return api.patch({
      url: `/transfers/${transferId}`,
      data
    }, callback);

  },

  reverse(transferId, { notes, ...rest }, callback) {

    if (typeof transferId === 'undefined' || !transferId) {
      throw new TypeError('The parameter "transferId" is required.');
    }

    return api.post({
      url: `/transfers/${transferId}/reversals`,
      data: Object.assign(rest, normalizeNotes(notes))
    }, callback);
    
  }

});
