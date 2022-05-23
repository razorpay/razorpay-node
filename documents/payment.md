## Payments

### Capture payment

```js
instance.payments.capture(paymentId, amount, currency)
```

**Parameters:**

| Name      | Type    | Description                                                                    |
|-----------|---------|--------------------------------------------------------------------------------|
| paymentId* | string  | Id of the payment to capture                                                   |
| amount*    | integer | The amount to be captured (should be equal to the authorized amount, in paise) |
| currency   | string  | The currency of the payment (defaults to INR)                                  |

**Response:**
```json
{
  "id": "pay_G8VQzjPLoAvm6D",
  "entity": "payment",
  "amount": 1000,
  "currency": "INR",
  "status": "captured",
  "order_id": "order_G8VPOayFxWEU28",
  "invoice_id": null,
  "international": false,
  "method": "upi",
  "amount_refunded": 0,
  "refund_status": null,
  "captured": true,
  "description": "Purchase Shoes",
  "card_id": null,
  "bank": null,
  "wallet": null,
  "vpa": "gaurav.kumar@exampleupi",
  "email": "gaurav.kumar@example.com",
  "contact": "+919999999999",
  "customer_id": "cust_DitrYCFtCIokBO",
  "notes": [],
  "fee": 24,
  "tax": 4,
  "error_code": null,
  "error_description": null,
  "error_source": null,
  "error_step": null,
  "error_reason": null,
  "acquirer_data": {
    "rrn": "033814379298"
  },
  "created_at": 1606985209
}
```
-------------------------------------------------------------------------------------------------------

### Fetch all payments

```js
instance.payments.all(option)
```

**Parameters:**

| Name  | Type      | Description                                      |
|-------|-----------|--------------------------------------------------|
| from  | timestamp | timestamp after which the payments were created  |
| to    | timestamp | timestamp before which the payments were created |
| count | integer   | number of payments to fetch (default: 10)        |
| skip  | integer   | number of payments to be skipped (default: 0)    |

**Response:**
```json
{
  "entity": "collection",
  "count": 2,
  "items": [
    {
      "id": "pay_G8VaL2Z68LRtDs",
      "entity": "payment",
      "amount": 900,
      "currency": "INR",
      "status": "captured",
      "order_id": "order_G8VXfKDWDEOHHd",
      "invoice_id": null,
      "international": false,
      "method": "netbanking",
      "amount_refunded": 0,
      "refund_status": null,
      "captured": true,
      "description": "Purchase Shoes",
      "card_id": null,
      "bank": "KKBK",
      "wallet": null,
      "vpa": null,
      "email": "gaurav.kumar@example.com",
      "contact": "+919999999999",
      "customer_id": "cust_DitrYCFtCIokBO",
      "notes": [],
      "fee": 22,
      "tax": 4,
      "error_code": null,
      "error_description": null,
      "error_source": null,
      "error_step": null,
      "error_reason": null,
      "acquirer_data": {
        "bank_transaction_id": "0125836177"
      },
      "created_at": 1606985740
    }
  ]
}
```
-------------------------------------------------------------------------------------------------------

### Fetch a payment

```js
instance.payments.fetch(paymentId)
```

**Parameters:**

| Name       | Type   | Description                       |
|------------|--------|-----------------------------------|
| paymentId* | string | Id of the payment to be retrieved |

**Response:**
```json
{
  "id": "pay_G8VQzjPLoAvm6D",
  "entity": "payment",
  "amount": 1000,
  "currency": "INR",
  "status": "captured",
  "order_id": "order_G8VPOayFxWEU28",
  "invoice_id": null,
  "international": false,
  "method": "upi",
  "amount_refunded": 0,
  "refund_status": null,
  "captured": true,
  "description": "Purchase Shoes",
  "card_id": null,
  "bank": null,
  "wallet": null,
  "vpa": "gaurav.kumar@exampleupi",
  "email": "gaurav.kumar@example.com",
  "contact": "+919999999999",
  "customer_id": "cust_DitrYCFtCIokBO",
  "notes": [],
  "fee": 24,
  "tax": 4,
  "error_code": null,
  "error_description": null,
  "error_source": null,
  "error_step": null,
  "error_reason": null,
  "acquirer_data": {
    "rrn": "033814379298"
  },
  "created_at": 1606985209
}
```
-------------------------------------------------------------------------------------------------------

### Fetch payments for an order

```js
instance.orders.fetchPayments(orderId)
```
**Parameters**

| Name     | Type   | Description                         |
|----------|--------|-------------------------------------|
| orderId* | string | The id of the order to be retrieve payment info |

