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
var _a = require('../utils/razorpay-utils'), normalizeDate = _a.normalizeDate, normalizeBoolean = _a.normalizeBoolean, normalizeNotes = _a.normalizeNotes;
var ID_REQUIRED_MSG = '`payment_id` is mandatory';
module.exports = function (api) {
    return {
        all: function (params, callback) {
            if (params === void 0) { params = {}; }
            var from = params.from, to = params.to, count = params.count, skip = params.skip;
            if (from) {
                from = normalizeDate(from);
            }
            if (to) {
                to = normalizeDate(to);
            }
            count = Number(count) || 10;
            skip = Number(skip) || 0;
            return api.get({
                url: '/payments',
                data: {
                    from: from,
                    to: to,
                    count: count,
                    skip: skip
                }
            }, callback);
        },
        fetch: function (paymentId, callback) {
            if (!paymentId) {
                throw new Error('`payment_id` is mandatory');
            }
            return api.get({
                url: "/payments/" + paymentId
            }, callback);
        },
        capture: function (paymentId, amount, currency, callback) {
            if (!paymentId) {
                throw new Error('`payment_id` is mandatory');
            }
            if (!amount) {
                throw new Error('`amount` is mandatory');
            }
            var payload = {
                amount: amount,
            };
            /**
             * For backward compatibility,
             * the third argument can be a callback
             * instead of currency.
             * Set accordingly.
             */
            if (typeof currency === 'function' && !callback) {
                callback = currency;
                currency = undefined;
            }
            else if (typeof currency === 'string') {
                payload.currency = currency;
            }
            return api.post({
                url: "/payments/" + paymentId + "/capture",
                data: payload
            }, callback);
        },
        refund: function (paymentId, params, callback) {
            if (params === void 0) { params = {}; }
            var notes = params.notes, otherParams = __rest(params, ["notes"]);
            if (!paymentId) {
                throw new Error('`payment_id` is mandatory');
            }
            var data = Object.assign(otherParams, normalizeNotes(notes));
            return api.post({
                url: "/payments/" + paymentId + "/refund",
                data: data
            }, callback);
        },
        transfer: function (paymentId, params, callback) {
            if (params === void 0) { params = {}; }
            if (!paymentId) {
                throw new Error('`payment_id` is mandatory');
            }
            var notes = params.notes, otherParams = __rest(params, ["notes"]);
            var data = Object.assign(otherParams, normalizeNotes(notes));
            if (data.transfers) {
                var transfers = data.transfers;
                transfers.forEach(function (transfer) {
                    transfer.on_hold = normalizeBoolean(!!transfer.on_hold);
                });
            }
            return api.post({
                url: "/payments/" + paymentId + "/transfers",
                data: data
            }, callback);
        },
        bankTransfer: function (paymentId, callback) {
            if (!paymentId) {
                return Promise.reject(ID_REQUIRED_MSG);
            }
            return api.get({
                url: "/payments/" + paymentId + "/bank_transfer"
            }, callback);
        }
    };
};
