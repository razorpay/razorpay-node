## Register emandate and charge first payment together

### Create customer
```js
instance.customers.create({
  "name": "Gaurav Kumar",
  "contact": 9123456780,
  "email": "gaurav.kumar@example.com",
  "fail_existing": false,
  "gstin": "29XAbbA4369J1PA",
  "notes": {
    "notes_key_1": "Tea, Earl Grey, Hot",
    "notes_key_2": "Tea, Earl Grey… decaf."
  }
})
```
**Parameters:**

| Name          | Type        | Description                                 |
|---------------|-------------|---------------------------------------------|
| name*          | string      | Name of the customer                        |
| email        | string      | Email of the customer                       |
| contact      | string      | Contact number of the customer              |
| fail_existing | string | If a customer with the same details already exists, the request throws an exception by default. Possible value is `true` or `false`|
| notes         | object      | A key-value pair                            |

**Response:**
```json
{
  "id": "cust_1Aa00000000003",
  "entity": "customer",
  "name": "Gaurav Kumar",
  "email": "Gaurav.Kumar@example.com",
  "contact": "9000000000",
  "gstin": null,
  "notes": {
    "notes_key_1": "Tea, Earl Grey, Hot",
    "notes_key_2": "Tea, Earl Grey… decaf."
  },
  "created_at": 1582033731
}
```
-------------------------------------------------------------------------------------------------------

### Create order

