# Razorpay Node SDK
[![npm](https://img.shields.io/npm/v/razorpay.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/razorpay)
[![Build Status](https://travis-ci.org/razorpay/razorpay-node.svg?branch=master)](https://travis-ci.org/razorpay/razorpay-node)

### Official NodeJS wrapper for the [Razorpay API](https://docs.razorpay.com/docs/payments).

Be sure to read the official [getting started](https://docs.razorpay.com/docs/getting-started) documentation to understand the payment flow implemented by Razorpay.

---

## Installation

Getting started with the Razorpay SDK is a piece of cake. For the sake of backwards compatibility, the SDK supports NodeJS versions 8 and below via the Babel suite for on-the-flow transpilation.

```bash
npm i --save razorpay
```

After that, if you are using NodeJS v7.0.0 or below, you can also install the optional dependencies via:

```bash
npm i babel-core babel-polyfill babel-preset-es2015 babel-preset-stage-0 babel-register
```

You might get a deprecation warning about `preset-es2015`, but do not worry. It's perfectly fine.

The library has an inbuilt bootstrapper to make all of this work absolutely flawlessly with any version of Node, so you do not need to manually implement the bootstrapping code.

## API Documentation

Since this SDK is based on the official Razorpay API, you can should refer to the [API Documentation](https://docs.razorpay.com) to make sense of what is happening.

## Basic Usage

In order to begin working with the SDK, you need to get hold of an API object; to do that, you can do the following:

```js
const apiObject = new Razorpay({
  keyId: 'YOUR_KEY_ID',
  keySecret: 'YOUR_KEY_SECRET'
});
```
Where the `keyId` and `keySecret` can be obtained from [your dashboard](https://dashboard.razorpay.com/#/app/keys). With this API factory approach, you have the flexibility of using multiple accounts in one application.

### Accessing Resources
The resources use pseudo namespacing for encapsulation. In general, the following is the namespace convention for a method:

```
{instance}.{resourceName}.{method}([identifier, [...parameters, [callback]]])
```

All the methods in the library support asynchronous duality which very simply means that all functions have a callback-last as well as a Promise style.

For example, consider we have to call the `all()` method for the `payments` resource, we can do:

```js
apiObject.payments.all( {
  from: '2016-08-01',
  to: '2016-08-20'
} ).then( response => {
  // Do something with response.
} ).catch( error => {
  // Do something with the error.
} );
```

This also means that we can use `async/await`:

```js
const fetchPayments = async () => {
  try {
    const response = await apiObject.payments.all( { ... } );
    console.log(response);
  } catch (error) {
    console.error(`Oops! ${error.toString()}`);
  }
}
```
However, if you still prefer using callbacks, that's also an option:
```js
apiObject.payments.all( { ... }, (err, data) => {
  // Do something with err and data.
} );
```
The callbacks conform to the NodeJS convention on error-first callbacks.

### Supported Resources

- [Payments](https://github.com/razorpay/razorpay-node/wiki#payments)
- [Refunds](https://github.com/razorpay/razorpay-node/wiki#refunds)
- [Orders](https://github.com/razorpay/razorpay-node/wiki#orders)
- [Customers](https://github.com/razorpay/razorpay-node/wiki#customers)
- [Transfers](https://github.com/razorpay/razorpay-node/wiki#transfers)
- [Virtual Accounts](https://github.com/razorpay/razorpay-node/wiki#virtual-accounts)
- [Invoices](https://github.com/razorpay/razorpay-node/wiki#invoices)
- [Plans](https://github.com/razorpay/razorpay-node/wiki#plans)
- [Subscriptions](https://github.com/razorpay/razorpay-node/wiki#subscriptions)
- [Addons](https://github.com/razorpay/razorpay-node/wiki#addons)
- [Webhooks](https://github.com/razorpay/razorpay-node/wiki#webhooks)
- [Partner Auth](https://github.com/razorpay/razorpay-node/wiki#partner-auth)

---

## Development

If you want to extend the SDK further, you are more than welcome to; there are just a couple of things you need to keep in mind.

- Use ES6 features [supported by NodeJS](https://node.green);
- Write test cases for **all possible** outcomes and logical branches;
- If there is a breaking change, be sure to document it in the Readme (this file);
- Do **not** write clever short-circuits like `!!bool` or `+Date()`;
- Follow [semantic versioning](https://semver.org/).

You can fork this repository and then work on your feature. After you're happy with it, run all the tests and submit a pull request! :)

### NodeJS Versions

Since the library targets more than one version of the NodeJS runtime, it's preferred to use [`nvm`](https://github.com/creationix/nvm) in your development cycle. With `nvm`, you have the power and the flexibility to quickly change the target version and rerun your tests against it.

## Testing

The Razorpay SDK uses [`mocha`](https://mochajs.org) with the [`chai`](https://chaijs.com) assertion library (with [`assert`](https://www.chaijs.com/api/assert/)) and [`nock`](https://github.com/nock/nock) to mock RESTful API responses. You can read up on them and once you are comfortable, start hacking!

## Licence

MIT Licensed. You can view the full license in the `LICENSE.md` file in the repository.
