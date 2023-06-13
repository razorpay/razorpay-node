'use strict';

const { normalizeNotes } = require('../utils/razorpay-utils')

module.exports = function (api) {

    const BASE_URL = "/accounts";

    return {
        create(params, callback) {
            let { notes, ...rest } = params
            let data = Object.assign(rest, normalizeNotes(notes));

            return api.post({
                version: 'v2',
                url: `${BASE_URL}`,
                data: data
            }, callback);
        },

        edit(accountId, params, callback) {
            let { notes, ...rest } = params
            let data = Object.assign(rest, normalizeNotes(notes));

            return api.patch({
                version: 'v2',
                url: `${BASE_URL}/${accountId}`,
                data: data
            }, callback);
        },

        fetch(accountId, callback) {
            return api.get({
                version: 'v2',
                url: `${BASE_URL}/${accountId}`,
            }, callback);
        },

        delete(accountId, callback) {
            return api.delete({
                version: 'v2',
                url: `${BASE_URL}/${accountId}`,
            }, callback);
        },

        uploadAccountDoc(accountId, params, callback) {

            if (!accountId) {
                return Promise.reject("Account Id is mandatroy");
            }

            return api.post({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/documents`,
                formData: params
            }, callback);
        },
       
        fetchAccountDoc(accountId, callback) {
            return api.get({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/documents`,
            }, callback);
        }
    }
}