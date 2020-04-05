'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var razorpay_utils_1 = require("../utils/razorpay-utils");
function default_1(api) {
    return {
        all: function (params, callback) {
            var _a = params || {}, from = _a.from, to = _a.to, count = _a.count, skip = _a.skip, payment_id = _a.payment_id;
            var url = '/refunds';
            if (payment_id) {
                url = "/payments/" + payment_id + "/refunds";
            }
            if (from) {
                from = razorpay_utils_1.normalizeDate(from);
            }
            if (to) {
                to = razorpay_utils_1.normalizeDate(to);
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
            var payment_id = (params || {}).payment_id;
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
}
exports.default = default_1;
