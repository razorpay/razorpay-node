'use strict'

const chai = require('chai')
const { assert } = chai
const Razorpay = require('../../dist/razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')

let rzpInstance = new Razorpay({
  key_id: 'XXX',
  key_secret: 'YYY'
})

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
      let expectedParams = {
        from: '1472063400',
        to: '1472495400',
        count: 25,
        skip: 5
      }

      mocker.mock({
        url: '/payments'
      })

      rzpInstance.payments.all({
        from: 'Aug 25, 2016',
        to: 'Aug 30, 2016',
        count: 25,
        skip: 5
      }).then((response) => {
        assert.ok(equal(
          response.__JUST_FOR_TESTS__.requestQueryParams,
          expectedParams
        ), 'from & to dates are converted to ms')

        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          '/v1/payments?from=1472063400&to=1472495400&count=25&skip=5',
          'Params are appended as part of request'
        )
        done()
      })
    })
  })

  describe('Payment fetch', () => {
    it('Throw error when paymentId is provided', () => {
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

      mocker.mock({
        url: `/payments/${paymentId}/capture`,
        method: 'POST'
      })

      rzpInstance.payments.capture(paymentId, captureAmount).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          '/v1/payments/pay_sometestId/capture',
          'Capture request url formed'
        )

        assert.ok(
          equal(
            response.__JUST_FOR_TESTS__.requestBody,
            { amount: captureAmount }
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
          'Capture request url formed'
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
})
