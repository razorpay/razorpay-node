'use strict';

var _require = require('../utils/razorpay-utils'),
    normalizeNotes = _require.normalizeNotes;

module.exports = function (api) {

    var BASE_URL = "/tokens";

    return {
        create: function create(params, callback) {
            return api.post({
                url: '' + BASE_URL,
                data: params
            }, callback);
        },
        fetch: function fetch(params, callback) {
            return api.post({
                url: BASE_URL + '/fetch',
                data: params
            }, callback);
        },
        delete: function _delete(params, callback) {
            return api.post({
                url: BASE_URL + '/delete',
                data: params
            }, callback);
        },
        processPaymentOnAlternatePAorPG: function processPaymentOnAlternatePAorPG(params, callback) {
            return api.post({
                url: BASE_URL + '/service_provider_tokens/token_transactional_data',
                data: params
            }, callback);
        }
    };
};