'use strict';

module.exports = function (api) {

    const BASE_URL = "/accounts";

    return {
        create(accountId, params, callback) {
            return api.post({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/stakeholders`,
                data: params
            }, callback);
        },

        edit(accountId, stakeholderId, params, callback) {
            return api.patch({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/stakeholders/${stakeholderId}`,
                data: params
            }, callback);
        },

        fetch(accountId, stakeholderId, callback) {
            return api.get({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/stakeholders/${stakeholderId}`,
            }, callback);
        },

        all(accountId, callback) {
            return api.get({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/stakeholders`,
            }, callback)
        },

        uploadStakeholderDoc(accountId, stakeholderId, params, callback) {
            return api.postFormData({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/stakeholders/${stakeholderId}/documents`,
                formData: params
            }, callback);
        },

        fetchStakeholderDoc(accountId, stakeholderId, callback) {
            return api.get({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/stakeholders/${stakeholderId}/documents`,
            }, callback);
        }
    }
}