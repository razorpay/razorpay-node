'use strict';

const { normalizeNotes } = require('../utils/razorpay-utils')

module.exports = function (api) {

    const BASE_URL = "/tokens";

    return {
        create(params, callback) {
            let { notes, ...rest } = params
            let data = Object.assign(rest, normalizeNotes(notes));

            return api.post({
                url: `${BASE_URL}`,
                data: data
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
    }
}