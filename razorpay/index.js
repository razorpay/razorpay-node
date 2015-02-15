var request = require('request');
var Payment = require('./payment');

var Razorpay = function(key_id, key_secret) {
  this.payment.key_id = key_id;
  this.payment.key_secret = key_secret;
}

Razorpay.prototype.payment = new Payment({entity: 'payment'});

module.exports = Razorpay;
