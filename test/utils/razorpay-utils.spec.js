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
  getTestError,
  validateWebhookSignature,
  validatePaymentVerification
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
  it('Invoice Payment Verfication', () => {
      
          const respBody = {
            'payment_id':'pay_IH4NVgf4Dreq1l',
            'invoice_id':'inv_KY9Xb8W2Xx1e1A',
            'invoice_receipt_id':'order_rcptid_11',
            'invoice_status':'paid',
          },
          correctSignature = '3d8ca5c0b03c702d5675b36faf63b5f42bdd78dc946ef99b797a42bd42ab8104',
          wrongSignature = 'sddsfdsfs',
          secret = 'EnLs21M47BllR3X8PSFtjtbd';

       assert.ok(
        validatePaymentVerification(respBody, correctSignature, secret) &&
        !validatePaymentVerification(respBody, wrongSignature, secret),
        'Validates invoice payment'
      );
  })
})
