'use strict';

module.exports = function (api) {

    const BASE_URL = "/accounts";

    return {
        requestProductConfiguration(accountId, params, callback) {
            return api.post({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/products`,
                data: params
            }, callback);
        },

        edit(accountId, productId, params, callback) {
            return api.patch({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/products/${productId}`,
                data: params
            }, callback);
        },

        fetch(accountId, productId, callback) {
            return api.get({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/products/${productId}`
            }, callback);
        },
        
        fetchTnc(productName, callback) {
            return api.get({
                version: 'v2',
                url: `/products/${productName}/tnc`
            }, callback);
        }
    }
}