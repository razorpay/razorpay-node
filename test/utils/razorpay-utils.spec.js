'use strict'

const chai = require('chai')
const assert = chai.assert
const equal = require('deep-equal')

const {
  normalizeDate,
  isNumber,
  normalizeBoolean,
  normalizeNotes,
  getDateInSecs,
  isDefined,
  isNonNullObject,
  getTestError,
  validateWebhookSignature,
  validatePaymentVerification,
  isValidUrl,
  generateOnboardingSignature
} = require('../../dist/utils/razorpay-utils')

describe('Razorpay Utils', () => {
  it('normalizeDate', () => {
    let date = 'Aug 25, 2016'
    assert.equal(
      normalizeDate(date),
      getDateInSecs(date),
      'Returns date in secs'
    )
  });

  it('isNumber', () => {
    assert.equal(
      isNumber('0.3'),
      true,
      'Number check'
    )

    assert.equal(
      isNumber('abc'),
      false,
      'Number check with alphabets'
    )
  });

  it('normalizeBoolean', () => {
    assert.equal(
      normalizeBoolean(undefined),
      undefined,
      'When undefined is passed, just return it'
    )

    assert.equal(
      normalizeBoolean(true),
      1,
      'Boolean check with true'
    )

    assert.equal(
      normalizeBoolean(false),
      0,
      'Boolean check with false'
    )
  });

  it('normalizeNotes', () => {
    assert.ok(
      equal(
        normalizeNotes({
          note1: 'This is note1',
          note2: 'This is note2'
        }),
        {
          'notes[note1]': 'This is note1',
          'notes[note2]': 'This is note2'
        }
      ),
      'Transforms the notes'
    )
  });

  it('isDefined', () => {
  
    assert.ok(
      !isDefined() && isDefined(""),
      'Checks if the argument is defined'
    );
  });

  it('getTestError', () => {
    const error = getTestError("", "", "");
    assert.ok(
      error.constructor.name === "Error",
      'Gets common error for all tests'
    );
  });

  it('validateWebhookSignature', () => {
  
    const respBody         = '{"a":1,"b":2,"c":{"d":3}}',
          secret           = "123456",
          correctSignature = "2fe04e22977002e6c7cb553adab8b460cb"+
                             "9e2a4970d5953cb27a8472752e3bbc",
          wrongSignature   = "sdfafds";

    assert.ok(
      validateWebhookSignature(respBody, correctSignature, secret) &&
      !validateWebhookSignature(respBody, wrongSignature, secret),
      'Validates webhook signature'
    );
  });

  it('Subscription Verfication', () => {
      
    const respBody = {
              'subscription_id':'sub_ID6MOhgkcoHj9I',
              'payment_id':'pay_IDZNwZZFtnjyym',
          },
          correctSignature = '601f383334975c714c91a7d97dd723eb56520318355863dcf3821c0d07a17693',
          wrongSignature = 'sddsfdsfs',
          secret = 'EnLs21M47BllR3X8PSFtjtbd';

       assert.ok(
        validatePaymentVerification(respBody, correctSignature, secret) &&
        !validatePaymentVerification(respBody, wrongSignature, secret),
        'Validates subscription'
      );
  })

  it('PaymentLink Verfication', () => {
      
    const respBody = {
              'payment_link_id':'plink_IH3cNucfVEgV68',
              'payment_id':'pay_IH3d0ara9bSsjQ',
              'payment_link_reference_id':'TSsd1989',
              'payment_link_status':'paid'
          },
          correctSignature = '07ae18789e35093e51d0a491eb9922646f3f82773547e5b0f67ee3f2d3bf7d5b',
          wrongSignature = 'sddsfdsfs',
          secret = 'EnLs21M47BllR3X8PSFtjtbd';

       assert.ok(
        validatePaymentVerification(respBody, correctSignature, secret) &&
        !validatePaymentVerification(respBody, wrongSignature, secret),
        'Validates paymentlink'
      );
  })

  it('Payment Verfication', () => {

          const respBody = {
            'order_id':'order_IEIaMR65cu6nz3',
            'payment_id':'pay_IH4NVgf4Dreq1l',
          },
          correctSignature = '0d4e745a1838664ad6c9c9902212a32d627d68e917290b0ad5f08ff4561bc50f',
          wrongSignature = 'sddsfdsfs',
          secret = 'EnLs21M47BllR3X8PSFtjtbd';

       assert.ok(
        validatePaymentVerification(respBody, correctSignature, secret) &&
        !validatePaymentVerification(respBody, wrongSignature, secret),
        'Validates payment'
      );
  })

  // New tests for isNonNullObject
  describe('isNonNullObject', () => {
    it('should return true for plain objects', () => {
      assert.equal(isNonNullObject({}), true)
      assert.equal(isNonNullObject({ key: 'value' }), true)
    })

    it('should return false for null', () => {
      assert.equal(isNonNullObject(null), false)
    })

    it('should return false for arrays', () => {
      assert.equal(isNonNullObject([]), false)
      assert.equal(isNonNullObject([1, 2, 3]), false)
    })

    it('should return false for primitives', () => {
      assert.equal(isNonNullObject(undefined), false)
      assert.equal(isNonNullObject('string'), false)
      assert.equal(isNonNullObject(123), false)
      assert.equal(isNonNullObject(true), false)
    })
  })

  // New tests for isValidUrl
  describe('isValidUrl', () => {
    it('should return true for valid https URLs', () => {
      assert.equal(isValidUrl('https://razorpay.com'), true)
      assert.equal(isValidUrl('https://api.razorpay.com/v1/orders'), true)
    })

    it('should return true for valid http URLs', () => {
      assert.equal(isValidUrl('http://localhost:3000'), true)
      assert.equal(isValidUrl('http://example.com/path?query=1'), true)
    })

    it('should return false for invalid URLs', () => {
      assert.equal(isValidUrl('not-a-url'), false)
      assert.equal(isValidUrl(''), false)
      assert.equal(isValidUrl('razorpay.com'), false)
    })

    it('should return false for non-string inputs', () => {
      assert.equal(isValidUrl(null), false)
      assert.equal(isValidUrl(undefined), false)
      assert.equal(isValidUrl(123), false)
    })
  })

  // New tests for generateOnboardingSignature
  describe('generateOnboardingSignature', () => {
    it('should generate a hex string signature', () => {
      const params = { key: 'value', nested: { a: 1 } }
      const secret = '1234567890123456' // 16 chars for AES-128
      const result = generateOnboardingSignature(params, secret)

      assert.ok(typeof result === 'string', 'Result should be a string')
      assert.ok(result.length > 0, 'Result should not be empty')
      assert.ok(/^[0-9a-f]+$/.test(result), 'Result should be valid hex')
    })

    it('should produce different output for different inputs', () => {
      const secret = '1234567890123456'
      const sig1 = generateOnboardingSignature({ a: 1 }, secret)
      const sig2 = generateOnboardingSignature({ a: 2 }, secret)

      assert.notEqual(sig1, sig2, 'Different inputs should produce different signatures')
    })

    it('should handle empty params', () => {
      const secret = '1234567890123456'
      const result = generateOnboardingSignature({}, secret)

      assert.ok(typeof result === 'string', 'Result should be a string')
      assert.ok(result.length > 0, 'Result should not be empty')
    })
  })

  // New tests for validateWebhookSignature edge cases
  describe('validateWebhookSignature - Edge Cases', () => {
    it('should return true for valid signature', () => {
      const body = '{"test":"data"}'
      const secret = 'test_secret'
      const crypto = require('crypto')
      const validSig = crypto.createHmac('sha256', secret)
                             .update(body)
                             .digest('hex')

      assert.equal(
        validateWebhookSignature(body, validSig, secret),
        true,
        'Should return true for valid signature'
      )
    })

    it('should throw error when body is undefined', () => {
      assert.throws(() => {
        validateWebhookSignature(undefined, 'signature', 'secret')
      }, /Invalid Parameters/)
    })

    it('should throw error when signature is undefined', () => {
      assert.throws(() => {
        validateWebhookSignature('body', undefined, 'secret')
      }, /Invalid Parameters/)
    })

    it('should throw error when secret is undefined', () => {
      assert.throws(() => {
        validateWebhookSignature('body', 'signature', undefined)
      }, /Invalid Parameters/)
    })

    it('should handle Buffer body input', () => {
      const body = Buffer.from('{"test":"data"}')
      const secret = 'test_secret'
      const crypto = require('crypto')
      const expectedSig = crypto.createHmac('sha256', secret)
                                .update(body.toString())
                                .digest('hex')

      assert.equal(
        validateWebhookSignature(body, expectedSig, secret),
        true,
        'Should validate Buffer body correctly'
      )
    })

    it('should return false for wrong length signature', () => {
      const body = '{"test":"data"}'
      const secret = 'test_secret'
      const shortSig = 'abc123'

      assert.equal(
        validateWebhookSignature(body, shortSig, secret),
        false,
        'Should reject wrong length signature'
      )
    })

    it('should return false for non-hex signature', () => {
      const body = '{"test":"data"}'
      const secret = 'test_secret'
      const nonHexSig = 'not-valid-hex-chars!!@@##$$%%'

      assert.equal(
        validateWebhookSignature(body, nonHexSig, secret),
        false,
        'Should reject non-hex signature'
      )
    })

    it('should return false for empty signature', () => {
      const body = '{"test":"data"}'
      const secret = 'test_secret'

      assert.equal(
        validateWebhookSignature(body, '', secret),
        false,
        'Should reject empty signature'
      )
    })

    it('should return false for tampered but valid-hex signature', () => {
      const body = '{"test":"data"}'
      const secret = 'test_secret'
      // Valid hex but wrong value
      const tamperedSig = 'aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899'

      assert.equal(
        validateWebhookSignature(body, tamperedSig, secret),
        false,
        'Should reject tampered signature'
      )
    })
  })

  // New tests for validatePaymentVerification error handling
  describe('validatePaymentVerification - Error Handling', () => {
    it('should throw error when secret is missing', () => {
      assert.throws(() => {
        validatePaymentVerification({ order_id: 'order_123', payment_id: 'pay_123' }, 'sig', '')
      }, /secret is mandatory/)
    })

    it('should throw error when neither order_id nor subscription_id is provided', () => {
      assert.throws(() => {
        validatePaymentVerification({ payment_id: 'pay_123' }, 'sig', 'secret')
      }, /Either order_id or subscription_id is mandatory/)
    })
  })
})
