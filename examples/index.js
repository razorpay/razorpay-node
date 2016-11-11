'use strict'

const Razorpay = require('razorpay')

let rzp = new Razorpay({
  key_id: process.env.KEY_ID, // your `KEY_ID`
  key_secret: process.env.KEY_SECRET // your `KEY_SECRET`
})


// --------------------
// Payments
// --------------------

// Fetches all payments
rzp.payments.all({
  from: 'Aug 25, 2016',
  to: 'Aug 30, 2016'
}).then((data) => {
  // console.log(data)
}).catch((error) => {
  // console.error(error)
})

// Fetch a particular payment
rzp.payments.fetch('pay_6CnVGA5eq4D7Ce').then((data) => {
  // success
}).catch((error) => {
  // failure
})

// Capture a particular payment
rzp.payments.capture('pay_6CnVGA5eq4D7Ce', 1000).then((data) => {
  // success
}).catch((error) => {
  // error
})

// Full refund for a payment
rzp.payments.refund('pay_6CnTwKKUY8iKCU').then((data) => {
  // success
}).catch((error) => {
  // error
})

// Partial refund for a payment
rzp.payments.refund('pay_6CnVGA5eq4D7Ce', {
  amount: 500,
  notes: {
    note1: 'This is a test refund',
    note2: 'This is a test note'
  }
}).then((data) => {
  // success
}).catch((error) => {
  console.error(error)
  // error
})

// -------------------------
// Customers
// -------------------------
rzp.customers.create({
  name: 'selvagsz',
  email: 'test@razorpay.com',
  contact: '123456789'
}).then((data) => {
  // console.log(data)
}).catch((error) => {
  // error
})

rzp.customers.edit('cust_6fpspJYDovP0Tg', {
  name: 'selvagsz',
  email: 'test@razorpay.com',
  contact: '987654321'
}).then((data) => {
  // console.log(data)
}).catch((error) => {
  // error
})

rzp.customers.fetch('cust_6fpspJYDovP0Tg').then((data) => {
  // console.log(data)
}).catch((error) => {
  // error
})

rzp.customers.fetchTokens('cust_6fpspJYDovP0Tg').then((data) => {
  // console.log(data)
}).catch((error) => {
  // error
})

rzp.customers.fetchToken('cust_6fpspJYDovP0Tg', 'tkn_YDovP0Tg6fpsp').then((data) => {
  // console.log(data)
}).catch((error) => {
  // error
})

rzp.customers.deleteToken('cust_6fpspJYDovP0Tg', 'tkn_YDovP0Tg6fpsp').then((data) => {
  // console.log(data)
}).catch((error) => {
  // error
})

