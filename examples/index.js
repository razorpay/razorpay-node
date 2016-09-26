const Razorpay = require('../dist/rzp.js')

var rzp = new Razorpay({
  key_id: 'rzp_test_onFNXoI0BYpksX',
  key_secret: '33LGDgftV6cbozrxWyONMGoL'
})

rzp.payments.fetchAll({
  from: 'Aug 20, 2016',
  to: 'Aug 31, 2016',
  count: 20,
  skip: 1
}).then((response) => {
  console.log(response)
}).catch((error) => {
  console.error(error)
})

rzp.payments.fetchAll({
  from: 'Aug 20, 2016',
  to: 'Aug 30, 2016'
}, (error, response) => {
  if(error) {
    console.error(error)
  } else {
    console.log(response)
  }
})
