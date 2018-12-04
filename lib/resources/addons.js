const BASE_URL = '/addons',
      MISSING_ID_ERROR = 'Addon ID is mandatory';

module.exports = api => {

  return {

    fetch (addonId, callback) {

      if (typeof addonId === 'undefined') {
        return Promise.reject(MISSING_ID_ERROR);
      }

      return api.get({
        url: `${BASE_URL}/${addonId}`
      }, callback);

    },

    delete (addonId, callback) {


      if (typeof addonId === 'undefined') {
        return Promise.reject(MISSING_ID_ERROR);
      }

      return api.delete({
        url: `${BASE_URL}/${addonId}`
      }, callback);

    }

  }

};