**Response:**
```json
{
  "count": 1,
  "entity": "collection",
  "items": [
    {
      "id": "pay_DovGQXOkPBJjjU",
      "entity": "payment",
      "amount": 600,
      "currency": "INR",
      "status": "captured",
      "order_id": "order_DovFx48wjYEr2I",
      "method": "netbanking",
      "amount_refunded": 0,
      "refund_status": null,
      "captured": true,
      "description": "A Wild Sheep Chase is a novel by Japanese author Haruki Murakami",
      "card_id": null,
      "bank": "SBIN",
      "wallet": null,
      "vpa": null,
      "email": "gaurav.kumar@example.com",
      "contact": "9364591752",
      "fee": 70,
      "tax": 10,
      "error_code": null,
      "error_description": null,
      "error_source": null,
      "error_step": null,
      "error_reason": null,
      "notes": [],
      "acquirer_data": {
        "bank_transaction_id": "0125836177"
      },
      "created_at": 1400826750
    }
  ]
}
```
-------------------------------------------------------------------------------------------------------

### Update a payment

```js
instance.payments.edit(paymentId,{
	"notes": {
		"key1": "value1",
		"key2": "value2"
	}
})
```

**Parameters:**

| Name        | Type    | Description                          |
|-------------|---------|--------------------------------------|
| paymentId* | string  | Id of the payment to update          |
| notes*       | object  | A key-value pair                     |

**Response:**
```json
{
  "id": "pay_CBYy6tLmJTzn3Q",
  "entity": "payment",
  "amount": 1000,
  "currency": "INR",
  "status": "authorized",
  "order_id": null,
  "invoice_id": null,
  "international": false,
  "method": "netbanking",
  "amount_refunded": 0,
  "refund_status": null,
  "captured": false,
  "description": null,
  "card_id": null,
  "bank": "UTIB",
  "wallet": null,
  "vpa": null,
  "email": "testme@acme.com",
  "notes": {
    "key1": "value1",
    "key2": "value2"
  },
  "fee": null,
  "tax": null,
  "error_code": null,
  "error_description": null,
  "error_source": null,
  "error_step": null,
  "error_reason": null,
  "acquirer_data": {
    "bank_transaction_id": "0125836177"
  },
  "created_at": 1553504328
}
```
-------------------------------------------------------------------------------------------------------

### Fetch expanded card or emi details for payments

Request #1: Card

```js
instance.payments.all({'expand[]':'card'})
```

Request #2: EMI

```js
instance.payments.all({'expand[]':'emi'})
```

