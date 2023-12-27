'use strict';

module.exports = function (api) {

    const BASE_URL = "/disputes";

    return {

        fetch(disputeId, callback) {
            return api.get({
                url: `${BASE_URL}/${disputeId}`,
            }, callback);
        },

        all(params = {}, callback) {
            let { count, skip } = params

            count = Number(count) || 10
            skip = Number(skip) || 0

            return api.get({
                url: `${BASE_URL}`,
                data: {
                  count,
                  skip
                }
            }, callback)
        },

        accept(disputeId, callback) {
            return api.post({
                url: `${BASE_URL}/${disputeId}/accept`,
            }, callback);
        },

        contest(disputeId, param, callback) {
            return api.patch({
                url: `${BASE_URL}/${disputeId}/contest`,
                data: param
            }, callback);
        }
    }
}