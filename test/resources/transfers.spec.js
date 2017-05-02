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
        'Create Trasnfer request url formed'
      )
      console.log(response.__JUST_FOR_TESTS__.requestBody);

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
