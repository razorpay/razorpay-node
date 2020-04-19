'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
function default_1(api) {
    return {
        all: function (params, callback) {
            var _a = params || {}, from = _a.from, to = _a.to, count = _a.count, skip = _a.skip, authorized = _a.authorized, receipt = _a.receipt;
            if (from) {
                from = razorpay_utils_1.normalizeDate(from);
            }
            if (to) {
                to = razorpay_utils_1.normalizeDate(to);
            }
            count = Number(count) || 10;
            skip = Number(skip) || 0;
            authorized = razorpay_utils_1.normalizeBoolean(authorized);
            return api.get({
                url: '/orders',
                data: {
                    from: from,
                    to: to,
                    count: count,
                    skip: skip,
                    authorized: authorized,
                    receipt: receipt
                }
            }, callback);
        },
        fetch: function (orderId, callback) {
            if (!orderId) {
                throw new Error('`order_id` is mandatory');
            }
            return api.get({
                url: "/orders/" + orderId
            }, callback);
        },
        create: function (params, callback) {
            var _a = params || {}, amount = _a.amount, currency = _a.currency, receipt = _a.receipt, payment_capture = _a.payment_capture, notes = _a.notes, method = _a.method, otherParams = __rest(_a, ["amount", "currency", "receipt", "payment_capture", "notes", "method"]);
            currency = currency || 'INR';
            if (!(amount || (method === 'emandate' && amount === 0))) {
                throw new Error('`amount` is mandatory');
            }
            var data = Object.assign(__assign({ amount: amount,
                currency: currency,
                receipt: receipt,
                method: method, payment_capture: razorpay_utils_1.normalizeBoolean(payment_capture) }, otherParams), razorpay_utils_1.normalizeNotes(notes));
            return api.post({
                url: '/orders',
                data: data
            }, callback);
        },
        fetchPayments: function (orderId, callback) {
            if (!orderId) {
                throw new Error('`order_id` is mandatory');
            }
            return api.get({
                url: "/orders/" + orderId + "/payments"
            }, callback);
        }
    };
}
exports.default = default_1;
