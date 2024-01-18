"use strict";

export default function (api) {
  const BASE_URL = "/settlements";
  return {
    createOndemandSettlement(params = {}, callback) {
      /*
       * Create on-demand settlement
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let url = `${BASE_URL}/ondemand`;
      return api.post({
        url,
        data: params
      }, callback);
    },
    all(params = {}, callback) {
      /*
       * Fetch all settlements
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let {
          from,
          to,
          count,
          skip
        } = params,
        url = BASE_URL;
      return api.get({
        url,
        data: {
          ...params,
          from,
          to,
          count,
          skip
        }
      }, callback);
    },
    fetch(settlementId, callback) {
      /*
       * Fetch a settlement
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!settlementId) {
        return Promise.reject("settlement Id is mandatroy");
      }
      return api.get({
        url: `${BASE_URL}/${settlementId}`
      }, callback);
    },
    fetchOndemandSettlementById: function fetchOndemandSettlementById(settlementId, param = {}, callback) {
      let expand;
      /*
       * Fetch On-demand Settlements by ID
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!settlementId) {
        return Promise.reject("settlment Id is mandatroy");
      }
      if (param.hasOwnProperty("expand[]")) {
        expand = {
          "expand[]": param["expand[]"]
        };
      }
      return api.get({
        url: `${BASE_URL}/ondemand/${settlementId}`,
        data: {
          expand
        }
      }, callback);
    },
    fetchAllOndemandSettlement(params = {}, callback) {
      /*
       * Fetch all demand settlements
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let expand;
      let {
          from,
          to,
          count,
          skip
        } = params,
        url = `${BASE_URL}/ondemand`;
      if (params.hasOwnProperty("expand[]")) {
        expand = {
          "expand[]": params["expand[]"]
        };
      }
      return api.get({
        url,
        data: {
          ...params,
          from,
          to,
          count,
          skip,
          expand
        }
      }, callback);
    },
    reports(params = {}, callback) {
      /*
       * Settlement report for a month
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let {
          day,
          count,
          skip
        } = params,
        url = `${BASE_URL}/recon/combined`;
      return api.get({
        url,
        data: {
          ...params,
          day,
          count,
          skip
        }
      }, callback);
    }
  };
}