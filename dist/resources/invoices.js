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
/*
 * DOCS: https://razorpay.com/docs/invoices/
 */
var razorpay_utils_1 = require("../utils/razorpay-utils");
function invoicesApi(api) {
    var BASE_URL = "/invoices", MISSING_ID_ERROR = "Invoice ID is mandatory";
    /**
     * Invoice entity gets used for both Payment Links and Invoices system.
     * Few of the methods are only meaningful for Invoices system and
     * calling those for against/for a Payment Link would throw
     * Bad request error.
     */
    return {
        create: function (params, callback) {
            /*
             * Creates invoice of any type(invoice|link|ecod).
             *
             * @param {Object} params
             * @param {Function} callback
             *
             * @return {Promise}
             */
            var url = BASE_URL, _a = params || {}, notes = _a.notes, rest = __rest(_a, ["notes"]), data = Object.assign(rest, razorpay_utils_1.normalizeNotes(notes));
            return api.post({
                url: url,
                data: data
            }, callback);
        },
        edit: function (invoiceId, params, callback) {
            /*
             * Patches given invoice with new attributes
             *
             * @param {String} invoiceId
             * @param {Object} params
             * @param {Function} callback
             *
             * @return {Promise}
             */
            var url = BASE_URL + "/" + invoiceId, _a = params || {}, notes = _a.notes, rest = __rest(_a, ["notes"]), data = Object.assign(rest, razorpay_utils_1.normalizeNotes(notes));
            if (!invoiceId) {
                return Promise.reject("Invoice ID is mandatory");
            }
            return api.patch({
                url: url,
                data: data
            }, callback);
        },
        issue: function (invoiceId, callback) {
            /*
             * Issues drafted invoice
             *
             * @param {String} invoiceId
             * @param {Function} callback
             *
             * @return {Promise}
             */
            if (!invoiceId) {
                return Promise.reject(MISSING_ID_ERROR);
            }
            var url = BASE_URL + "/" + invoiceId + "/issue";
            return api.post({
                url: url
            }, callback);
        },
        delete: function (invoiceId, callback) {
            /*
             * Deletes drafted invoice
             *
             * @param {String} invoiceId
             * @param {Function} callback
             *
             * @return {Promise}
             */
            if (!invoiceId) {
                return Promise.reject(MISSING_ID_ERROR);
            }
            var url = BASE_URL + "/" + invoiceId;
            return api.delete({
                url: url
            }, callback);
        },
        cancel: function (invoiceId, callback) {
            /*
             * Cancels issued invoice
             *
             * @param {String} invoiceId
             * @param {Function} callback
             *
             * @return {Promise}
             */
            if (!invoiceId) {
                return Promise.reject(MISSING_ID_ERROR);
            }
            var url = BASE_URL + "/" + invoiceId + "/cancel";
            return api.post({
                url: url
            }, callback);
        },
        fetch: function (invoiceId, callback) {
            /*
             * Fetches invoice entity with given id
             *
             * @param {String} invoiceId
             * @param {Function} callback
             *
             * @return {Promise}
             */
            if (!invoiceId) {
                return Promise.reject(MISSING_ID_ERROR);
            }
            var url = BASE_URL + "/" + invoiceId;
            return api.get({
                url: url
            }, callback);
        },
        all: function (params, callback) {
            /*
             * Fetches multiple invoices with given query options
             *
             * @param {Object} invoiceId
             * @param {Function} callback
             *
             * @return {Promise}
             */
            var _a = params || {}, from = _a.from, to = _a.to, count = _a.count, skip = _a.skip, url = BASE_URL;
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
                data: __assign(__assign({}, params), { from: from,
                    to: to,
                    count: count,
                    skip: skip })
            }, callback);
        },
        notifyBy: function (invoiceId, medium, callback) {
            /*
             * Send/re-send notification for invoice by given medium
             *
             * @param {String} invoiceId
             * @param {String} medium
             * @param {Function} callback
             *
             * @return {Promise}
             */
            if (!invoiceId) {
                return Promise.reject(MISSING_ID_ERROR);
            }
            if (!medium) {
                return Promise.reject("`medium` is required");
            }
            var url = BASE_URL + "/" + invoiceId + "/notify_by/" + medium;
            return api.post({
                url: url
            }, callback);
        }
    };
}
exports.default = invoicesApi;
;
