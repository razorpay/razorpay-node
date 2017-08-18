'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')
const { getDateInSecs } = require('../../dist/utils/razorpay-utils')

describe('REFUNDS', () => {
  describe('Fetch Refunds', () => {
    it('Default params', (done) => {
      let expectedParams = {
        skip: 0,
        count: 10
      }

      mocker.mock({
        url: '/refunds'
      })

      rzpInstance.refunds.all().then((response) => {
        assert.ok(equal(
          response.__JUST_FOR_TESTS__.requestQueryParams,
          expectedParams
        ), 'skip & count are passed as default queryparams')
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
        url: '/refunds'
      })

      rzpInstance.refunds.all({
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
          `/v1/refunds?from=${fromDateInSecs}&to=${toDateInSecs}&count=25&skip=5`,
          'Params are appended as part of request'
        )
        done()
      })
    })

    it('Form `/payments/id/refunds` url when paymentId is provided', (done) => {
      let paymentId = 'pay_sometestId'
      let params = {
        payment_id: paymentId
      }

      mocker.mock({
        url: `/payments/${paymentId}/refunds`
      })

      rzpInstance.refunds.all(params).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v1/payments/${paymentId}/refunds?count=10&skip=0`,
          'Url is formed'
        )
        done()
      })
    })
  })

  describe('Refund fetch', () => {
    it('Throw error when refundId is provided', () => {
      assert.throws(
        rzpInstance.refunds.fetch,
        '`refund_id` is mandatory',
        'Should throw exception when refundId is not provided'
      )
    })

    it('Forms the refund fetch request', (done) => {
      let refundId = 'rfn_sometestId'

      mocker.mock({
        url: `/refunds/${refundId}`
      })

      rzpInstance.refunds.fetch(refundId).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v1/refunds/${refundId}`,
          'Fetch refund url formed correctly'
        )
        done()
      })
    })

    it('Form `/payments/id/refunds/id` url when paymentId is provided', (done) => {
      let paymentId = 'pay_sometestId'
      let refundId = 'rfn_sometestId'
      let params = {
        payment_id: paymentId
      }

      mocker.mock({
        url: `/payments/${paymentId}/refunds/${refundId}`
      })

      rzpInstance.refunds.fetch(refundId, params).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v1/payments/${paymentId}/refunds/${refundId}`,
          'Url is formed'
        )
        done()
      })
    })
  })
})
