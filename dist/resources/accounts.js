'use strict';

module.exports = function (api) {

    var BASE_URL = "/accounts";

    return {
        create: function create(params, callback) {
            return api.post({
                version: 'v2',
                url: '' + BASE_URL,
                data: params
            }, callback);
        },
        edit: function edit(accountId, params, callback) {
            return api.patch({
                version: 'v2',
                url: BASE_URL + '/' + accountId,
                data: params
            }, callback);
        },
        fetch: function fetch(accountId, callback) {
            return api.get({
                version: 'v2',
                url: BASE_URL + '/' + accountId
            }, callback);
        },
        delete: function _delete(accountId, callback) {
            return api.delete({
                version: 'v2',
                url: BASE_URL + '/' + accountId
            }, callback);
        },
        uploadAccountDoc: function uploadAccountDoc(accountId, params, callback) {
            return api.postFormData({
                version: 'v2',
                url: BASE_URL + '/' + accountId + '/documents',
                formData: params
            }, callback);
        },
        fetchAccountDoc: function fetchAccountDoc(accountId, callback) {
            return api.get({
                version: 'v2',
                url: BASE_URL + '/' + accountId + '/documents'
            }, callback);
        }
    };
};