'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate;

module.exports = function (api) {

    var BASE_URL = "/accounts";

    return {
        create: function create(params, accountId, callback) {

            var payload = { url: '/webhooks', data: params };

            if (accountId) {
                payload = {
                    version: 'v2',
                    url: BASE_URL + '/' + accountId + '/webhooks',
                    data: params
                };
            }
            return api.post(payload, callback);
        },
        edit: function edit(params, webhookId, accountId, callback) {

            if (accountId && webhookId) {
                return api.patch({
                    version: 'v2',
                    url: BASE_URL + '/' + accountId + '/webhooks/' + webhookId,
                    data: params
                }, callback);
            }

            return api.put({
                url: '/webhooks/' + webhookId,
                data: params
            }, callback);
        },
        all: function all() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var accountId = arguments[1];
            var callback = arguments[2];
            var from = params.from,
                to = params.to,
                count = params.count,
                skip = params.skip;


            if (from) {
                from = normalizeDate(from);
            }

            if (to) {
                to = normalizeDate(to);
            }

            count = Number(count) || 10;
            skip = Number(skip) || 0;

            var data = _extends({}, params, { from: from, to: to, count: count, skip: skip });

            if (accountId) {
                return api.get({
                    version: 'v2',
                    url: BASE_URL + '/' + accountId + '/webhooks/',
                    data: data
                }, callback);
            }

            return api.get({
                url: '/webhooks',
                data: data
            }, callback);
        },
        fetch: function fetch(webhookId, accountId, callback) {
            return api.get({
                version: 'v2',
                url: BASE_URL + '/' + accountId + '/webhooks/' + webhookId
            }, callback);
        },
        delete: function _delete(webhookId, accountId, callback) {
            return api.delete({
                version: 'v2',
                url: BASE_URL + '/' + accountId + '/webhooks/' + webhookId
            }, callback);
        }
    };
};