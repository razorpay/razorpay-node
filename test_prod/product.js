'use strict';

const Razorpay = require("../dist/razorpay");
let request = require('request-promise');

class RazorpayBeta extends Razorpay {
  constructor(options) {
    super(options)
    this.api.rq = request.defaults({
      baseUrl: options.hostUrl,
      json: true,
      auth: {
        user: options.key_id,
        pass: options.key_secret
      }
    })
  }
}


module.exports = new RazorpayBeta({
  key_id: process.env.PRODUCT_API_KEY || "",
  key_secret: process.env.PRODUCT_API_SECRET || "",
  hostUrl : "https://api-web.dev.razorpay.in"
});
