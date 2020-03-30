"use strict";
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
            var from = params.from, to = params.to, count = params.count, skip = params.skip, payment_id = params.payment_id, recipient_settlement_id = params.recipient_settlement_id;
            var url = '/transfers';
            if (payment_id) {
                url = "/payments/" + payment_id + "/transfers";
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
                    skip: skip,
                    recipient_settlement_id: recipient_settlement_id,
                }
            }, callback);
        },
        fetch: function (transferId, params, callback) {
            if (params === void 0) { params = {}; }
            var payment_id = params.payment_id;
            if (!transferId) {
                throw new Error('`transfer_id` is mandatory');
            }
            var url = "/transfers/" + transferId;
            return api.get({
                url: url
            }, callback);
        },
        create: function (params, callback) {
            var notes = params.notes, rest = __rest(params, ["notes"]);
            var data = Object.assign(rest, normalizeNotes(notes));
            if (data.on_hold) {
                data.on_hold = normalizeBoolean(data.on_hold);
            }
            return api.post({
                url: '/transfers',
                data: data
            }, callback);
        },
        edit: function (transferId, params, callback) {
            var notes = params.notes, rest = __rest(params, ["notes"]);
            var data = Object.assign(rest, normalizeNotes(notes));
            if (typeof data.on_hold !== "undefined") {
                data.on_hold = normalizeBoolean(data.on_hold);
            }
            return api.patch({
                url: "/transfers/" + transferId,
                data: data
            }, callback);
        },
        reverse: function (transferId, params, callback) {
            if (!transferId) {
                throw new Error('`transfer_id` is mandatory');
            }
            var notes = params.notes, rest = __rest(params, ["notes"]);
            var data = Object.assign(rest, normalizeNotes(notes));
            var url = "/transfers/" + transferId + "/reversals";
            return api.post({
                url: url,
                data: data
            }, callback);
        },
    };
};
