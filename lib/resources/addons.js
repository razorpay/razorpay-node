const BASE_URL = '/addons';

module.exports = api => Object.freeze({

  fetch(addonId, callback) {

    if (typeof addonId === 'undefined' || !addonId) {
      throw new TypeError('The parameter "addonId" is required for this function.');
    }

    return api.get({
      url: `${BASE_URL}/${addonId}`
    }, callback);

  },

  delete(addonId, callback) {

    if (typeof addonId === 'undefined' || !addonId) {
      throw new TypeError('The parameter "addonId" is required for this function.');
    }

    return api.delete({
      url: `${BASE_URL}/${addonId}`
    }, callback);

  }

});
