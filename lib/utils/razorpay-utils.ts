import { NormalizableDate } from '../types';

export function getDateInSecs(date: string): number {
  return (+new Date(date))/1000
}

export function normalizeDate(date: NormalizableDate): number {
  if (isNumber(date)) {
    return date;
  }

  return getDateInSecs(date);
}

export function isNumber(num: any): num is number {
  return !isNaN(Number(num));
}

export function isNonNullObject(input) {
  return !!input &&
         typeof input === "object" &&
         !Array.isArray(input);
}

export function normalizeBoolean(bool) {
  if (bool === undefined) {
    return bool
  }

  return bool ? 1 : 0
}

export function isDefined (value) {

  return typeof value !== "undefined";
}

export function normalizeNotes(notes = {}) {
  let normalizedNotes = {}
  for (let key in notes) {
    normalizedNotes[`notes[${key}]`] = notes[key]
  }
  return normalizedNotes
}

export function prettify (val) {

  /*
   * given an object , returns prettified string
   *
   * @param {Object} val
   * @return {String}
   */

  return JSON.stringify(val, null, 2);
}

export function getTestError (summary, expectedVal, gotVal) {

  /*
   * @param {String} summary
   * @param {*} expectedVal
   * @param {*} gotVal
   *
   * @return {Error}
   */

  return new Error(
    `\n${summary}\n`+
    `Expected(${typeof expectedVal})\n${prettify(expectedVal)}\n\n`+
    `Got(${typeof gotVal})\n${prettify(gotVal)}`
  );
}

export function validateWebhookSignature (body, signature, secret) {

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

  if (!isDefined(body)      ||
      !isDefined(signature) ||
      !isDefined(secret)      ) {
  
    throw Error(
      "Invalid Parameters: Please give request body," +
      "signature sent in X-Razorpay-Signature header and " +
      "webhook secret from dashboard as parameters"
    );
  }

  body = body.toString();

  var expectedSignature = crypto.createHmac('sha256', secret)
                                .update(body)
                                .digest('hex');

  return expectedSignature === signature;
};
