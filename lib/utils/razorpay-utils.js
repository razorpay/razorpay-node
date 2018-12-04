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

function isNonNullObject(input) {

  if (typeof input === 'undefined' || typeof input !== 'object') {
    return false;
  }

  return !Array.isArray(input);

}

function normalizeBoolean(value) {
  return !!value;
}

function normalizeNotes(notes) {

  if (typeof notes !== 'object') {
    throw new TypeError(`Invalid parameter passed; expecting Object got ${typeof notes}`);
  }

  return Object.keys(notes).reduce((acc, current) => {
    acc[`notes[${current}]`] = notes[current];
    return acc;
  }, {});

}

function validateWebhookSignature(body, signature, secret) {

  const errors = {
    body: {
      isError: false,
      source: 'X-Razorpay-Header'
    },
    signature: {
      isError: false,
      source: 'X-Razorpay-Header'
    },
    secret: {
      isError: false,
      source: 'dashboard'
    }
  };

  if (typeof body === 'undefined' || typeof body !== 'string') {
    errors.body.isError = true;
  }

  if (typeof signature === 'undefined' || typeof signature !== 'string') {
    errors.signature.isError = true;
  }

  if (typeof secret === 'undefined' || typeof secret !== 'string') {
    errors.secret.isError = true;
  }

  let calculatedErrors = Object.keys(errors).filter(key => errors[key].isError);

  if (calculatedErrors.length > 0) {

    calculatedErrors = calculatedErrors.reduce((acc, current) => {
      acc.push(`"${current}" found in the ${errors[current].source} and should be a string`);
      return acc;
    }, []);

    throw new TypeError(
      `Invalid parameter${calculatedErrors.length > 1 ? 's' : ''} passed. The parameter ` +
      calculatedErrors.join(', ') + '.'
    );

  }

  var expectedSignature = crypto.createHmac('sha256', secret)
    .update(body).digest('hex');

  return expectedSignature === signature;

};

module.exports = {
  normalizeNotes,
  normalizeDate,
  normalizeBoolean,
  isNumber,
  getDateInSecs,
  isNonNullObject,
  validateWebhookSignature
};
