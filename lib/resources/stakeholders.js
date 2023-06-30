'use strict';

const { normalizeNotes, normalizeBoolean } = require('../utils/razorpay-utils')

module.exports = function (api) {

    const BASE_URL = "/accounts";

    return {
        create(accountId, params, callback) {

            let { relationship, notes, ...rest } = params
            
            if(params.hasOwnProperty('relationship')){
                if(params.relationship.hasOwnProperty('executive')){
                    relationship.executive = normalizeBoolean(params.relationship.executive)
                }

                if(params.relationship.hasOwnProperty('director')){
                    relationship.director = normalizeBoolean(params.relationship.director)
                }
            }

            let data = Object.assign({relationship: relationship}, normalizeNotes(notes), rest);

            return api.post({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/stakeholders`,
                data: data
            }, callback);
        },

        edit(accountId, stakeholderId, params, callback) {
            let { notes, relationship, ...rest } = params

            if(params.hasOwnProperty('relationship')){
                if(params.relationship.hasOwnProperty('executive')){
                    relationship.executive = normalizeBoolean(params.relationship.executive)
                }

                if(params.relationship.hasOwnProperty('director')){
                    relationship.director = normalizeBoolean(params.relationship.director)
                }
            }

            let data = Object.assign({relationship: relationship}, normalizeNotes(notes), rest);

            return api.patch({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/stakeholders/${stakeholderId}`,
                data: data
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