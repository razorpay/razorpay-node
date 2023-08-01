'use strict';

const Razorpay = require("../dist/razorpay");

module.exports = new Razorpay({
  key_id: process.env.API_KEY || "",
  key_secret: process.env.API_SECRET || "",
  hostUrl : "https://api-web.dev.razorpay.in"
});