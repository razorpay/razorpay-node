"use strict";

export default function (api) {
  return {
    create(params, callback) {
      /*
       * Create a Fund Account
       *
       * @param {String} customerId
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      return api.post({
        url: "/fund_accounts",
        data: {
          ...params
        }
      }, callback);
    },
    fetch(customerId, callback) {
      if (!customerId) {
        return Promise.reject("Customer Id is mandatroy");
      }
      return api.get({
        url: `/fund_accounts?customer_id=${customerId}`
      }, callback);
    }
  };
}