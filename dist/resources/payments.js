'use strict';
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var razorpay_utils_1 = require("../utils/razorpay-utils");
var ID_REQUIRED_MSG = '`payment_id` is mandatory';
function default_1(api) {
    return {
        all: function (params, callback) {
            var _a = params || {}, from = _a.from, to = _a.to, count = _a.count, skip = _a.skip;
            if (from) {
                from = razorpay_utils_1.normalizeDate(from);
            }
            if (to) {
                to = razorpay_utils_1.normalizeDate(to);
            }
            count = Number(count) || 10;
            skip = Number(skip) || 0;
            return api.get({
                url: "/payments",
                data: {
                    from: from,
                    to: to,
                    count: count,
                    skip: skip,
                },
            }, callback);
        },
        fetch: function (paymentId, callback) {
            if (!paymentId) {
                throw new Error("`payment_id` is mandatory");
            }
            return api.get({
                url: "/payments/" + paymentId,
            }, callback);
        },
        capture: function (paymentId, amount, currency, callback) {
            if (!paymentId) {
                throw new Error("`payment_id` is mandatory");
            }
            if (!amount) {
                throw new Error("`amount` is mandatory");
            }
            var payload = {
                amount: amount,
                currency: currency,
            };
            return api.post({
                url: "/payments/" + paymentId + "/capture",
                data: payload,
            }, callback);
        },
        refund: function (paymentId, params, callback) {
            var _a = params || {}, notes = _a.notes, otherParams = __rest(_a, ["notes"]);
            if (!paymentId) {
                throw new Error("`payment_id` is mandatory");
            }
            var data = Object.assign(otherParams, razorpay_utils_1.normalizeNotes(notes));
            return api.post({
                url: "/payments/" + paymentId + "/refund",
                data: data,
            }, callback);
        },
        transfer: function (paymentId, params, callback) {
            if (!paymentId) {
                throw new Error("`payment_id` is mandatory");
            }
            var _a = params || {}, notes = _a.notes, otherParams = __rest(_a, ["notes"]);
            var data = Object.assign(otherParams, razorpay_utils_1.normalizeNotes(notes));
            if (data.transfers) {
                var transfers = data.transfers;
                transfers.forEach(function (transfer) {
                    transfer.on_hold = razorpay_utils_1.normalizeBoolean(!!transfer.on_hold);
                });
            }
            return api.post({
                url: "/payments/" + paymentId + "/transfers",
                data: data,
            }, callback);
        },
        bankTransfer: function (paymentId, callback) {
            if (!paymentId) {
                return Promise.reject(ID_REQUIRED_MSG);
            }
            return api.get({
                url: "/payments/" + paymentId + "/bank_transfer",
            }, callback);
        },
    };
}
exports.default = default_1;
