const crypto = require("crypto");

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

    }else if(isDefined(params.payment_link_id) === true){
  
      var paymentLinkId = params.payment_link_id;
      var paymentLinkRefId = params.payment_link_reference_id;
      var paymentLinkStatus = params.payment_link_status;
  
      var payload = paymentLinkId + '|' + paymentLinkRefId + '|' + paymentLinkStatus + '|' + paymentId;
      
    }else if(isDefined(params.invoice_id) === true){
  
      var invoiceId = params.invoice_id;
      var invoiceReceiptId = params.invoice_receipt_id;
      var invoiceStatus = params.invoice_status;
  
      var payload = invoiceId + '|' + invoiceReceiptId + '|' + invoiceStatus + '|' + paymentId;
      
    }else{
      throw new Error(
        'One of order_id, subscription_id, payment_link_id or razorpay_invoice_id is mandatory for verification.'
      );
    }
  return validateWebhookSignature(payload,signature,secret);
};

function generateOnboardingSignature(params={}, secret){
  let jsonStr = JSON.stringify(params);
  return encrypt(jsonStr, secret);
}

function encrypt(dataToEncrypt, secret) {
  try {
    // Use first 16 bytes of secret as key
    const keyBytes = Buffer.from(secret.slice(0, 16), 'utf8');
    
    // Use first 12 bytes of key as IV
    const iv = Buffer.alloc(12);
    keyBytes.copy(iv, 0, 0, 12);

    // Create cipher with AES-GCM
    const cipher = crypto.createCipheriv('aes-128-gcm', keyBytes, iv);
    
    // Encrypt the data
    let encryptedData = cipher.update(dataToEncrypt, 'utf8');
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);
    
    // Get authentication tag and append to encrypted data
    const authTag = cipher.getAuthTag();
    const finalData = Buffer.concat([encryptedData, authTag]);
    
    // Convert to hex string
    return finalData.toString('hex');
  } catch (err) {
    throw new Error(`Encryption failed: ${err.message}`);
  }
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

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
  validatePaymentVerification,
  isValidUrl,
  generateOnboardingSignature
}
