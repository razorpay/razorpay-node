'use strict';

const { normalizeDate } = require('../utils/razorpay-utils')

module.exports = function (api) {

    const BASE_URL = "/accounts";

    return {
        create(params, accountId, callback) {

            let payload = { url: '/webhooks', data: params }

            if (accountId) {
                payload = {
                    version: 'v2',
                    url: `${BASE_URL}/${accountId}/webhooks`,
                    data: params
                }
            }
            return api.post(payload, callback);
        },

        edit(params, webhookId, accountId, callback) {

            if (accountId && webhookId) {
                return api.patch({
                    version: 'v2',
                    url: `${BASE_URL}/${accountId}/webhooks/${webhookId}`,
                    data: params
                }, callback);
            }

            return api.put({
                url: `/webhooks/${webhookId}`,
                data: params
            }, callback);
        },

        all(params={}, accountId, callback) {
            let { from, to, count, skip } = params;

            if (from) {
                from = normalizeDate(from)
            }

            if (to) {
                to = normalizeDate(to)
            }

            count = Number(count) || 10
            skip = Number(skip) || 0

            let data = {...params, from, to, count, skip }

            if (accountId) {
                return api.get({
                    version: 'v2',
                    url: `${BASE_URL}/${accountId}/webhooks/`,
                    data: data
                }, callback);
            }

            return api.get({
                url: `/webhooks`,
                data: data
            }, callback);
        },

        fetch(webhookId, accountId, callback) {
            return api.get({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/webhooks/${webhookId}`
            }, callback);
        },

        delete(webhookId, accountId, callback) {
            return api.delete({
                version: 'v2',
                url: `${BASE_URL}/${accountId}/webhooks/${webhookId}`
            }, callback);
        },
    }
}