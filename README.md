# Razorpay Node SDK

[![npm](https://img.shields.io/npm/v/razorpay.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/razorpay)

Official nodejs library for [Razorpay API](https://docs.razorpay.com/docs/payments).

Read up here for getting started and understanding the payment flow with Razorpay: <https://docs.razorpay.com/docs/getting-started>

## Installation

```bash
npm i razorpay
```

## Documentation

Documentation of Razorpay's API and their usage is available at <https://docs.razorpay.com>

### Basic Usage

Instantiate the razorpay instance with `key_id` & `key_secret`. You can obtain the keys from the dashboard app ([https://dashboard.razorpay.com/#/app/keys](https://dashboard.razorpay.com/#/app/keys))

```js
const Razorpay = require('razorpay');

var instance = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET',
});
```

The resources can be accessed via the instance. All the methods invocations follows the namespaced signature

```js
// API signature
// {razorpayInstance}.{resourceName}.{methodName}(resourceId [, params])

// example
instance.payments.fetch(paymentId);
```

Every resource method returns a promise.

```js
instance.payments
  .all({
    from: '2016-08-01',
    to: '2016-08-20',
  })
  .then(response => {
    // handle success
  })
  .catch(error => {
    // handle error
  });
```

If you want to use callbacks instead of promises, every resource method will accept a callback function as a last parameter. The callback functions will behave as [Error First Callbacks ](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/)

```js
instance.payments.all(
  {
    from: '2016-08-01',
    to: '2016-08-20',
  },
  (error, response) => {
    if (error) {
      // handle error
    } else {
      // handle success
    }
  }
);
```

## Supported Resources
- [Addon](documents/addon.md)

- [Item](documents/items.md)

- [Customer](documents/customer.md)

- [Token](documents/token.md)

- [Order](documents/order.md)

- [Payments](documents/payment.md)

- [Settlements](documents/settlement.md)

- [Refunds](documents/refund.md)

- [Invoice](documents/invoice.md)

- [Subscriptions](documents/subscription.md)

- [Payment Links](documents/paymentLink.md)

- [Smart Collect](documents/virtualAccount.md)

- [Route](documents/transfer.md)

- [QR Code](documents/qrcode.md)

- [Emandate](documents/emandate.md)

- [Cards](documents/card.md)

- [Paper NACH](documents/papernach.md)

- [UPI](documents/upi.md)

- [Register Emandate and Charge First Payment Together](documents/registerEmandate.md)

- [Register NACH and Charge First Payment Together](documents/registerNach.md)

- [Payment Verification](documents/paymentVerfication.md)
---

## Development

```bash
npm install
```

## Testing

```bash
npm test
```

## Release

1.  Switch to `master` branch. Make sure you have the latest changes in the local master
2.  Update the `CHANGELOG.md` & bump the version in `package.json`
3.  Commit
4.  Tag the release & push to Github
5.  Create a release on GitHub using the website with more details about the release
6.  Publish to npm with `npm publish` command

## Licence

MIT Licensed. See [LICENSE.txt](LICENSE.txt) for more details
