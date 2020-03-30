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
var normalizeNotes = require('../utils/razorpay-utils').normalizeNotes;
module.exports = function (api) {
    return {
        create: function (params, callback) {
            var notes = params.notes, rest = __rest(params, ["notes"]);
            var data = Object.assign(rest, normalizeNotes(notes));
            return api.post({
                url: '/customers',
                data: data
            }, callback);
        },
        edit: function (customerId, params, callback) {
            var notes = params.notes, rest = __rest(params, ["notes"]);
            var data = Object.assign(rest, normalizeNotes(notes));
            return api.put({
                url: "/customers/" + customerId,
                data: data
            }, callback);
        },
        fetch: function (customerId, callback) {
            return api.get({
                url: "/customers/" + customerId
            }, callback);
        },
        fetchTokens: function (customerId, callback) {
            return api.get({
                url: "/customers/" + customerId + "/tokens",
            }, callback);
        },
        fetchToken: function (customerId, tokenId, callback) {
            return api.get({
                url: "/customers/" + customerId + "/tokens/" + tokenId,
            }, callback);
        },
        deleteToken: function (customerId, tokenId, callback) {
            return api.delete({
                url: "/customers/" + customerId + "/tokens/" + tokenId
            }, callback);
        }
    };
};
