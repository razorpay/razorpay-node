"use strict";

export default function (api) {
  const BASE_URL = "/payments/qr_codes";

  return {
    create(params = {}, callback) {
      /*
       * Creates a QrCode
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let url = BASE_URL;

      return api.post(
        {
          url,
          data: params,
        },
        callback
      );
    },
    all(params = {}, callback) {
      /*
       * Fetch all fund accounts
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let { from, to, count, skip } = params,
        url = BASE_URL;

      return api.get(
        {
          url,
          data: {
            ...params,
            from,
            to,
            count,
            skip,
          },
        },
        callback
      );
    },
    fetchAllPayments(qrCodeId, params = {}, callback) {
      /*
       * Fetch all payment for a qrCode
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let { from, to, count, skip } = params,
        url = `${BASE_URL}/${qrCodeId}/payments`;

      return api.get(
        {
          url,
          data: {
            ...params,
            from,
            to,
            count,
            skip,
          },
        },
        callback
      );
    },
    fetch(qrCodeId, callback) {
      if (!qrCodeId) {
        return Promise.reject("qrCode Id is mandatroy");
      }

      return api.get(
        {
          url: `${BASE_URL}/${qrCodeId}`,
        },
        callback
      );
    },
    close(qrCodeId, callback) {
      if (!qrCodeId) {
        return Promise.reject("qrCode Id is mandatroy");
      }

      let url = `${BASE_URL}/${qrCodeId}/close`;

      return api.post(
        {
          url,
        },
        callback
      );
    },
  };
}
