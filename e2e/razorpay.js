'use strict';

const Razorpay = require("../dist/razorpay");
let request = require('request-promise');

class RazorpayTest extends Razorpay {
  constructor(options) {
    super(options)
    this.api.rq = request.defaults({
      baseUrl: hostUrl,
      json: true,
      auth: {
        user: options.key_id,
        pass: options.key_secret
      }
    })
  }
}


module.exports = new RazorpayTest({
  key_id: process.env.API_KEY || "",
  key_secret: process.env.API_SECRET || "",
  hostUrl : "https://api-web.dev.razorpay.in"
});