"use strict";
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
var BASE_URL = '/virtual_accounts', ID_REQUIRED_MSG = "`virtual_account_id` is mandatory";
function default_1(api) {
    return {
        all: function (params, callback) {
            var _a = params || {}, from = _a.from, to = _a.to, count = _a.count, skip = _a.skip, otherParams = __rest(_a, ["from", "to", "count", "skip"]);
            var url = BASE_URL;
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
                data: __assign({ from: from,
                    to: to,
                    count: count,
                    skip: skip }, otherParams)
            }, callback);
        },
        fetch: function (virtualAccountId, callback) {
            if (!virtualAccountId) {
                return Promise.reject(ID_REQUIRED_MSG);
            }
            var url = BASE_URL + "/" + virtualAccountId;
            return api.get({
                url: url
            }, callback);
        },
        create: function (params, callback) {
            var _a = params || {}, notes = _a.notes, rest = __rest(_a, ["notes"]);
            var data = Object.assign(rest, razorpay_utils_1.normalizeNotes(notes));
            return api.post({
                url: BASE_URL,
                data: data
            }, callback);
        },
        close: function (virtualAccountId, callback) {
            if (!virtualAccountId) {
                return Promise.reject(ID_REQUIRED_MSG);
            }
            var data = {
                status: 'closed'
            };
            return api.patch({
                url: BASE_URL + "/" + virtualAccountId,
                data: data
            }, callback);
        },
        fetchPayments: function (virtualAccountId, callback) {
            if (!virtualAccountId) {
                return Promise.reject(ID_REQUIRED_MSG);
            }
            var url = BASE_URL + "/" + virtualAccountId + "/payments";
            return api.get({
                url: url
            }, callback);
        }
    };
}
exports.default = default_1;
