'use strict'

const chai = require('chai')
const assert = chai.assert
const Razorpay = require('../dist/razorpay')

describe('Razorpay is initialized properly', () => {
  it('Validation for key_id & key_secret', () => {
    try {
      new Razorpay()
    } catch (e) {
      assert.equal(e.message, '`key_id` is mandatory')
    }

    try {
      new Razorpay({
        key_id: 'XXX'
      })
    } catch (e) {
      assert.equal(e.message, '`key_secret` is mandatory')
    }
  })

  it('instance should initialize', () => {
    let instance = new Razorpay({
      key_id: 'XXX',
      key_secret: 'YYY'
    })

    assert.equal(instance.key_id, 'XXX')
    assert.equal(instance.key_secret, 'YYY')
  })
})
