'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')
const { getDateInSecs } = require('../../dist/utils/razorpay-utils')

const { runCommonTests, runParamsCheckTest, runCallbackCheckTest }  = require("../../dist/utils/predefined-tests.js");

const TEST_PAYMENT_ID = 'pay_sometestId',
      TEST_REFUND_ID = 'rfnd_sometestId',
      TEST_DOWNTIME_ID = 'down_sometestId',
      apiObj = rzpInstance.payments;

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

  describe('Fetch Transfer', () => {
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
        url: `/payments/${paymentId}/transfers`
      })

      rzpInstance.payments.fetchTransfer(paymentId).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v1/payments/${paymentId}/transfers`,
          'Fetch payment url formed correctly'
        )
        done()
      })
    })
  })

  describe('edit payment', () => {
    it('edit payment', (done) => {
      let paymentId = 'pay_sometestId'

      let params = {
        notes: {
          note1: 'This is note1',
          note2: 'This is note2'
        }
      }

      mocker.mock({
        url: `/payments/${paymentId}`,
        method : 'PATCH'
      })

      rzpInstance.payments.edit(paymentId, params).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v1/payments/${paymentId}`,
          'Request url formed correctly'
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

  describe('Fetch card details with paymentId', () => {
  
    it('Reject the promise if payment id is not provided', (done) => {

      rzpInstance.payments.fetchCardDetails()
                 .then(() => {

                   done(new Error(`method fetchCardDetails does not check` +
                                  ` for payment_id`))
                 }, () => {

                   done();
                 });
    });

    runCommonTests({
      apiObj: rzpInstance.payments,
      methodName: "fetchCardDetails",
      methodArgs: [TEST_PAYMENT_ID],
      mockerParams: {
        url: `/payments/${TEST_PAYMENT_ID}/card`
      },
      expectedUrl: `/v1/payments/${TEST_PAYMENT_ID}/card`
    });
  })

  describe('Payment Downtime ', () => {
    it('Fetch Payment Downtime Details', (done) => {
      mocker.mock({
        url: '/payments/downtimes'
      })

      rzpInstance.payments.fetchPaymentDowntime().then((response) => {
        assert.ok(equal(
          response.__JUST_FOR_TESTS__.url,
          '/v1/payments/downtimes'
        ))
        done()
      })
    })
  })
  
  describe('Fetch Payment Downtime', () => {
  
    it('Reject the promise if downtime id is not provided', (done) => {

      rzpInstance.payments.fetchPaymentDowntimeById()
      .then(() => {

        done(new Error(`method fetchCardDetails does not check` +
                      ` for payment_id`))
      }, () => {
         done();
      });
    });

    runCommonTests({
      apiObj: rzpInstance.payments,
      methodName: "fetchPaymentDowntimeById",
      methodArgs: [TEST_DOWNTIME_ID],
      mockerParams: {
        url: `/payments/downtimes/${TEST_DOWNTIME_ID}`
      },
      expectedUrl: `/v1/payments/downtimes/${TEST_DOWNTIME_ID}`
    });
  })

  describe("Fetch multiple refunds for a payment", () => {

    let methodName = "fetchMultipleRefund",
        params = {
          "skip": 0,
          "count": 10
        },
        methodArgs = [TEST_PAYMENT_ID, params],
        expectedParams = {
          ...params
        },
        mockerParams = {
          url: '/payments/' + TEST_PAYMENT_ID + '/refunds'
        };

      runParamsCheckTest({
        apiObj,
        methodName,
        methodArgs,
        mockerParams,
        expectedParams,
        testTitle: "Check if all params passed are being sent"
      });

      methodArgs = [TEST_PAYMENT_ID ,{}];

      runCallbackCheckTest({
        apiObj,
        methodName,
        mockerParams,
        methodArgs
      });
  });

  describe('Fetch a Specific Refund for a Payment', () => {
    it('Fetch Refund', (done) => {

      mocker.mock({
        url: '/payments/'+ TEST_PAYMENT_ID + '/refunds/' + TEST_REFUND_ID
      })

      rzpInstance.payments.fetchRefund(TEST_PAYMENT_ID,TEST_REFUND_ID).then((response) => {
        assert.ok(equal(
          response.__JUST_FOR_TESTS__.url,
          '/v1/payments/'+ TEST_PAYMENT_ID + '/refunds/' + TEST_REFUND_ID
        ))
        done()
      })
    })
  })

  describe('Server to server json v2', () => {
    it('Create Payment Json', (done) => {
      
      const params = {
        "amount": "100",
        "currency": "INR",
        "email": "gaurav.kumar@example.com",
        "contact": "999999999",
        "order_id": "order_sometestId",
        "method": "card",
        "card": {
          "number": "4854980604708430",
          "cvv": "123",
          "expiry_month": "12",
          "expiry_year": "21",
          "name": "Gaurav Kumar"
        }
      }

      mocker.mock({
        url: '/payments/create/json',
        method : 'POST'
      })

      rzpInstance.payments.createPaymentJson(params).then((response) => {
        assert.ok(equal(
          response.__JUST_FOR_TESTS__.url,
          '/v1/payments/create/json'
        ))
        done()
      })
    })
  })

  describe('Recurring Payment', () => {
    it('Create a Recurring Payment', (done) => {
      
      const params = {
        "email": "gaurav.kumar@example.com",
        "contact": "9123456789",
        "amount": 1000,
        "currency": "INR",
        "order_id": "order_1Aa00000000002",
        "customer_id": "cust_1Aa00000000001",
        "token": "token_1Aa00000000001",
        "recurring": "1",
        "description": "Creating recurring payment for Gaurav Kumar",
        "notes": {
          "note_key 1": "Beam me up Scotty",
          "note_key 2": "Tea. Earl Gray. Hot."
        }
      }

      mocker.mock({
        url: '/payments/create/recurring',
        method : 'POST'
      })

      rzpInstance.payments.createRecurringPayment(params).then((response) => {
        assert.ok(equal(
          response.__JUST_FOR_TESTS__.url,
          '/v1/payments/create/recurring'
        ))
        done()
      })
    })
  })

  it('Otp Submit', (done) => {
    let paymentId = 'pay_sometestId'

    let params = {
      otp : 1234
    }

    mocker.mock({
      url: `/payments/${paymentId}/otp/submit`,
      method : 'POST'
    })

    rzpInstance.payments.otpSubmit(paymentId, params).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/payments/${paymentId}/otp/submit`,
        'Request url formed correctly'
      )
      done()
    })
  })
})
