var request = require('request');
var Entity = require('./entity');

var Razorpay = function(key_id, key_secret) {

  this.key_id = key_id;
  this.key_secret = key_secret;
}

Razorpay.prototype.payments = new Entity("payments");

module.exports = Razorpay;
