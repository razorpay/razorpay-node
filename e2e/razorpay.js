'use strict';

const Razorpay = require("../dist/razorpay");

module.exports = new Razorpay({
  key_id: process.env.PRODUCT_API_KEY || "",
  key_secret: process.env.PRODUCT_API_SECRET || ""
});