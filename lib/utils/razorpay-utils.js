function getDateInSecs(date) {
  return (+new Date(date))/1000
}

function normalizeDate(date) {
  return isNumber(date)? date : getDateInSecs(date)
}

function isNumber(num) {
  return !isNaN(Number(num))
}

function isNonNullObject(input) {
  return !!input &&
         typeof input === "object" &&
         !Array.isArray(input);
}

function normalizeBoolean(bool) {
  if (bool === undefined) {
    return bool
  }

  return bool ? 1 : 0
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
      "signature sent in X-Razorpay-Signature header and " +
      "webhook secret from dashboard as parameters"
    );
  }

  body = body.toString();

  var expectedSignature = crypto.createHmac('sha256', secret)
                                .update(body)
                                .digest('hex');

  return expectedSignature === signature;
}

function validatePaymentVerification(params={}, signature, secret){

  /*
   * Payment verfication
   *
   * @param {Object} params
   * @param {String} signature
   * @param {String} secret
   * @return {Boolean}
   */

    let paymentId = params.payment_id;

    if (!secret) {

      throw new Error("secret is mandatory");
    }  
      
    if(isDefined(params.order_id)===true){
      
      var orderId = params.order_id;
      var payload = orderId + '|' + paymentId;

    }else if(isDefined(params.subscription_id)===true){
      
      var subscriptionId = params.subscription_id;
      var payload = paymentId + '|' + subscriptionId;

    }else{
      throw new Error('Either order_id or subscription_id is mandatory');
    }
  return validateWebhookSignature(payload,signature,secret);
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
  validateWebhookSignature,
  validatePaymentVerification
}