**Response:**<br>
For expanded card or emi details for payments response please click [here](https://razorpay.com/docs/api/payments/#fetch-expanded-card-or-emi-details-for-payments)

-------------------------------------------------------------------------------------------------------

### Fetch card details with paymentId

```js
instance.payments.fetchCardDetails(paymentId)
```

**Parameters:**

| Name        | Type    | Description                          |
|-------------|---------|--------------------------------------|
| paymentId* | string  | Id of the payment to update          |

**Response:**
```json
{
  "id": "card_6krZ6bcjoeqyV9",
  "entity": "card",
  "name": "Gaurav",
  "last4": "3335",
  "network": "Visa",
  "type": "debit",
  "issuer": "SBIN",
  "international": false,
  "emi": null,
  "sub_type": "business"
}
```
-------------------------------------------------------------------------------------------------------

### Fetch Payment Downtime Details

```js
instance.payments.fetchPaymentDowntime()
```
**Response:** <br>
For payment downtime response please click [here](https://razorpay.com/docs/api/payments/downtime/#fetch-payment-downtime-details)

-------------------------------------------------------------------------------------------------------

### Fetch Payment Downtime

```js
instance.payments.fetchPaymentDowntimeById(downtimeId)
```

**Parameters:**

| Name        | Type    | Description                          |
|-------------|---------|--------------------------------------|
| downtimeId* | string  | Id to fetch payment downtime         |

**Response:**
For payment downtime by id response please click [here](https://razorpay.com/docs/api/payments/downtime/#fetch-payment-downtime-details-by-id)
-------------------------------------------------------------------------------------------------------

### Payment capture settings API

```js
instance.orders.create({
  "amount":50000,
  "currency": "INR",
  "receipt": "rcptid_11",
  "payment": {
    "capture ": "automatic",
    "capture_options ": {
      "automatic_expiry_period ": 12,
      "manual_expiry_period ": 7200,
      "refund_speed": "optimum"
    }  
  }
})
```

**Parameters:**

| Name        | Type    | Description                          |
|-------------|---------|--------------------------------------|
| amount*          | integer | Amount of the order to be paid                                               |
| currency*        | string  | Currency of the order. Currently only `INR` is supported.       |
| receipt         | string  | Your system order reference id.                                              |
| payment         | object  | please refer this [doc](https://razorpay.com/docs/payments/payments/capture-settings/api/) for params                       |

**Response:** <br>
```json
{
  "id": "order_DBJOWzybf0sJbb",
  "entity": "order",
  "amount": 50000,
  "amount_paid": 0,
  "amount_due": 50000,
  "currency": "INR",
  "receipt": "rcptid_11",
  "status": "created",
  "attempts": 0,
  "notes": [],
  "created_at": 1566986570
}
```
-------------------------------------------------------------------------------------------------------

### Create Payment Json

```js
instance.payments.createPaymentJson({
  "amount": 100,
  "currency": "INR",
  "order_id": "order_EAkbvXiCJlwhHR",
  "email": "gaurav.kumar@example.com",
  "contact": 9090909090,
  "method": "card",
  "card":{
    "number": 4111111111111111,
    "name": "Gaurav",
    "expiry_month": 11,
    "expiry_year": 23,
    "cvv": 100
  }
})
```

**Parameters:**
 please refer this [doc](https://razorpay.com/docs/payment-gateway/s2s-integration/payment-methods/) for params

**Response:** <br>
```json
{
  "razorpay_payment_id": "pay_FVmAstJWfsD3SO",
  "next": [
    {
      "action": "redirect",
      "url": "https://api.razorpay.com/v1/payments/FVmAtLUe9XZSGM/authorize"
    },
    {
      "action": "otp_generate",
      "url": "https://api.razorpay.com/v1/payments/pay_FVmAstJWfsD3SO/otp_generate?track_id=FVmAtLUe9XZSGM&key_id=<YOUR_KEY_ID>"
    }
  ]
}
```
-------------------------------------------------------------------------------------------------------

### OTP Generate

```js
var instance = new Razorpay({ key_id: "key", key_secret: ""}) // Use only razorpay key

instance.payments.otpGenerate(paymentId)
```

**Parameters:**
| Name        | Type    | Description                          |
|-------------|---------|--------------------------------------|
| paymentId*    | integer | Unique identifier of the payment |

Doc reference [doc](https://razorpay.com/docs/payments/payment-gateway/s2s-integration/json/v2/build-integration/cards/#otp-generation-)

**Response:** <br>
```json
{
 "razorpay_payment_id": "pay_FVmAstJWfsD3SO",
 "next": [
  {
   "action": "otp_submit",
   "url": "https://api.razorpay.com/v1/payments/pay_FVmAstJWfsD3SO/otp_submit/ac2d415a8be7595de09a24b41661729fd9028fdc?key_id=<YOUR_KEY_ID>"
  },
  {
   "action": "otp_resend",
   "url": "https://api.razorpay.com/v1/payments/pay_FVmAstJWfsD3SO/otp_resend/json?key_id=<YOUR_KEY_ID>"
  }
 ],
 "metadata": {
  "issuer": "HDFC",
  "network": "MC",
  "last4": "1111",
  "iin": "411111"
 }
}
```
-------------------------------------------------------------------------------------------------------

### OTP Submit

```js
instance.payments.otpSubmit(paymentId,{
  "otp": "12345"
})
```

**Parameters:**

| Name        | Type    | Description                          |
|-------------|---------|--------------------------------------|
| paymentId*    | integer | Unique identifier of the payment  |
| otp*    | string | The customer receives the OTP using their preferred notification medium - SMS or email |

Doc reference [doc](https://razorpay.com/docs/payments/payment-gateway/s2s-integration/json/v2/build-integration/cards/#response-on-submitting-otp)

**Response:** <br>
Success
```json
{
 "razorpay_payment_id": "pay_D5jmY2H6vC7Cy3",
 "razorpay_order_id": "order_9A33XWu170gUtm",
 "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
}
```
Failure
```json
{
  "error": {
    "code" : "BAD_REQUEST_ERROR",
    "description": "payment processing failed because of incorrect otp"
  },
  "next": ["otp_submit", "otp_resend"]
}
```
-------------------------------------------------------------------------------------------------------

### OTP Resend

```js
instance.payments.otpResend(paymentId)
```

**Parameters:**

| Name        | Type    | Description                          |
|-------------|---------|--------------------------------------|
| paymentId*    | integer | Unique identifier of the payment |

Doc reference [doc](https://razorpay.com/docs/payments/payment-methods/cards/authentication/native-otp/#otp-resend)

**Response:** <br>

```json
{
  "next": [
    "otp_submit",
    "otp_resend"
  ],
  "razorpay_payment_id": "pay_JWaNvYmrx75sXo"
}
```
-------------------------------------------------------------------------------------------------------

**PN: * indicates mandatory fields**
<br>
<br>
**For reference click [here](https://razorpay.com/docs/api/payments/)**