"use strict";

export default function (api) {
  const BASE_URL = "/accounts";
  return {
    create(params, callback) {
      return api.post({
        version: "v2",
        url: `${BASE_URL}`,
        data: params
      }, callback);
    },
    edit(accountId, params, callback) {
      return api.patch({
        version: "v2",
        url: `${BASE_URL}/${accountId}`,
        data: params
      }, callback);
    },
    fetch(accountId, callback) {
      return api.get({
        version: "v2",
        url: `${BASE_URL}/${accountId}`
      }, callback);
    },
    delete(accountId, callback) {
      return api.delete({
        version: "v2",
        url: `${BASE_URL}/${accountId}`
      }, callback);
    },
    uploadAccountDoc(accountId, params, callback) {
      return api.postFormData({
        version: "v2",
        url: `${BASE_URL}/${accountId}/documents`,
        formData: params
      }, callback);
    },
    fetchAccountDoc(accountId, callback) {
      return api.get({
        version: "v2",
        url: `${BASE_URL}/${accountId}/documents`
      }, callback);
    }
  };
}