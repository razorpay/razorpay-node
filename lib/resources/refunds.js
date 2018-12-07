const { normalizeDate } = require('../utils/razorpay-utils');

const getUrl = (refundId, payment_id) => {
  return (
    `${ ( payment_id && `/payments/${payment_id}` ) || '' }` +
    `/refunds${ ( refundId && `/${refundId}` ) || '' }`
  );
}

module.exports = api => Object.freeze({

  all(params = {}, callback) {

    let { from, to, count, skip } = params;

    to = to && normalizeDate(to);
    from = from && normalizeDate(from);
    count = Number(count) || 10;
    skip = Number(skip) || 0;

    return api.get({
      url: getUrl(null, params.payment_id),
      data: {
        from,
        to,
        count,
        skip
      }
    }, callback);

  },

  fetch(refundId, params = {}, callback) {

    const { payment_id } = params;

    if (typeof refundId === 'undefined' || !refundId) {
      throw new TypeError('The parameter "refundId" is required.');
    }

    return api.get({
      url: getUrl(refundId, payment_id)
    }, callback);

  }

});
