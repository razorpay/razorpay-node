"use strict";

export default function (api) {
  const BASE_URL = "/tokens";
  return {
    create(params, callback) {
      return api.post({
        url: `${BASE_URL}`,
        data: params
      }, callback);
    },
    fetch(params, callback) {
      return api.post({
        url: `${BASE_URL}/fetch`,
        data: params
      }, callback);
    },
    delete(params, callback) {
      return api.post({
        url: `${BASE_URL}/delete`,
        data: params
      }, callback);
    },
    processPaymentOnAlternatePAorPG(params, callback) {
      return api.post({
        url: `${BASE_URL}/service_provider_tokens/token_transactional_data`,
        data: params
      }, callback);
    }
  };
}