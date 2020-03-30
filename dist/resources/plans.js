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
/*
 * DOCS: https://razorpay.com/docs/subscriptions/api/
 */
var _a = require('../utils/razorpay-utils'), normalizeDate = _a.normalizeDate, normalizeNotes = _a.normalizeNotes;
module.exports = function plansApi(api) {
    var BASE_URL = "/plans", MISSING_ID_ERROR = "Plan ID is mandatory";
    return {
        create: function (params, callback) {
            /*
             * Creates a plan
             *
             * @param {Object} params
             * @param {Function} callback
             *
             * @return {Promise}
             */
            if (params === void 0) { params = {}; }
            var url = BASE_URL, notes = params.notes, rest = __rest(params, ["notes"]), data = Object.assign(rest, normalizeNotes(notes));
            return api.post({
                url: url,
                data: data
            }, callback);
        },
        fetch: function (planId, callback) {
            /*
             * Fetches a plan given Plan ID
             *
             * @param {String} planId
             * @param {Function} callback
             *
             * @return {Promise}
             */
            if (!planId) {
                return Promise.reject(MISSING_ID_ERROR);
            }
            var url = BASE_URL + "/" + planId;
            return api.get({ url: url }, callback);
        },
        all: function (params, callback) {
            /*
             * Get all Plans
             *
             * @param {Object} params
             * @param {Funtion} callback
             *
             * @return {Promise}
             */
            if (params === void 0) { params = {}; }
            var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
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
                data: __assign(__assign({}, params), { from: from,
                    to: to,
                    count: count,
                    skip: skip })
            }, callback);
        }
    };
};
