'use strict';

module.exports = function (api) {

    var BASE_URL = "/accounts";

    return {
        create: function create(accountId, params, callback) {
            return api.post({
                version: 'v2',
                url: BASE_URL + '/' + accountId + '/stakeholders',
                data: params
            }, callback);
        },
        edit: function edit(accountId, stakeholderId, params, callback) {
            return api.patch({
                version: 'v2',
                url: BASE_URL + '/' + accountId + '/stakeholders/' + stakeholderId,
                data: params
            }, callback);
        },
        fetch: function fetch(accountId, stakeholderId, callback) {
            return api.get({
                version: 'v2',
                url: BASE_URL + '/' + accountId + '/stakeholders/' + stakeholderId
            }, callback);
        },
        all: function all(accountId, callback) {
            return api.get({
                version: 'v2',
                url: BASE_URL + '/' + accountId + '/stakeholders'
            }, callback);
        },
        uploadStakeholderDoc: function uploadStakeholderDoc(accountId, stakeholderId, params, callback) {
            return api.postFormData({
                version: 'v2',
                url: BASE_URL + '/' + accountId + '/stakeholders/' + stakeholderId + '/documents',
                formData: params
            }, callback);
        },
        fetchStakeholderDoc: function fetchStakeholderDoc(accountId, stakeholderId, callback) {
            return api.get({
                version: 'v2',
                url: BASE_URL + '/' + accountId + '/stakeholders/' + stakeholderId + '/documents'
            }, callback);
        }
    };
};