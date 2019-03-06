'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')
const { getDateInSecs } = require('../../dist/utils/razorpay-utils')

const { runCommonTests }  = require("../../dist/utils/predefined-tests.js");

const TEST_PAYMENT_ID = 'pay_sometestId';

describe('PAYMENTS', () => {
  describe('Fetch Payments', () => {
    it('Default params', (done) => {
      let expectedParams = {
        skip: 0,
        count: 10
      }

      mocker.mock({
        url: '/payments'
      })

      rzpInstance.payments.all().then((response) => {
        assert.ok(equal(
          response.__JUST_FOR_TESTS__.requestQueryParams,
          expectedParams
        ), 'skip & count are passed as default payments queryparams')
        done()
      })
    })

    it('`From` & `To` date are converted to ms', (done) => {
      let fromDate = 'Aug 25, 2016'
      let toDate = 'Aug 30, 2016'
      let fromDateInSecs = getDateInSecs(fromDate)
      let toDateInSecs = getDateInSecs(toDate)
      let expectedParams = {
        from: fromDateInSecs,
        to: toDateInSecs,
        count: 25,
        skip: 5
      }

      mocker.mock({
        url: '/payments'
      })

      rzpInstance.payments.all({
        from: fromDate,
        to: toDate,
        count: 25,
        skip: 5
      }).then((response) => {
        assert.ok(equal(
          response.__JUST_FOR_TESTS__.requestQueryParams,
          expectedParams
        ), 'from & to dates are converted to ms')

        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v1/payments?from=${fromDateInSecs}&to=${toDateInSecs}&count=25&skip=5`,
          'Params are appended as part of request'
        )
        done()
      })
    })
  })

  describe('Payment fetch', () => {
    it('Throw error when paymentId is not provided', () => {
      assert.throws(
        rzpInstance.payments.fetch,
        '`payment_id` is mandatory',
        'Should throw exception when paymentId is not provided'
      )
    })

    it('Forms the payment fetch request', (done) => {
      let paymentId = 'pay_sometestId'

      mocker.mock({
        url: `/payments/${paymentId}`
      })

      rzpInstance.payments.fetch(paymentId).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v1/payments/${paymentId}`,
          'Fetch payment url formed correctly'
        )
        done()
      })
    })
  })

  describe('Payment capture', () => {
    it('Throws error when paymentId or amount is not provided', () => {
      assert.throws(
        rzpInstance.payments.capture,
        '`payment_id` is mandatory',
        'Should throw exception when no args are provided'
      )

      try {
        rzpInstance.payments.capture('pay_sometestId')
      } catch (e) {
        assert.equal(
          e.message,
          '`amount` is mandatory',
          'throw exception when amount is not provided'
        )
      }
    })

    it('Payment capture request', (done) => {
      let paymentId = 'pay_sometestId'
      let captureAmount = 100
      let currency = 'INR'
      mocker.mock({
        url: `/payments/${paymentId}/capture`,
        method: 'POST'
      })

      rzpInstance.payments.capture(paymentId, captureAmount, currency).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          '/v1/payments/pay_sometestId/capture',
          'Capture request url formed'
        )

        assert.ok(
          equal(
            response.__JUST_FOR_TESTS__.requestBody,
            { amount: captureAmount, currency }
          ),
          'Amount is passed in request body'
        )
        done()
      })
    })
  })

  describe('Payment Refund', () => {
    it('Throw error when paymentId is not provided', () => {
      assert.throws(
        rzpInstance.payments.refund,
        '`payment_id` is mandatory',
        'Throw exception when payment_id is not provided'
      )
    })

    it('payment refund request', (done) => {
      let paymentId = 'pay_sometestId'
      let refundAmount = 100

      mocker.mock({
        url: `/payments/${paymentId}/refund`,
        method: 'POST'
      })

      rzpInstance.payments.refund(paymentId, {
        amount: refundAmount,
        notes: {
          note1: 'This is note1',
          note2: 'This is note2'
        }
      }).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          '/v1/payments/pay_sometestId/refund',
          'Refund request url formed'
        )

        assert.ok(
          equal(
            response.__JUST_FOR_TESTS__.requestBody,
            {
              amount: refundAmount,
              'notes[note1]': 'This is note1',
              'notes[note2]': 'This is note2'
            }
          ),
          'Amount & notes are passed in request body'
        )
        done()
      })
    })
  })

  describe('Payment Transfers', () => {
    it('Throw error when paymentId is not provided', () => {
      assert.throws(
        rzpInstance.payments.transfer,
        '`payment_id` is mandatory',
        'Throw exception when payment_id is not provided'
      )
    })

    it('Payment Transfer request', (done) => {
      let paymentId = 'pay_sometestpayId'

      mocker.mock({
        url: `/payments/${paymentId}/transfers`,
        method: 'POST'
      })

      rzpInstance.payments.transfer(paymentId, {
        transfers: [
          {
            account: 'acc_7jO4N6LScw5CEG',
            amount: 100,
            currency: 'INR',
            on_hold: true
          }
        ],
        notes: {
          note1: 'This is note1',
          note2: 'This is note2'
        }
      }).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          '/v1/payments/pay_sometestpayId/transfers',
          'Payment transfer request URL formed'
        )
        assert.ok(
          equal(
            response.__JUST_FOR_TESTS__.requestBody,
            {
              'transfers[0][account]': 'acc_7jO4N6LScw5CEG',
              'transfers[0][amount]': 100,
              'transfers[0][currency]': 'INR',
              'transfers[0][on_hold]': 1,
              'notes[note1]': 'This is note1',
              'notes[note2]': 'This is note2'
            }
          ),
          'Correct params are passed in request body'
        )
        done()
      })
    })
  })

  describe('Payment Bank Transfers', () => {
  
    it('Reject the promise if payment id is not provided', (done) => {

      rzpInstance.payments.bankTransfer()
                 .then(() => {

                   done(new Error(`method bankTransfer does not check` +
                                  ` for payment_id`))
                 }, () => {

                   done();
                 });
    });

    runCommonTests({
      apiObj: rzpInstance.payments,
      methodName: "bankTransfer",
      methodArgs: [TEST_PAYMENT_ID],
      mockerParams: {
        url: `/payments/${TEST_PAYMENT_ID}/bank_transfer`
      },
      expectedUrl: `/v1/payments/${TEST_PAYMENT_ID}/bank_transfer`
    });
  })
})
