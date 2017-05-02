'use strict'

const chai = require('chai')
const { assert } = chai
const Razorpay = require('../../dist/razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')
const { getDateInSecs } = require('../../dist/utils/razorpay-utils')

let rzpInstance = new Razorpay({
  key_id: 'XXX',
  key_secret: 'YYY'
})

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
      'notes[note1]': 'This is note1',
      'notes[note2]': 'This is note2'
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
      'notes[note1]': 'This is note1',
      'notes[note2]': 'This is note2'
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
      'notes[note1]': 'This is note1'
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

})
