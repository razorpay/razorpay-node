'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')
const { getDateInSecs } = require('../../dist/utils/razorpay-utils')

describe('ORDERS', () => {
  describe('Fetch Orders', () => {
    it('Default params', (done) => {
      let expectedParams = {
        skip: 0,
        count: 10
      }

      mocker.mock({
        url: '/orders'
      })

      rzpInstance.orders.all().then((response) => {
        assert.ok(equal(
          response.__JUST_FOR_TESTS__.requestQueryParams,
          expectedParams
        ), 'skip & count are passed as default order queryparams')
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
        authorized: 1,
        receipt: 'testreceiptid',
        count: 25,
        skip: 5
      }

      mocker.mock({
        url: '/orders'
      })

      rzpInstance.orders.all({
        from: fromDate,
        to: toDate,
        authorized: true,
        receipt: 'testreceiptid',
        count: 25,
        skip: 5
      }).then((response) => {
        assert.ok(equal(
          response.__JUST_FOR_TESTS__.requestQueryParams,
          expectedParams
        ), 'from & to dates are converted to ms & authorized to binary')

        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v1/orders?from=${fromDateInSecs}&to=${toDateInSecs}&count=25&skip=5&authorized=1&receipt=testreceiptid`,
          'Params are appended as part of request'
        )
        done()
      })
    })
  })

  describe('Order fetch', () => {
    it('Throw error when orderId is provided', () => {
      assert.throws(
        rzpInstance.orders.fetch,
        '`order_id` is mandatory',
        'Should throw exception when orderId is not provided'
      )
    })

    it('Forms the order fetch request', (done) => {
      let orderId = 'order_sometestId'

      mocker.mock({
        url: `/orders/${orderId}`
      })

      rzpInstance.orders.fetch(orderId).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v1/orders/${orderId}`,
          'Fetch order url formed correctly'
        )
        done()
      })
    })
  })

  describe('Order create', () => {
    it('Throws error when mandatory fields are not provided', () => {
      assert.throws(
        rzpInstance.orders.create,
        '`amount` is mandatory',
        'Should throw exception when amount is not provided'
      )

      try {
        rzpInstance.orders.create({
          method: 'emandate',
        })
      } catch (e) {
        assert.equal(
          e.message,
          '`amount` is mandatory',
          'Should throw exception when amount is not provided with emandate method'
        )
      }
    })

    it('Order create request', (done) => {
      let orderAmount = 100
      let receipt = 'testreceiptid'
      let params = {
        amount: orderAmount,
        receipt: receipt,
        currency: 'INR',
        payment_capture: true,
        notes: {
          note1: 'This is note1',
          note2: 'This is note2'
        }
      }

      mocker.mock({
        url: `/orders`,
        method: 'POST'
      })

      rzpInstance.orders.create(params).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          '/v1/orders',
          'Create request url formed'
        )

        assert.ok(
          equal(
            response.__JUST_FOR_TESTS__.requestBody,
            {
              amount: orderAmount,
              receipt: receipt,
              currency: 'INR',
              payment_capture: 1,
              'notes[note1]': 'This is note1',
              'notes[note2]': 'This is note2'
            }
          ),
          'All params are passed in request body'
        )
        done()
      })
    })
  })

  describe('Fetch order\'s payments', () => {
    it('Throw error when orderId is not provided', () => {
      assert.throws(
        rzpInstance.orders.fetchPayments,
        '`order_id` is mandatory',
        'Throw exception when order_id is not provided'
      )
    })

    it('Fetch order\'s payments', (done) => {
      let orderId = 'order_sometestId'

      mocker.mock({
        url: `/orders/${orderId}/payments`
      })

      rzpInstance.orders.fetchPayments(orderId).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          '/v1/orders/order_sometestId/payments',
          'Request url formed correctly'
        )
        done()
      })
    })
  })
})
