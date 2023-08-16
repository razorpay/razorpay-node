'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')
const { getDateInSecs } = require('../../dist/utils/razorpay-utils')

describe('TRANSFERS', () => {
  it('Create Direct Transfer', (done) => {
    let params = {
      account: 'acc_7jO4N6LScw5CEG',
      amount: 100,
      currency: 'INR',
      notes: {
        note1: 'This is note1',
        note2: 'This is note2'
      }
    }

    let expectedParams = {
      account: 'acc_7jO4N6LScw5CEG',
      amount: 100,
      currency: 'INR',
      notes: {
        note1: 'This is note1',
        note2: 'This is note2'
      }
    }

    mocker.mock({
      url: '/transfers',
      method: 'POST'
    })

    rzpInstance.transfers.create(params).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        '/v1/transfers',
        'Create Transfer request url formed'
      )
      assert.ok(
        equal(
          response.__JUST_FOR_TESTS__.requestBody,
          expectedParams
        ),
        'All params are passed in request body'
      )
      done()
    })
  })

  it('Create Transfer from Payment', (done) => {
    const TEST_PAYMENT_ID = 'pay_6fqBqgrfTSuj5v'
    let params = {
      notes: {
        note1: 'This is note1',
        note2: 'This is note2'
      }
    }

    let expectedParams = {
      notes: {
        note1: 'This is note1',
        note2: 'This is note2'
      }
    }

    mocker.mock({
      url: `/payments/${TEST_PAYMENT_ID}/transfers`,
      method: 'POST'
    })

    rzpInstance.payments.transfer(TEST_PAYMENT_ID, params).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/payments/${TEST_PAYMENT_ID}/transfers`,
        'Create payment transfer request url formed'
      )
      assert.ok(
        equal(
          response.__JUST_FOR_TESTS__.requestBody,
          expectedParams
        ),
        'All params are passed in request body'
      )
      done()
    })
  })

  it('Edit Transfer', (done) => {
    const TEST_TRANSFER_ID = 'trf_6fqBqgrfTSuj5v'
    let params = {
      on_hold: true,
      notes: {
        note1: 'This is note1'
      }
    }

    let expectedParams = {
      on_hold: 1,
      notes: {
        note1: 'This is note1'
      }
    }

    mocker.mock({
      url: `/transfers/${TEST_TRANSFER_ID}`,
      method: 'PATCH'
    })

    rzpInstance.transfers.edit(TEST_TRANSFER_ID, params).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/transfers/${TEST_TRANSFER_ID}`,
        'Edit transfer request url formed'
      )

      assert.ok(
        equal(
          response.__JUST_FOR_TESTS__.requestBody,
          expectedParams
        ),
        'All params are passed in request body'
      )
      done()
    })
  })

  it('Create Transfer Reversal', (done) => {
    const TEST_TRANSFER_ID = 'trf_6fqBqgrfTSuj5v'
    let params = {
      amount: 100,
      currency: 'INR',
      notes: {
        note1: 'This is note1'
      }
    }

    let expectedParams = {
      amount: 100,
      currency: 'INR',
      notes: {
        note1: 'This is note1'
      }
    }

    mocker.mock({
      url: `/transfers/${TEST_TRANSFER_ID}/reversals`,
      method: 'POST'
    })

    rzpInstance.transfers.reverse(TEST_TRANSFER_ID, params).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/transfers/${TEST_TRANSFER_ID}/reversals`,
        'Edit transfer request url formed'
      )

      assert.ok(
        equal(
          response.__JUST_FOR_TESTS__.requestBody,
          expectedParams
        ),
        'All params are passed in request body'
      )
      done()
    })
  })

  it('Transfer fetch', (done) => {
    const TEST_TRANSFER_ID = 'trf_6fqBqgrfTSuj5v'

    mocker.mock({
      url: `/transfers/${TEST_TRANSFER_ID}`
    })

    rzpInstance.transfers.fetch(TEST_TRANSFER_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/transfers/${TEST_TRANSFER_ID}`,
        'Fetch transfer url formed correctly'
      )
      done()
    })
  })

  describe('Fetch transfers', () => {
    it('Default params', (done) => {
      let expectedParams = {
        skip: 0,
        count: 10
      }

      mocker.mock({
        url: '/transfers'
      })

      rzpInstance.transfers.all().then((response) => {
        assert.ok(equal(
          response.__JUST_FOR_TESTS__.requestQueryParams,
          expectedParams
        ), 'skip & count are passed as default transfers queryparams')
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
        url: '/transfers'
      })

      rzpInstance.transfers.all({
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
          `/v1/transfers?from=${fromDateInSecs}&to=${toDateInSecs}&count=25&skip=5`,
          'Params are appended as part of request'
        )
        done()
      })
    })
  })

})
