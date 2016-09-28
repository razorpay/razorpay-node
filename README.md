# Razorpay Node SDK

Official nodejs bindings for [Razorpay API](https://docs.razorpay.com/docs/payments).

## Installation

```bash
npm i razorpay --save
```

## Documentation


### Basic Usage

Instantiate the razorpay instance with `key_id` & `key_secret`. You can obtain the keys from the dashboard app ([https://dashboard.razorpay.com/#/app/keys](https://dashboard.razorpay.com/#/app/keys))

```js
var instance = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET'
})
```

The resources can be accessed via the instance. All the methods invocations follows the namespaced signature

```js
// API signature
// {razorpayInstance}.{resourceName}.{methodName}(resourceId [, params])

// example
instance.payments.fetch(paymentId)
```

Every resource method returns a promise.

```js
instance.payments.all({
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
instance.payments.all({
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

> `*` indicates mandatory field

### Payments

#### `instance.payments.all({from, to, count, skip})`

> Fetches payments list.

| Name  | Type      | Description                                      |
|-------|-----------|--------------------------------------------------|
| from  | timestamp | timestamp after which the payments were created  |
| to    | timestamp | timestamp before which the payments were created |
| count | integer   | number of payments to fetch (default: 10)        |
| skip  | integer   | number of payments to be skipped (default: 0)    |


#### `instance.payments.fetch(payment_id)`

> Retrieves a particular payment.

**Parameters:**

| Name       | Type   | Description                       |
|------------|--------|-----------------------------------|
| payment_id* | string | Id of the payment to be retrieved |


#### `instance.payments.capture(payment_id, amount)`

> Capture a payment.

**Parameters:**

| Name      | Type    | Description                                                                    |
|-----------|---------|--------------------------------------------------------------------------------|
| paymentId* | string  | Id of the payment to capture                                                   |
| amount*    | integer | The amount to be captured (should be equal to the authorized amount, in paise) |

#### `instance.payments.refund(payment_id, {amount, notes})`

> Refund a payment.

**Parameters:**

| Name        | Type    | Description                          |
|-------------|---------|--------------------------------------|
| payment_id* | string  | Id of the payment to refund          |
| amount      | integer | The amount to be refunded (in paise) |
| notes       | object  | A key-value pair                     |

--

### Refunds

#### `instance.refunds.all({from, to, count, skip, payment_id})`

> Fetches refunds list. If `payment_id` is passed, refunds of that particular payment is fetched

**Parameters:**

| Name       | Type      | Description                                      |
|------------|-----------|--------------------------------------------------|
| payment_id | string    | The payment id whose refunds are to be fetched   |
| from       | timestamp | timestamp after which the payments were created  |
| to         | timestamp | timestamp before which the payments were created |
| count      | integer   | number of payments to fetch (default: 10)        |
| skip       | boolean   | number of payments to be skipped (default: 0)    |


#### `instance.refunds.fetch(refund_id, {payment_id})`

> Fetches a refund.

**Parameters:**

| Name       | Type   | Description                                           |
|------------|--------|-------------------------------------------------------|
| refund_id*  | string | ID of the refund to be retrieved                     |
| payment_id | string | The id of the payment whose refund is to be retrieved |

--

### Orders

#### `instance.orders.create({amount, currency, receipt, payment_capture, notes})`

> Create an order in razorpay

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| amount*          | integer | Amount of the order to be paid                                               |
| currency        | string  | Currency of the order. Currently only INR is supported.                      |
| receipt*         | string  | Your system order reference id.                                              |
| payment_capture | boolean | Whether the payment should be captured automatically or not. Default `false` |
| notes           | object  | A key-value pair                                                             |

#### `instance.orders.all({from, to, count, skip, authorized, receipt})`

> Fetches orders list

**Parameters**

| Name       | Type      | Description                                                  |
|------------|-----------|--------------------------------------------------------------|
| from       | timestamp | timestamp after which the payments were created              |
| to         | timestamp | timestamp before which the payments were created             |
| count      | integer   | number of payments to fetch (default: 10)                    |
| skip       | integer   | number of payments to be skipped (default: 0)                |
| authorized | boolean   | Orders for which payments are currently in authorized state. |
| receipt    | string    | Orders with the provided value for receipt.                  |


#### `instance.orders.fetch(order_id)`

> Fetches a particular order

**Parameters**

| Name     | Type   | Description                         |
|----------|--------|-------------------------------------|
| order_id* | string | The id of the order to be retrieved |


---


Further documentation is available at <https://docs.razorpay.com>


## Development

```bash
npm install
```

Run your tests using `npm test`

## Licence

MIT Licensed. LICENSE file added to repo.

