'use strict';

const { normalizeNotes } = require('../utils/razorpay-utils')

module.exports = function (api) {

    const BASE_URL = "/accounts";

    return {
        create(accountId, params, callback) {

            if (!accountId) {
                return Promise.reject("Account Id is mandatroy");
            }

            let { relationship, notes, ...rest } = params
            let data = Object.assign(rest, normalizeNotes(notes));

            return api.post({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/stakeholders`,
                data: data
            }, callback);
        },

        edit(accountId, stakeholderId, params, callback) {

            if (!accountId) {
                return Promise.reject("Account Id is mandatroy");
            }

            if (!stakeholderId) {
                return Promise.reject("Stakeholder Id is mandatroy");
            }
            let { notes, ...rest } = params
            let data = Object.assign(rest, normalizeNotes(notes));

            return api.patch({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/stakeholders/${stakeholderId}`,
                data: data
            }, callback);
        },

        fetch(accountId, stakeholderId, callback) {

            if (!accountId) {
                return Promise.reject("Account Id is mandatroy");
            }

            if (!stakeholderId) {
                return Promise.reject("Stakeholder Id is mandatroy");
            }

            return api.get({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/stakeholders/${stakeholderId}`,
            }, callback);
        },

        all(accountId, callback) {

            if (!accountId) {
                return Promise.reject("Account Id is mandatroy");
            }

            return api.get({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/stakeholders`,
            }, callback)
        },

        uploadStakeholderDoc(accountId, stakeholderId, params, callback) {

            if (!accountId) {
                return Promise.reject("Account Id is mandatroy");
            }

            return api.post({
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