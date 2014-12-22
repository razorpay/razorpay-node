var Razorpay = require('../razorpay/index');
var expect = require('chai').expect;

suite('Razorpay');

test('#new', function() {
  expect(Razorpay).to.exist;
  var rzp = new Razorpay('key_id', 'key_secret');
  expect(rzp.payments).to.exist;
  expect(rzp.key_id).to.equal('key_id');
  expect(rzp.key_secret).to.equal('key_secret');
});
