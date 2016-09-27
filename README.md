# Razorpay Node SDK

Official nodejs bindings for [Razorpay API](https://docs.razorpay.com/docs/payments)

## Installation

```bash
npm i razorpay --save
```

## Documentation


### Basic Usage

Instantiate the razorpay instance with `key_id` & `key_secret`. You can obtain the keys from the dashboard app ([https://dashboard.razorpay.com/#/app/keys](https://dashboard.razorpay.com/#/app/keys))

```js
var rzp = new Razorpay({
  key_id: 'XXX',
  key_secret: 'YYY'
})
```

The resources can be accessed via the `rzp` instance. All the methods invocations follows the namespaced signature

```js
// API signature
// {rzpInstance}.{resourceName}.{methodName}(resourceId [, params])

// example
rzp.payments.fetch(paymentId)
```

Every resource method returns a promise.

```js
rzp.payments.all({
  from: '2016-08-01',
  to: '2016-08-20'
}).then((response) => {
  // handle success
}).catch((error) => {
  // handle error
})
```

If you want to use callbacks instead of promises, every resource method will accept a callback function as a last parameter. The callback functions will behave as [Error First Callbacks ](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/)

```js
rzp.payments.all({
  from: '2016-08-01',
  to: '2016-08-20'
}, function(error, response) => {
  if (error) {
    // handle error
  } else {
    // handle success
  }
})
```

## Resources

### Payments

#### `instance.payments.all({from, to, count, skip})`

> Fetches payments list.

| Name  | Type      | Description                                      |
|-------|-----------|--------------------------------------------------|
| from  | Timestamp | timestamp after which the payments were created  |
| to    | Timestamp | timestamp before which the payments were created |
| count | Integer   | number of payments to fetch (default: 10)        |
| skip  | Integer   | number of payments to be skipped (default: 0)    |

--

#### `instance.payments.fetch(payment_id)`

> Retrieves a particular payment.

**Parameters:**

| Name       | Type   | Description                       |
|------------|--------|-----------------------------------|
| payment_id | String | Id of the payment to be retrieved |

--

#### `instance.payments.capture(payment_id, amount)`

> Capture a payment.

**Parameters:**

| Name      | Type    | Description                                                                    |
|-----------|---------|--------------------------------------------------------------------------------|
| paymentId | String  | Id of the payment to capture                                                   |
| amount    | Integer | The amount to be captured (should be equal to the authorized amount, in paise) |

--

#### `instance.payments.refund(payment_id, {amount, notes})`

> Refund a payment.

**Parameters:**

| Name       | Type             | Description                          |
|------------|------------------|--------------------------------------|
| payment_id | String           | Id of the payment to refund          |
| amount     | Integer          | The amount to be refunded (in paise) |
| notes      | Array of strings | Array of notes fields.               |

--

#### `instance.refunds.all({from, to, count, skip, payment_id})`

> Fetches refunds list. If `payment_id` is passed, refunds of that particular payment is fetched

**Parameters:**

| Name       | Type      | Description                                      |
|------------|-----------|--------------------------------------------------|
| payment_id | String    | The payment id whose refunds are to be fetched   |
| from       | Timestamp | timestamp after which the payments were created  |
| to         | Timestamp | timestamp before which the payments were created |
| count      | Integer   | number of payments to fetch (default: 10)        |
| skip       | Boolean   | number of payments to be skipped (default: 0)    |

--

#### `instance.refund.fetch(refund_id, {payment_id})`

> Fetches a refund.

**Parameters:**

| Name       | Type   | Description                                           |
|------------|--------|-------------------------------------------------------|
| payment_id | String | The id of the payment whose refund is to be retrieved |
| refund_id  | String | ID of the refund to be retrieved                      |

---


Further documentation is available at <https://docs.razorpay.com>


## Development

```bash
npm install
```

Run your tests using `npm test`

## Licence

MIT Licensed. LICENSE file added to repo.

