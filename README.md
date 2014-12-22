# Razorpay node.js bindings

## Installation

    npm install razorpay

## Usage

First, you need to create a razorpay API instance using your merchant key id, and key secret:

    var rzp = new Razorpay("key_id", "key_secret");

The most common flow is capturing a payment:

    payment = rzp.payments.fetch("pay-ment_id");
    payment.capture({amount:100});
    //Note that the amount here must come from the user's session

You can similarly refund a payment using the following:

    refund = rzp.payments.fetch("pay-ment_id").refund({amount:100});
    //This will return a refund object

There are other constructs as well (fetching all payments, and fetching refunds), which you can learn about at our docs.

Further documentation is available at <https://docs.razorpay.com>


## Development

We use `mocha` as our testing framework. Just run `npm test` to run all tests.