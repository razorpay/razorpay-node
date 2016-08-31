# Razorpay Node SDK

## Installation

```bash
npm i razorpay-node --save
```

## Usage

```js
var rzp = new Razorpay({
  key_id: 'XXX',
  key_secret: 'YYY'
})

rzp.payments.all({
  from: '2016-08-01',
  to: '2016-08-20'
}).then((collection) => {

})

rzp.payments.capture('payment_id', 'amount')
```






First, you need to create a razorpay API instance using your merchant key id, and key secret:

    var rzp = new Razorpay("key_id", "key_secret");

The most common flow is capturing a payment:

    payment = rzp.payment.fetch("pay-ment_id", function(payment){payment.capture()});
	payment = rzp.payment.capture({id: "pay-ment_id", amount: 50000})
    //Note that the amount here must come from the user's session

There are other constructs as well (fetching all payments, and fetching refunds), which you can learn about at our docs.

Further documentation is available at <https://docs.razorpay.com>


## Development

We use `mocha` as our testing framework. Just run `npm test` to run all tests.
