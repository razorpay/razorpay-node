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
var _a = require('../utils/razorpay-utils'), normalizeDate = _a.normalizeDate, normalizeBoolean = _a.normalizeBoolean, normalizeNotes = _a.normalizeNotes;
module.exports = function (api) {
    return {
        all: function (params, callback) {
            if (params === void 0) { params = {}; }
            var from = params.from, to = params.to, count = params.count, skip = params.skip, authorized = params.authorized, receipt = params.receipt;
            if (from) {
                from = normalizeDate(from);
            }
            if (to) {
                to = normalizeDate(to);
            }
            count = Number(count) || 10;
            skip = Number(skip) || 0;
            authorized = normalizeBoolean(authorized);
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
            if (params === void 0) { params = {}; }
            var amount = params.amount, currency = params.currency, receipt = params.receipt, payment_capture = params.payment_capture, notes = params.notes, method = params.method, otherParams = __rest(params, ["amount", "currency", "receipt", "payment_capture", "notes", "method"]);
            currency = currency || 'INR';
            if (!(amount || (method === 'emandate' && amount === 0))) {
                throw new Error('`amount` is mandatory');
            }
            var data = Object.assign(__assign({ amount: amount,
                currency: currency,
                receipt: receipt,
                method: method, payment_capture: normalizeBoolean(payment_capture) }, otherParams), normalizeNotes(notes));
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
};
