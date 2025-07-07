## Emandates

### Create customer
```js
instance.customers.create({
  "name": "Gaurav Kumar",
  "contact": 9123456780,
  "email": "gaurav.kumar@example.com",
  "fail_existing": "1",
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
| fail_existing | string | If a customer with the same details already exists, the request throws an exception by default. Possible value is `1` or `0`|
| contact      | string      | Contact number of the customer              |
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
    "auth_type": "netbanking",
    "max_amount": 9999900,
    "expire_at": 4102444799,
    "notes": {
      "notes_key_1": "Tea, Earl Grey, Hot",
      "notes_key_2": "Tea, Earl Grey… decaf."
    },
    "bank_account": {
      "beneficiary_name": "Gaurav Kumar",
      "account_number": 1121431121541121,
      "account_type": "savings",
      "ifsc_code": "HDFC0000001"
    }
  }
})
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| amount*          | integer | Amount of the order to be paid                                               |
| currency*        | string  | Currency of the order. Currently only `INR` is supported.                      |
| method*        | string  | The authorization method. In this case the value will be `emandate`                      |
| receipt         | string  | Your system order reference id.                                              |
| payment_capture  | boolean  | Indicates whether payment status should be changed to captured automatically or not. Possible values: true - Payments are captured automatically. false - Payments are not captured automatically. |
| notes           | object  | A key-value pair                                                             |
| token  | array  | All parameters listed [here](https://razorpay.com/docs/api/payments/recurring-payments/emandate/create-authorization-transaction/#112-create-an-order) are supported|

**Response:**
Create order response please click [here](https://razorpay.com/docs/api/recurring-payments/emandate/authorization-transaction/#112-create-an-order)

-------------------------------------------------------------------------------------------------------

### Create an Authorization Payment

Please refer this [doc](https://razorpay.com/docs/api/recurring-payments/emandate/authorization-transaction/#113-create-an-authorization-payment) for authorization payment

-------------------------------------------------------------------------------------------------------

### Create registration link

```js
instance.subscriptions.createRegistrationLink({
  "customer": {
    "name": "Gaurav Kumar",
    "email": "gaurav.kumar@example.com",
    "contact": 9123456780
  },
  "type": "link",
  "amount": 0,
  "currency": "INR",
  "description": "12 p.m. Meals",
  "subscription_registration": {
    "method": "emandate",
    "auth_type": "netbanking",
    "expire_at": 1580480689,
    "max_amount": 50000,
    "bank_account": {
      "beneficiary_name": "Gaurav Kumar",
      "account_number": 11214311215411,
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

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| customer*          | array  | All parameters listed [here](https://razorpay.com/docs/api/payments/recurring-payments/emandate/create-authorization-transaction/#121-create-a-registration-link) are supported  |
| type*        | string  | In this case, the value is `link`.                      |
| currency*        | string  | The 3-letter ISO currency code for the payment. Currently, only `INR` is supported. |
| amount*         | integer  | The payment amount in the smallest currency sub-unit.                 |
| description*    | string  | A description that appears on the hosted page. For example, `12:30 p.m. Thali meals (Gaurav Kumar`).                                                             |
| subscription_registration  | array  | All parameters listed [here](https://razorpay.com/docs/api/payments/recurring-payments/emandate/create-authorization-transaction/#121-create-a-registration-link) are supported  |
| email_notify | boolean  | Email notifications are to be sent by Razorpay (default : true)  |
| expire_by    | integer | The timestamp, in Unix format, till when the customer can make the authorization payment. |
| receipt      | string  | Your system order reference id.  |
| notes           | array  | A key-value pair  |

**Response:**
Create registration link response please click [here](https://razorpay.com/docs/api/recurring-payments/emandate/authorization-transaction/#121-create-a-registration-link)

-------------------------------------------------------------------------------------------------------

### Send/Resend notifications

```js
instance.invoices.notifyBy(invoiceId, medium)
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| invoiceId*          | string | The id of the invoice to be notified                         |
| medium*          | string | `sms`/`email`, Medium through which notification should be sent.                         |

**Response:**
```json
{
    "success": true
}
```
-------------------------------------------------------------------------------------------------------

### Cancel a registration link

```js
instance.invoices.cancel(invoiceId)
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| invoiceId*          | string | The id of the invoice to be cancelled                         |

**Response:**
```json
{
  "amount": 1000,
  "amount_due": 1000,
  "amount_paid": 0,
  "billing_end": null,
  "billing_start": null,
  "cancelled_at": 1654863562,
  "comment": null,
  "created_at": 1649234296,
  "currency": "INR",
  "currency_symbol": "₹",
  "customer_details": {
    "billing_address": null,
    "contact": "9000000555",
    "customer_contact": "9000000555",
    "customer_email": "sunila.kumar@example.com",
    "customer_name": "sunila Kumar",
    "email": "sunila.kumar@example.com",
    "gstin": null,
    "id": "cust_JFz35u2L3c6KJl",
    "name": "sunila Kumar",
    "shipping_address": null
  },
  "customer_id": "cust_JFz35u2L3c6KJl",
  "date": 1649234274,
  "description": null,
  "email_status": "sent",
  "entity": "invoice",
  "expire_by": null,
  "expired_at": null,
  "first_payment_min_amount": null,
  "gross_amount": 1000,
  "group_taxes_discounts": false,
  "id": "inv_JG0VrkxMf9ThJc",
  "idempotency_key": null,
  "invoice_number": "kfkjskfhdskfhdskjf",
  "issued_at": 1649234296,
  "line_items": [
    {
      "amount": 1000,
      "currency": "INR",
      "description": null,
      "gross_amount": 1000,
      "hsn_code": null,
      "id": "li_JG0VrmZ3JUc9VY",
      "item_id": "item_J7lZCyxMVeEtYB",
      "name": "Test item",
      "net_amount": 1000,
      "quantity": 1,
      "ref_id": null,
      "ref_type": null,
      "sac_code": null,
      "tax_amount": 0,
      "tax_inclusive": false,
      "tax_rate": null,
      "taxable_amount": 1000,
      "taxes": [],
      "type": "invoice",
      "unit": null,
      "unit_amount": 1000
    }
  ],
  "notes": [],
  "order_id": "order_JG0VrpJjveUpUa",
  "paid_at": null,
  "partial_payment": false,
  "payment_id": null,
  "receipt": "kfkjskfhdskfhdskjf",
  "reminder_status": null,
  "short_url": "https://rzp.io/i/O2yqvfqy5j",
  "sms_status": "sent",
  "status": "cancelled",
  "subscription_status": null,
  "supply_state_code": null,
  "tax_amount": 0,
  "taxable_amount": 1000,
  "terms": null,
  "type": "invoice",
  "user_id": "Hn1ukgebfkBJ4L",
  "view_less": true
}
```
-------------------------------------------------------------------------------------------------------

### Fetch token by payment ID

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
  "id": "pay_FHf9a7AO0iXM9I",
  "entity": "payment",
  "amount": 0,
  "currency": "INR",
  "status": "captured",
  "order_id": "order_FHf9OwSeyetnKC",
  "invoice_id": "inv_FHf9P2hhXEti7i",
  "international": false,
  "method": "emandate",
  "amount_refunded": 0,
  "refund_status": null,
  "captured": true,
  "description": null,
  "card_id": null,
  "bank": "HDFC",
  "wallet": null,
  "vpa": null,
  "email": "gaurav.kumar@example.com",
  "contact": "+919876543210",
  "customer_id": "cust_DtHaBuooGHTuyZ",
  "token_id": "token_FHf9aAZR9hWJkq",
  "notes": {
    "note_key 1": "Beam me up Scotty",
    "note_key 2": "Tea. Earl Gray. Hot."
  },
  "fee": 0,
  "tax": 0,
  "error_code": null,
  "error_description": null,
  "error_source": null,
  "error_step": null,
  "error_reason": null,
  "acquirer_data": {},
  "created_at": 1595447410
}
```
-------------------------------------------------------------------------------------------------------

### Fetch tokens by customer ID

```js
instance.customers.fetchTokens(customerId)
```

**Parameters:**

| Name          | Type        | Description                                 |
|---------------|-------------|---------------------------------------------|
| customerId*          | string      | The id of the customer to be fetched |

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

### Delete token

```js
instance.customers.deleteToken(customerId, tokenId)
```

**Parameters:**

| Name          | Type        | Description                                 |
|---------------|-------------|---------------------------------------------|
| customerId*          | string      | The id of the customer to be fetched |
| tokenId*          | string      | The id of the token to be fetched |

**Response:**
```json
{
    "deleted": true
}
```
-------------------------------------------------------------------------------------------------------

### Create an order to charge the customer

```js
instance.orders.create({
  "amount":1000,
  "currency":"INR",
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
| amount*          | integer | Amount of the order to be paid                                               |
| currency*        | string  | Currency of the order. Currently only `INR` is supported.                      |
| receipt         | string  | Your system order reference id.                                              |
| notes           | object  | A key-value pair                                                             |
| payment_capture  | boolean  | Indicates whether payment status should be changed to captured automatically or not. Possible values: true - Payments are captured automatically. false - Payments are not captured automatically. |

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

### Create a Recurring Payment

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
| email*          | string | The customer's email address.                                               |
| contact*        | string  | The customer's phone number.                      |
| amount*         | integer  | The amount you want to charge your customer. This should be the same as the amount in the order.                        |
| currency*        | string  | The 3-letter ISO currency code for the payment. Currently, only `INR` is supported. |
| order_id*        | string  | The unique identifier of the order created. |
| customer_id*        | string  | The `customer_id` for the customer you want to charge.  |
| token*        | string  | The `token_id` generated when the customer successfully completes the authorization payment. Different payment instruments for the same customer have different `token_id`.|
| recurring*        | string  | Determines if recurring payment is enabled or not. Possible values:<br>* `true` - Recurring is enabled.* `false` - Recurring is not enabled.|
| description | string  | A user-entered description for the payment.|
| notes       | object  | Key-value pair that can be used to store additional information about the entity. Maximum 15 key-value pairs, 256 characters (maximum) each. |

**Response:**
```json
{
  "razorpay_payment_id" : "pay_1Aa00000000001",
  "razorpay_order_id" : "order_1Aa00000000001",
  "razorpay_signature" : "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
}
```
-------------------------------------------------------------------------------------------------------

**PN: * indicates mandatory fields**
<br>
<br>
**For reference click [here](https://razorpay.com/docs/api/recurring-payments/emandate/authorization-transaction/)**