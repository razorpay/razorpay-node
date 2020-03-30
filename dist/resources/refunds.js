'use strict';
var normalizeDate = require('../utils/razorpay-utils').normalizeDate;
module.exports = function (api) {
    return {
        all: function (params, callback) {
            if (params === void 0) { params = {}; }
            var from = params.from, to = params.to, count = params.count, skip = params.skip, payment_id = params.payment_id;
            var url = '/refunds';
            if (payment_id) {
                url = "/payments/" + payment_id + "/refunds";
            }
            if (from) {
                from = normalizeDate(from);
            }
            if (to) {
                to = normalizeDate(to);
            }
            count = Number(count) || 10;
            skip = Number(skip) || 0;
            return api.get({
                url: url,
                data: {
                    from: from,
                    to: to,
                    count: count,
                    skip: skip
                }
            }, callback);
        },
        fetch: function (refundId, params, callback) {
            if (params === void 0) { params = {}; }
            var payment_id = params.payment_id;
            if (!refundId) {
                throw new Error('`refund_id` is mandatory');
            }
            var url = "/refunds/" + refundId;
            if (payment_id) {
                url = "/payments/" + payment_id + url;
            }
            return api.get({
                url: url
            }, callback);
        }
    };
};
