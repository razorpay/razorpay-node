'use strict';

module.exports = function (api) {

    const BASE_URL = "/documents";

    return {
        create(params, callback) {
            return api.postFormData({
                url: `${BASE_URL}`,
                formData: params
            }, callback);
        },

        fetch(documentId, callback) {
            return api.get({
                url: `${BASE_URL}/${documentId}`,
            }, callback);
        },
    }
}