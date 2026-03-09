## Orders

### Create order

```js
instance.orders.create({
  "amount": 50000,
  "currency": "INR",
  "receipt": "receipt#1",
  "partial_payment": false,
  "notes": {
    "key1": "value3",
    "key2": "value2"
  }
})
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| amount*          | integer | Amount of the order to be paid                                               |
| currency*        | string  | Currency of the order. Currently only `INR` is supported.                      |
| receipt         | string  | Your system order reference id.                                              |
| notes           | object  | A key-value pair  |
|partial_payment | boolean  | Indicates whether customers can make partial payments on the invoice . Possible values: true - Customer can make partial payments. false (default) - Customer cannot make partial payments. |

**Response:**

```json
{
  "id": "order_EKwxwAgItmmXdp",
  "entity": "order",
  "amount": 50000,
  "amount_paid": 0,
  "amount_due": 50000,
  "currency": "INR",
  "receipt": "receipt#1",
  "offer_id": null,
  "status": "created",
  "attempts": 0,
  "notes": [],
  "created_at": 1582628071
}
```

-------------------------------------------------------------------------------------------------------

### Create order (Third party validation)

```js
instance.orders.create({
  "amount": 500,
  "method": "netbanking",
  "receipt": "BILL13375649",
  "currency": "INR",
  "bank_account": {
    "account_number": "765432123456789",
    "name": "Gaurav Kumar",
    "ifsc": "HDFC0000053"
  }
})
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| amount*          | integer | Amount of the order to be paid                                               |
| method        | string  | The payment method used to make the payment. If this parameter is not passed, customers will be able to make payments using both netbanking and UPI payment methods. Possible values is `netbanking` or `upi`|
| currency*        | string  | Currency of the order. Currently only `INR` is supported.       |
| receipt         | string  | Your system order reference id.                                              |
| notes         | array      | A key-value pair  |
|bank_account | array  | All keys listed [here](https://razorpay.com/docs/payments/third-party-validation/#step-2-create-an-order) are supported |

**Response:**

```json
{
  "id": "order_GAWN9beXgaqRyO",
  "entity": "order",
  "amount": 500,
  "amount_paid": 0,
  "amount_due": 500,
  "currency": "INR",
  "receipt": "BILL13375649",
  "offer_id": null,
  "status": "created",
  "attempts": 0,
  "notes": [],
  "created_at": 1573044247
}
```

-------------------------------------------------------------------------------------------------------

### Fetch all orders

```js
instance.orders.all(option)
```

**Parameters**

| Name       | Type      | Description                                                  |
|------------|-----------|--------------------------------------------------------------|
| from       | timestamp | timestamp after which the orders were created              |
| to         | timestamp | timestamp before which the orders were created             |
| count      | integer   | number of orders to fetch (default: 10)                    |
| skip       | integer   | number of orders to be skipped (default: 0)                |
| authorized | boolean   | Orders for which orders are currently in authorized state. |
| receipt    | string    | Orders with the provided value for receipt.                  |
| expand[]   | string    |  Used to retrieve additional information about the payment. Possible value is `payments`,`payments.card`,`transfers` or `virtual_account` |

**Response:**

```json
{
  "entity": "collection",
  "count": 1,
  "items": [
    {
      "id": "order_EKzX2WiEWbMxmx",
      "entity": "order",
      "amount": 1234,
      "amount_paid": 0,
      "amount_due": 1234,
      "currency": "INR",
      "receipt": "Receipt No. 1",
      "offer_id": null,
      "status": "created",
      "attempts": 0,
      "notes": [],
      "created_at": 1582637108
    }
  ]
}
```
-------------------------------------------------------------------------------------------------------

### Fetch an Order With Id

```js
instance.orders.fetch(orderId)
```
**Parameters**

| Name     | Type   | Description                         |
|----------|--------|-------------------------------------|
| orderId* | string | The id of the order to be fetched |

**Response:**

```json
{
  "id": "order_Jhgp4wIVHQrg5H",
  "entity": "order",
  "amount": 100,
  "amount_paid": 0,
  "amount_due": 100,
  "currency": "INR",
  "receipt": "123",
  "offer_id": null,
  "status": "created",
  "attempts": 0,
  "notes": {
    "key1": "value3",
    "key2": "value2"
  },
  "created_at": 1655278478
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
  "entity":"collection",
  "count":1,
  "items":[
    {
      "id":"pay_DaaSOvhgcOfzgR",
      "entity":"payment",
      "amount":2200,
      "currency":"INR",
      "status":"captured",
      "order_id":"order_DaaS6LOUAASb7Y",
      "invoice_id":null,
      "international":false,
      "method":"card",
      "amount_refunded":0,
      "refund_status":null,
      "captured":true,
      "description":"Beans in every imaginable flavour",
      "card_id":"card_DZon6fd8J3IcA2",
      "bank":null,
      "wallet":null,
      "vpa":null,
      "email":"gaurav.kumar@example.com",
      "contact":"+919999999988",
      "notes":[],
      "fee":44,
      "tax":0,
      "error_code":null,
      "error_description":null,
      "created_at":1572505160
    }
  ]
}
```
-------------------------------------------------------------------------------------------------------

### Update order

```js
instance.orders.edit(orderId,{
  "notes": {
    "key1": "value3",
    "key2": "value2"
  }
})
```
**Parameters**

| Name     | Type   | Description                         |
|----------|--------|-------------------------------------|
| orderId* | string | The id of the order to be retrieve payment info |
| notes*   | object  | A key-value pair                    |

**Response:**
```json
{
  "id":"order_DaaS6LOUAASb7Y",
  "entity":"order",
  "amount":2200,
  "amount_paid":0,
  "amount_due":2200,
  "currency":"INR",
  "receipt":"Receipt #211",
  "offer_id":null,
  "status":"attempted",
  "attempts":1,
  "notes":{
    "notes_key_1":"Tea, Earl Grey, Hot",
    "notes_key_2":"Tea, Earl Grey… decaf."
  },
  "created_at":1572505143
}
```
-------------------------------------------------------------------------------------------------------


### Create an order (Magic checkout)

```js
instance.orders.create({
   "amount": 50000,
   "currency": "INR",
   "receipt": "receipt#22",
   "notes": {
       "key1": "value3",
       "key2": "value2"
   },
   "rto_review": true,
   "line_items": [
       {
           "type": "e-commerce",
           "sku": "1g234",
           "variant_id": "12r34",
           "price": "3900",
           "offer_price": "3800",
           "tax_amount": 0,
           "quantity": 1,
           "name": "TEST",
           "description": "TEST",
           "weight": "1700",
           "dimensions": {
               "length": "1700",
               "width": "1700",
               "height": "1700"
           },
           "image_url": "https://unsplash.com/s/photos/new-wallpaper",
           "product_url": "https://unsplash.com/s/photos/new-wallpaper",
           "notes": {}
       }
   ],
   "line_items_total": "1200",
   "shipping_fee": 100,
   "cod_fee": 100,
   "customer_details": {
       "name": "Gaurav Kumar",
       "contact": "+919000090000",
       "email": "gaurav.kumar@example.com",
       "shipping_address": {
           "name": "Gaurav Kumar",
           "line1": "84th floor, Millennium Tower",
           "line2": "2nd main",
           "zipcode": "560000",
           "contact": "+919000090000",
           "city": "Bangalore",
           "state": "Karnataka",
           "country": "IND",
           "tag": "home",
           "landmark": "XYZ Hospital"
       },
       "billing_address": {
           "name": "Gaurav Kumar",
           "line1": "84th floor, Millennium Tower",
           "line2": "2nd main",
           "zipcode": "560000",
           "contact": "+919000090000",
           "city": "Bangalore",
           "state": "Karnataka",
           "country": "IND",
           "tag": "home",
           "landmark": "XYZ Hospital"
       }
   },
   "promotions": [{
       "reference_id": "reference",
       "code": "code",
       "type": "discount",
       "value": 20,
       "value_type": "flat",
       "description": "description"
   }],
   "device_details": {
       "ip": "127.0.0.1",
       "user_agent": "abc"
   }
});
```
**Parameters**

| Name     | Type   | Description                         |
|----------|--------|-------------------------------------|
| amount* | integer | The transaction amount, expressed in the currency subunit, such as paise (in case of INR). |
| currency* | string  | The currency in which the transaction should be made. default value is `INR`|
| receipt | string  | Your receipt id for this order should be passed here. Maximum length of 40 characters. |
| notes | array  | Key-value pair that can be used to store additional information about the entity.|
| rto_review | boolean  | Identifier to mark the order eligible for RTO risk prediction. Possible values is `true` or `false` |
| line_items | array  | All keys listed [here](https://razorpay.com/docs/payments/magic-checkout/rto-intelligence/#step-1-create-an-order) are supported |
| line_items_total | integer  | Sum of offer_price for all line items added in the cart in paise.  |
| shipping_fee | integer  | Shipping fee charged on the line items in paisa. |
| cod_fee | integer  | COD fee charged on the line items in paisa. |
| promotions | array  | Used to pass all offer or discount related information including coupon code discount, method discount and so on. |
| customer | array  | All keys listed [here](https://razorpay.com/docs/payments/magic-checkout/rto-intelligence/#step-1-create-an-order) are supported |
| device_details | array  | All keys listed [here](https://razorpay.com/docs/payments/magic-checkout/rto-intelligence/#step-1-create-an-order) are supported |
| shipping_details | array  | All keys listed [here](https://razorpay.com/docs/payments/magic-checkout/rto-intelligence/#step-1-create-an-order) are supported |

**Response:**
```json
{
  "id": "order_MpyV7eOsTBn24z",
  "entity": "order",
  "amount": 50000,
  "amount_paid": 0,
  "amount_due": 50000,
  "currency": "INR",
  "receipt": "receipt#22",
  "status": "created",
  "attempts": 0,
  "notes": {
    "key1": "value3",
    "key2": "value2"
  },
  "created_at": 1697698714
}
```
-------------------------------------------------------------------------------------------------------

### View RTO/Risk Reasons

```js
var orderId = "order_DaaS6LOUAASb7Y";

instance.orders.viewRtoReview(orderId);
```
**Parameters**

| Name     | Type   | Description                         |
|----------|--------|-------------------------------------|
| orderId* | string | The id of the order to be retrieve payment info |
| notes*   | array  | A key-value pair                    |

**Response:**
```json
{
  "risk_tier": "high",
  "rto_reasons": [
    {
      "reason": "short_shipping_address",
      "description": "Short shipping address",
      "bucket": "address"
    },
    {
      "reason": "address_pincode_state_mismatch",
      "description": "Incorrect pincode state entered",
      "bucket": "address"
    }
  ]
}
```
-------------------------------------------------------------------------------------------------------

```js
var orderId = "order_DaaS6LOUAASb7Y";

instance.orders.editFulfillment(orderId, {
  "payment_method": "upi",
  "shipping": {
    "waybill": "123456789",
    "status": "rto",
    "provider": "Bluedart"
  }
});
```
**Parameters**

| Name     | Type   | Description                         |
|----------|--------|-------------------------------------|
| payment_method | string | The id of the order to be retrieve payment info |
| shipping | array  | All keys listed [here](https://razorpay.com/docs/payments/magic-checkout/rto-intelligence/#step-3-update-the-fulfillment-details) are supported |

**Response:**
```json
{
  "entity": "order.fulfillment",
  "order_id": "EKwxwAgItXXXX",
  "payment_method": "upi",
  "shipping": {
    "waybill": "123456789",
    "status": "rto",
    "provider": "Bluedart"
  }
}
```
-------------------------------------------------------------------------------------------------------

**PN: * indicates mandatory fields**
<br>
<br>
**For reference click [here](https://razorpay.com/docs/api/orders/)**