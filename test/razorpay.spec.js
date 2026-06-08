'use strict'

const chai = require('chai')
const assert = chai.assert
const Razorpay = require('../dist/razorpay')

describe('Razorpay is initialized properly', () => {
  it('Validation for auth', () => {
    try {
      new Razorpay()
    } catch (e) {
      assert.equal(e.message, '`key_id` or `oauthToken` is mandatory')
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

  it('instance should initialize with oAuth', () => {
    let instance = new Razorpay({
      oauthToken: 'XXXXXXXX',
    })

    assert.equal(instance.oauthToken, 'XXXXXXXX')
  })
})
