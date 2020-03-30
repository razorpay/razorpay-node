"use strict";
/*
 * DOCS: https://razorpay.com/docs/subscriptions/api/
 */
module.exports = function (api) {
    var BASE_URL = "/addons", MISSING_ID_ERROR = "Addon ID is mandatory";
    return {
        fetch: function (addonId, callback) {
            /*
             * Fetches addon given addon id
             * @param {String} addonId
             * @param {Function} callback
             *
             * @return {Promise}
             */
            if (!addonId) {
                return Promise.reject(MISSING_ID_ERROR);
            }
            var url = BASE_URL + "/" + addonId;
            return api.get({
                url: url
            }, callback);
        },
        delete: function (addonId, callback) {
            /*
             * Deletes addon given addon id
             * @param {String} addonId
             * @param {Function} callback
             *
             * @return {Promise}
             */
            if (!addonId) {
                return Promise.reject(MISSING_ID_ERROR);
            }
            var url = BASE_URL + "/" + addonId;
            return api.delete({
                url: url
            }, callback);
        }
    };
};
