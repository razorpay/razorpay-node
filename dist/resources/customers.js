"use strict";

export default function (api) {
  return {
    create(params, callback) {
      return api.post({
        url: "/customers",
        data: params
      }, callback);
    },
    edit(customerId, params, callback) {
      return api.put({
        url: `/customers/${customerId}`,
        data: params
      }, callback);
    },
    fetch(customerId, callback) {
      return api.get({
        url: `/customers/${customerId}`
      }, callback);
    },
    all(params = {}, callback) {
      let {
        count,
        skip
      } = params;
      count = Number(count) || 10;
      skip = Number(skip) || 0;
      return api.get({
        url: "/customers",
        data: {
          count,
          skip
        }
      }, callback);
    },
    fetchTokens(customerId, callback) {
      return api.get({
        url: `/customers/${customerId}/tokens`
      }, callback);
    },
    fetchToken(customerId, tokenId, callback) {
      return api.get({
        url: `/customers/${customerId}/tokens/${tokenId}`
      }, callback);
    },
    deleteToken(customerId, tokenId, callback) {
      return api.delete({
        url: `/customers/${customerId}/tokens/${tokenId}`
      }, callback);
    }
  };
}