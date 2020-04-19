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
Object.defineProperty(exports, "__esModule", { value: true });
var razorpay_utils_1 = require("../utils/razorpay-utils");
;
function default_1(api) {
    return {
        all: function (params, callback) {
            var _a = params || {}, from = _a.from, to = _a.to, count = _a.count, skip = _a.skip, payment_id = _a.payment_id, recipient_settlement_id = _a.recipient_settlement_id;
            var url = '/transfers';
            if (payment_id) {
                url = "/payments/" + payment_id + "/transfers";
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
                    skip: skip,
                    recipient_settlement_id: recipient_settlement_id,
                }
            }, callback);
        },
        fetch: function (transferId, callback) {
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
            var data = Object.assign(rest, razorpay_utils_1.normalizeNotes(notes));
            if (typeof data.on_hold !== "undefined") {
                data.on_hold = razorpay_utils_1.normalizeBoolean(data.on_hold);
            }
            return api.post({
                url: '/transfers',
                data: data
            }, callback);
        },
        edit: function (transferId, params, callback) {
            var notes = params.notes, rest = __rest(params, ["notes"]);
            var data = Object.assign(rest, razorpay_utils_1.normalizeNotes(notes));
            if (typeof data.on_hold !== "undefined") {
                data.on_hold = razorpay_utils_1.normalizeBoolean(data.on_hold);
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
            var data = Object.assign(rest, razorpay_utils_1.normalizeNotes(notes));
            var url = "/transfers/" + transferId + "/reversals";
            return api.post({
                url: url,
                data: data
            }, callback);
        },
    };
}
exports.default = default_1;
