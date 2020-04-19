"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDateInSecs(date) {
    return (+new Date(date)) / 1000;
}
exports.getDateInSecs = getDateInSecs;
function normalizeDate(date) {
    if (isNumber(date)) {
        return date;
    }
    return getDateInSecs(date);
}
exports.normalizeDate = normalizeDate;
function isNumber(num) {
    return !isNaN(Number(num));
}
exports.isNumber = isNumber;
function isNonNullObject(input) {
    return !!input &&
        typeof input === "object" &&
        !Array.isArray(input);
}
exports.isNonNullObject = isNonNullObject;
function normalizeBoolean(bool) {
    if (bool === undefined) {
        return bool;
    }
    return bool ? 1 : 0;
}
exports.normalizeBoolean = normalizeBoolean;
function isDefined(value) {
    return typeof value !== "undefined";
}
exports.isDefined = isDefined;
function normalizeNotes(notes) {
    if (notes === void 0) { notes = {}; }
    var normalizedNotes = {};
    for (var key in notes) {
        normalizedNotes["notes[" + key + "]"] = notes[key];
    }
    return normalizedNotes;
}
exports.normalizeNotes = normalizeNotes;
function prettify(val) {
    /*
     * given an object , returns prettified string
     *
     * @param {Object} val
     * @return {String}
     */
    return JSON.stringify(val, null, 2);
}
exports.prettify = prettify;
function getTestError(summary, expectedVal, gotVal) {
    /*
     * @param {String} summary
     * @param {*} expectedVal
     * @param {*} gotVal
     *
     * @return {Error}
     */
    return new Error("\n" + summary + "\n" +
        ("Expected(" + typeof expectedVal + ")\n" + prettify(expectedVal) + "\n\n") +
        ("Got(" + typeof gotVal + ")\n" + prettify(gotVal)));
}
exports.getTestError = getTestError;
function validateWebhookSignature(body, signature, secret) {
    /*
     * Verifies webhook signature
     *
     * @param {String} summary
     * @param {String} signature
     * @param {String} secret
     *
     * @return {Boolean}
     */
    var crypto = require("crypto");
    if (!isDefined(body) ||
        !isDefined(signature) ||
        !isDefined(secret)) {
        throw Error("Invalid Parameters: Please give request body," +
            "signature sent in X-Razorpay-Signature header and " +
            "webhook secret from dashboard as parameters");
    }
    body = body.toString();
    var expectedSignature = crypto.createHmac('sha256', secret)
        .update(body)
        .digest('hex');
    return expectedSignature === signature;
}
exports.validateWebhookSignature = validateWebhookSignature;
;
