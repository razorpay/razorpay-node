const crypto = require('crypto');

function getDateInSecs(_date) {

  try {
    const date = ( new Date(_date) ).getTime();

    if (!isNumber(date)) {
      throw new TypeError('Invalid date format provided');
    }

    return date / 1000;
  } catch (error) {
    throw error;
  }

}

function normalizeDate(date) {
  return isNumber(date) ? date : getDateInSecs(date);
}

function isNumber(num) {

  /*
   * The way to check the validaty of a number using isNaN
   * is childish at best. The ECMA Script Specification
   * in §20 - Numbers, 20.1.1.1 says that if no input is given
   * or if the input is an empty string or null (via ToNumber in §7.1.3),
   * the value should be +0 (sic). For that reason, it should be coupled
   * with RegExp testing.
  */

  if (typeof num !== 'string' && typeof num !== 'number') {
    return false;
  }

  if (typeof num === 'number') {
    return !isNaN(num);
  }

  return !!/^\d+(\.\d{0,2})?$/.exec(num);
}

function isDefined (value) {

  return typeof value !== "undefined";
}

function normalizeNotes(notes = {}) {
  let normalizedNotes = {}
  for (let key in notes) {
    normalizedNotes[`notes[${key}]`] = notes[key]
  }
  return normalizedNotes
}

function prettify (val) {

  /*
   * given an object , returns prettified string
   *
   * @param {Object} val
   * @return {String}
   */

  return JSON.stringify(val, null, 2);
}

function getTestError (summary, expectedVal, gotVal) {

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

function validateWebhookSignature (body, signature, secret) {

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
      "signature sent in X-Razorpay-Header and " +
      "webhook secret from dashboard as parameters"
    );
  }

  body = body.toString();

  var expectedSignature = crypto.createHmac('sha256', secret)
                                .update(body)
                                .digest('hex');

  return expectedSignature === signature;
};

module.exports = {
  normalizeNotes,
  normalizeDate,
  normalizeBoolean,
  isNumber,
  getDateInSecs,
  prettify,
  isDefined,
  isNonNullObject,
  getTestError,
  validateWebhookSignature
}