```js
instance.orders.create({
  "amount": 0,
  "currency": "INR",
  "method": "emandate",
  "customer_id": "cust_1Aa00000000001",
  "receipt": "Receipt No. 1",
  "notes": {
    "notes_key_1": "Beam me up Scotty",
    "notes_key_2": "Engage"
  },
  "token": {
    "first_payment_amount": 100,
    "auth_type": "netbanking",
    "max_amount": 9999900,
    "expire_at": 4102444799,
    "notes": {
      "notes_key_1": "Tea, Earl Grey, Hot",
      "notes_key_2": "Tea, Earl Grey… decaf."
    },
    "bank_account": {
      "beneficiary_name": "Gaurav Kumar",
      "account_number": "1121431121541121",
      "account_type": "savings",
      "ifsc_code": "HDFC0000001"
    }
  }
})
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| amount*   | integer      | The amount to be captured (should be equal to the authorized amount, in paise) |
| currency*   | string  | The currency of the payment (defaults to INR)  |
| customerId*   | string      | The id of the customer to be fetched |
| payment_capture* |  boolean  | Indicates whether payment status should be changed to `captured` automatically or not. Possible values: true - Payments are captured automatically. false - Payments are not captured automatically.|
| method*      | string  | Payment method used to make the registration transaction. Possible value is `emandate`. |
| receipt      | string  | Your system order reference id.  |
| token  | object  | All keys listed [here](https://razorpay.com/docs/api/recurring-payments/emandate/auto-debit/#112-create-an-order) are supported |
| notes | object  | A key-value pair  |

**Response:**
For create order response please click [here](https://razorpay.com/docs/api/recurring-payments/emandate/auto-debit/#112-create-an-order)

-------------------------------------------------------------------------------------------------------

### Create an Authorization Payment

Please refer this [doc](https://razorpay.com/docs/api/recurring-payments/emandate/auto-debit/#113-create-an-authorization-payment) for authorization payment

-----------------------------------------------------------------------------------------------------

### Create registration link

```js
instance.subscriptions.createRegistrationLink({
  "customer": {
    "name": "Gaurav Kumar",
    "email": "gaurav.kumar@example.com",
    "contact": "9123456780"
  },
  "type": "link",
  "amount": 0,
  "currency": "INR",
  "description": "12 p.m. Meals",
  "subscription_registration": {
    "first_payment_amount": 100,
    "method": "emandate",
    "auth_type": "netbanking",
    "expire_at": 1580480689,
    "max_amount": 50000,
    "bank_account": {
      "beneficiary_name": "Gaurav Kumar",
      "account_number": "11214311215411",
      "account_type": "savings",
      "ifsc_code": "HDFC0001233"
    }
  },
  "receipt": "Receipt no. 1",
  "expire_by": 1880480689,
  "sms_notify": true,
  "email_notify": true,
  "notes": {
    "note_key 1": "Beam me up Scotty",
    "note_key 2": "Tea. Earl Gray. Hot."
  }
})
```

**Parameters:**

| Name            | Type    | Description                                                   |
|-----------------|---------|---------------------------------------------------------------|
| customer   | object      | Details of the customer to whom the registration link will be sent. |
| type*  | object | the value is `link`. |
| amount*   | integer      | The amount to be captured (should be equal to the authorized amount, in paise) |
| currency*   | string  | The currency of the payment (defaults to INR)  |
| description*  | string      | A brief description of the payment.   |
| subscription_registration   | object  | All keys listed [here](https://razorpay.com/docs/api/recurring-payments/emandate/auto-debit/#121-create-a-registration-link) are supported  |
| receipt      | string  | Your system order reference id.  |
| sms_notify  | boolean  | SMS notifications are to be sent by Razorpay (default : true)  |
| email_notify | boolean  | Email notifications are to be sent by Razorpay (default : true)  |
| expire_by    | integer | The timestamp, in Unix format, till when the customer can make the authorization payment. |
| notes | object  | A key-value pair  |

**Response:**
For create registration link response please click [here](https://razorpay.com/docs/api/recurring-payments/emandate/auto-debit/#12-using-a-registration-link)

-------------------------------------------------------------------------------------------------------

## Create an order to charge the customer

```js
instance.orders.create({
  "amount":1000,
  "currency":"INR",
  "payment_capture": true,
  "receipt":"Receipt No. 1",
  "notes": {
    "notes_key_1":"Tea, Earl Grey, Hot",
    "notes_key_2":"Tea, Earl Grey… decaf."
  }
})
```
**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| amount*   | integer      | The amount to be captured (should be equal to the authorized amount, in paise) |
| currency*   | string  | The currency of the payment (defaults to INR)  |
| receipt      | string  | Your system order reference id.  |
| payment_capture* |  boolean  | Indicates whether payment status should be changed to `captured` automatically or not. Possible values: true - Payments are captured automatically. false - Payments are not captured automatically.|
| notes | object  | A key-value pair  |

**Response:**
```json
{
   "id":"order_1Aa00000000002",
   "entity":"order",
   "amount":1000,
   "amount_paid":0,
   "amount_due":1000,
   "currency":"INR",
   "receipt":"Receipt No. 1",
   "offer_id":null,
   "status":"created",
   "attempts":0,
   "notes":{
      "notes_key_1":"Tea, Earl Grey, Hot",
      "notes_key_2":"Tea, Earl Grey… decaf."
   },
   "created_at":1579782776
}
```
-------------------------------------------------------------------------------------------------------

## Create a recurring payment

```js
instance.payments.createRecurringPayment({
  "email": "gaurav.kumar@example.com",
  "contact": "9123456789",
  "amount": 1000,
  "currency": "INR",
  "order_id": "order_1Aa00000000002",
  "customer_id": "cust_1Aa00000000001",
  "token": "token_1Aa00000000001",
  "recurring": true,
  "description": "Creating recurring payment for Gaurav Kumar",
  "notes": {
    "note_key 1": "Beam me up Scotty",
    "note_key 2": "Tea. Earl Gray. Hot."
  }
})
```
**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| email*   | string      | The customer's email address |
| contact*   | string      | The customer's phone number |
| amount*   | integer      | The amount to be captured (should be equal to the authorized amount, in paise) |
| currency*   | string  | The currency of the payment (defaults to INR)  |
| orderId*   | string      | The id of the order to be fetched |
| customerId*   | string      | The id of the customer to be fetched |
| tokenId*   | string      | The id of the token to be fetched |
| recurring*   | boolean      | Possible values is `true` or `false` |
| description  | string      | A brief description of the payment.   |
| notes | object  | A key-value pair  |

**Response:**
```json
{
  "razorpay_payment_id" : "pay_1Aa00000000001",
  "razorpay_order_id" : "order_1Aa00000000001",
  "razorpay_signature" : "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
}
```
-------------------------------------------------------------------------------------------------------

## Send/Resend notifications

```js
instance.invoices.notifyBy(invoiceId,medium)
```
**Parameters:**

| Name            | Type    |Description      |
|-----------------|---------|------------------------------------------------------------------------------|
| invoiceId*   | string      | The id of the invoice to be fetched |
| medium*   | string      | Possible values are `sms` or `email` |

**Response:**
```json
{
    "success": true
}
```
-------------------------------------------------------------------------------------------------------

## Cancel registration link

```js
instance.invoices.cancel(invoiceId)
```
**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| invoiceId*   | string      | The id of the invoice to be fetched |

**Response:**
```json
{
    "id": "inv_FHrfRupD2ouKIt",
    "entity": "invoice",
    "receipt": "Receipt No. 1",
    "invoice_number": "Receipt No. 1",
    "customer_id": "cust_BMB3EwbqnqZ2EI",
    "customer_details": {
        "id": "cust_BMB3EwbqnqZ2EI",
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9123456780",
        "gstin": null,
        "billing_address": null,
        "shipping_address": null,
        "customer_name": "Gaurav Kumar",
        "customer_email": "gaurav.kumar@example.com",
        "customer_contact": "9123456780"
    },
    "order_id": "order_FHrfRw4TZU5Q2L",
    "line_items": [],
    "payment_id": null,
    "status": "cancelled",
    "expire_by": 4102444799,
    "issued_at": 1595491479,
    "paid_at": null,
    "cancelled_at": 1595491488,
    "expired_at": null,
    "sms_status": "sent",
    "email_status": "sent",
    "date": 1595491479,
    "terms": null,
    "partial_payment": false,
    "gross_amount": 100,
    "tax_amount": 0,
    "taxable_amount": 0,
    "amount": 100,
    "amount_paid": 0,
    "amount_due": 100,
    "currency": "INR",
    "currency_symbol": "₹",
    "description": "Registration Link for Gaurav Kumar",
    "notes": {
        "note_key 1": "Beam me up Scotty",
        "note_key 2": "Tea. Earl Gray. Hot."
    },
    "comment": null,
    "short_url": "https://rzp.io/i/QlfexTj",
    "view_less": true,
    "billing_start": null,
    "billing_end": null,
    "type": "link",
    "group_taxes_discounts": false,
    "created_at": 1595491480,
    "idempotency_key": null
}
```
-------------------------------------------------------------------------------------------------------

## Fetch token by payment id

```js
instance.payments.fetch(paymentId)
```
**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| paymentId*   | string      | The id of the payment to be fetched |

**Response:**
```json
{
    "id": "pay_Jfmt23iAUaxyV3",
    "entity": "payment",
    "amount": 0,
    "currency": "INR",
    "status": "captured",
    "order_id": "order_JfmsUQyMCg7Bvz",
    "invoice_id": "inv_JfmsUQAF4i4kqJ",
    "international": false,
    "method": "emandate",
    "amount_refunded": 0,
    "refund_status": null,
    "captured": true,
    "description": "Invoice #inv_JfmsUQAF4i4kqJ",
    "card_id": null,
    "bank": "HDFC",
    "wallet": null,
    "vpa": null,
    "email": "test@test.com",
    "contact": "+919999999999",
    "customer_id": "cust_DzYEzfJLV03rkp",
    "token_id": "token_Jfmt28DxdV3VIb",
    "notes": {
        "note_key 1": "Beam me up Scotty",
        "note_key 2": "Tea. Earl Gray. Hot."
    },
    "fee": 2360,
    "tax": 360,
    "error_code": null,
    "error_description": null,
    "error_source": null,
    "error_step": null,
    "error_reason": null,
    "acquirer_data": {},
    "created_at": 1654863152
}
```
-------------------------------------------------------------------------------------------------------

## Fetch tokens by customer id

```js
instance.customers.fetchTokens(customerId)
```
**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| customerId*   | string      | The id of the customer to be fetched |

**Response:**
```json
{
  "entity": "collection",
  "count": 1,
  "items": [
    {
      "id": "token_FHf94Uym9tdYFJ",
      "entity": "token",
      "token": "2wDPM7VAlXtjAR",
      "bank": "HDFC",
      "wallet": null,
      "method": "emandate",
      "vpa": null,
      "recurring": true,
      "recurring_details": {
        "status": "confirmed",
        "failure_reason": null
      },
      "auth_type": "netbanking",
      "mrn": null,
      "used_at": 1595447381,
      "created_at": 1595447381,
      "bank_details": {
        "beneficiary_name": "Gaurav Kumar",
        "account_number": "1121431121541121",
        "ifsc": "HDFC0000001",
        "account_type": "savings"
      },
      "max_amount": 9999900,
      "expired_at": 1689971140,
      "dcc_enabled": false
    }
  ]
}
```
-------------------------------------------------------------------------------------------------------

## Delete tokens

```js
instance.customers.deleteToken(customerId, tokenId)
```
**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| customerId*   | string      | The id of the customer to be fetched |
| tokenId*   | string      | The id of the token to be fetched |

**Response:**
```json
{
    "deleted": true
}
```
-------------------------------------------------------------------------------------------------------

**PN: * indicates mandatory fields**
<br>
<br>
**For reference click [here](https://razorpay.com/docs/api/recurring-payments/emandate/auto-debit/)**