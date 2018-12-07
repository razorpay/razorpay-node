const { normalizeDate, normalizeNotes } = require('../utils/razorpay-utils');

const BASE_URL = '/subscriptions';

module.exports = api => Object.freeze({

  create(params = {}, callback) {

    const { notes, ...rest } = params;
    const data = Object.assign({}, rest, normalizeNotes(notes));

    return api.post({
      url: BASE_URL,
      data
    }, callback);

  },

  fetch(subscriptionId, callback) {

    if (typeof subscriptionId === 'undefined' || !subscriptionId) {
      throw new TypeError('The parameter "subscriptionId" is required.');
    }

    return api.get({ url: `${BASE_URL}/${subscriptionId}` }, callback);

  },

  all(params = {}, callback) {

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

  },

  cancel(subscriptionId, cancelAtCycleEnd = false, callback) {

    const url = `${BASE_URL}/${subscriptionId}/cancel`;

    if (typeof subscriptionId === 'undefined' || !subscriptionId) {
      throw new TypeError('The parameter "subscriptionId" is required.');
    }

    if (typeof cancelAtCycleEnd !== 'boolean') {
      throw new TypeError(
        'Expected the second parameter (cancelAtCycleEnd) to be a boolean; ' +
        `got ${typeof cancelAtCycleEnd}`
      );
    }

    return api.post({
      url,
      data: {
        cancel_at_cycle_end: +cancelAtCycleEnd // Why can't we use normalizeBoolean
      }
    }, callback);

  },

  createAddon (subscriptionId, params, callback) {

    if (typeof subscriptionId === 'undefined' || !subscriptionId) {
      throw new TypeError('The parameter "subscriptionId" is required.');
    }

    return api.post({
      url: `${BASE_URL}/${subscriptionId}/addons`,
      data: Object.assign({}, params)
    }, callback);
  }

});
