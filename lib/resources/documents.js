'use strict';

module.exports = function (api) {

    const BASE_URL = "/documents";

    return {
        create(params, callback) {
            let {file, ...rest}  = params
            return api.postFormData({
                url: `${BASE_URL}`,
                formData: {
                    file: file.value, ...rest
                }
            }, callback);
        },

        fetch(documentId, callback) {
            return api.get({
                url: `${BASE_URL}/${documentId}`,
            }, callback);
        },
    }
}