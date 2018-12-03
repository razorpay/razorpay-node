const { assert } = require('chai');

const Razorpay = require('../lib/razorpay');

describe('#Razorpay - Constructor', () => {
  it('validates configuration parameters', () => {

    assert.throws(() => {
      new Razorpay();
    }, TypeError, 'The configuration argument should be an object; got undefined');

  });
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
