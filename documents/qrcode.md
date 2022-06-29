## Qr Codes

### Create Qr code

```js
instance.qrCode.create({
  "type": "upi_qr",
  "name": "Store_1",
  "usage": "single_use",
  "fixed_amount": true,
  "payment_amount": 300,
  "description": "For Store 1",
  "customer_id": "cust_HKsR5se84c5LTO",
  "close_by": 1681615838,
  "notes": {
    "purpose": "Test UPI QR code notes"
  }
})
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| type*          | string | The type of QR code i.e, `upi_qr`/`bharat_qr`                                  |
| name          | string | Label entered to identify the QR code.                              |
| usage*          | string | Indicates if the QR code should be allowed to accept single payment or multiple payments i.e, `single_use`/`multiple_use`     |
| fixed_amount          | boolean | Indicates if the QR should accept payments of specific amounts or any amount. |
| payment_amount(* mandatory if fixed_amount is true)          | integer | Indicates if the QR should accept payments of specific amounts or any amount. |
| customer_id          | string | Unique identifier of the customer the QR code is linked with |
| description          | string | A brief description about the QR code. |
| close_by          | integer | UNIX timestamp at which the QR code is scheduled to be automatically closed. The time must be at least 15 minutes after the current time.  |
| notes          | object | Key-value pair that can be used to store additional information about the QR code. Maximum 15 key-value pairs, 256 characters (maximum) each. |

**Response:**
```json
{
  "id": "qr_HMsVL8HOpbMcjU",
  "entity": "qr_code",
  "created_at": 1623660301,
  "name": "Store_1",
  "usage": "single_use",
  "type": "upi_qr",
  "image_url": "https://rzp.io/i/BWcUVrLp",
  "payment_amount": 300,
  "status": "active",
  "description": "For Store 1",
  "fixed_amount": true,
  "payments_amount_received": 0,
  "payments_count_received": 0,
  "notes": {
    "purpose": "Test UPI QR code notes"
  },
  "customer_id": "cust_HKsR5se84c5LTO",
  "close_by": 1681615838,
  "closed_at": 1623660445,
  "close_reason": "on_demand"
}
```
-------------------------------------------------------------------------------------------------------

### Create Qr code with GST

```js
instance.qrCode.create({
  "type": "upi_qr",
  "name": "Store_1",
  "usage": "single_use",
  "fixed_amount": true,
  "payment_amount": 300,
  "description": "For Store 1",
  "customer_id": "cust_HKsR5se84c5LTO",
  "close_by": 1681615838,
  "notes": {
    "purpose": "Test UPI QR code notes"
  },
  "tax_invoice": {
    "number": "INV001",
    "date": 1589994898,
    "customer_name": "Gaurav Kumar",
    "business_gstin": "06AABCU9605R1ZR",
    "gst_amount": 4000,
    "cess_amount": 0,
    "supply_type": "interstate"
  }
})
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| type*          | string | The type of QR code i.e, `upi_qr`/`bharat_qr`                                  |
| name          | string | Label entered to identify the QR code.                              |
| usage*          | string | Indicates if the QR code should be allowed to accept single payment or multiple payments i.e, `single_use`/`multiple_use`     |
| fixed_amount          | boolean | Indicates if the QR should accept payments of specific amounts or any amount. |
| payment_amount(* mandatory if fixed_amount is true)          | integer | Indicates if the QR should accept payments of specific amounts or any amount. |
| customer_id          | string | Unique identifier of the customer the QR code is linked with |
| description          | string | A brief description about the QR code. |
| close_by          | integer | UNIX timestamp at which the QR code is scheduled to be automatically closed. The time must be at least 15 minutes after the current time.  |
| notes          | object | Key-value pair that can be used to store additional information about the QR code. Maximum 15 key-value pairs, 256 characters (maximum) each. |
| tax_invoice          | object | This block contains information about the invoices. If not provided, the transaction will default to non-GST compliant UPI flow. |

**Response:**
```json
{
  "id": "qr_HMsVL8HOpbMcjU",
  "entity": "qr_code",
  "created_at": 1623660301,
  "name": "Store_1",
  "usage": "single_use",
  "type": "upi_qr",
  "image_url": "https://rzp.io/i/BWcUVrLp",
  "payment_amount": 300,
  "status": "active",
  "description": "For Store 1",
  "fixed_amount": true,
  "payments_amount_received": 0,
  "payments_count_received": 0,
  "notes": {
    "purpose": "Test UPI QR code notes"
  },
  "customer_id": "cust_HKsR5se84c5LTO",
  "close_by": 1681615838,
  "tax_invoice": {
    "number": "INV001",
    "date": 1589994898,
    "customer_name": "Gaurav Kumar",
    "business_gstin": "06AABCU9605R1ZR",
    "gst_amount": 4000,
    "cess_amount": 0,
    "supply_type": "interstate"
  }
}
```
-------------------------------------------------------------------------------------------------------

### Fetch all Qr code

```js
instance.qrCode.all()
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| from  | timestamp | timestamp after which the payments were created  |
| to    | timestamp | timestamp before which the payments were created |
| count | integer   | number of qrcodes to fetch (default: 10)        |
| skip  | integer   | number of qrcodes to be skipped (default: 0)    |

**Response:**
```json
{
  "entity": "collection",
  "count": 1,
  "items": [
    {
      "id": "qr_HO2jGkWReVBMNu",
      "entity": "qr_code",
      "created_at": 1623914648,
      "name": "Store_1",
      "usage": "single_use",
      "type": "upi_qr",
      "image_url": "https://rzp.io/i/w2CEwYmkAu",
      "payment_amount": 300,
      "status": "active",
      "description": "For Store 1",
      "fixed_amount": true,
      "payments_amount_received": 0,
      "payments_count_received": 0,
      "notes": {
        "purpose": "Test UPI QR code notes"
      },
      "customer_id": "cust_HKsR5se84c5LTO",
      "close_by": 1681615838,
      "closed_at": null,
      "close_reason": null
    }
  ]
}
```

-------------------------------------------------------------------------------------------------------

### Fetch a Qr code

```js
instance.qrCode.fetch(qrCodeId)
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| qrCodeId  | string | The id of the qr code to be fetched  |

**Response:**
```json
{
  "id": "qr_HO2e0813YlchUn",
  "entity": "qr_code",
  "created_at": 1623914349,
  "name": "Acme Groceries",
  "usage": "multiple_use",
  "type": "upi_qr",
  "image_url": "https://rzp.io/i/X6QM7LL",
  "payment_amount": null,
  "status": "closed",
  "description": "Buy fresh groceries",
  "fixed_amount": false,
  "payments_amount_received": 200,
  "payments_count_received": 1,
  "notes": {
    "Branch": "Bangalore - Rajaji Nagar"
  },
  "customer_id": "cust_HKsR5se84c5LTO",
  "close_by": 1625077799,
  "closed_at": 1623914515,
  "close_reason": "on_demand"
}
```
-------------------------------------------------------------------------------------------------------

### Fetch a Qr code for customer id

```js
 instance.qrCode.all({"customer_id":customerId})
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| customerId*  | string | The id of the customer to which qr code need to be fetched  |

**Response:**
```json
{
  "entity": "collection",
  "count": 1,
  "items": [
    {
      "id": "qr_HMsgvioW64f0vh",
      "entity": "qr_code",
      "created_at": 1623660959,
      "name": "Store_1",
      "usage": "single_use",
      "type": "upi_qr",
      "image_url": "https://rzp.io/i/DTa2eQR",
      "payment_amount": 300,
      "status": "active",
      "description": "For Store 1",
      "fixed_amount": true,
      "payments_amount_received": 0,
      "payments_count_received": 0,
      "notes": {
        "purpose": "Test UPI QR code notes"
      },
      "customer_id": "cust_HKsR5se84c5LTO",
      "close_by": 1681615838
    }
  ]
}
```
-------------------------------------------------------------------------------------------------------

### Fetch a Qr code for payment id

```js
 instance.qrCode.all({"payment_id":paymentId})
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| paymentId*  | string | The id of the payment to which qr code need to be fetched  |

**Response:**
```json
{
  "entity": "collection",
  "count": 1,
  "items": [
    {
      "id": "qr_HMsqRoeVwKbwAF",
      "entity": "qr_code",
      "created_at": 1623661499,
      "name": "Fresh Groceries",
      "usage": "multiple_use",
      "type": "upi_qr",
      "image_url": "https://rzp.io/i/eI9XD54Q",
      "payment_amount": null,
      "status": "active",
      "description": "Buy fresh groceries",
      "fixed_amount": false,
      "payments_amount_received": 1000,
      "payments_count_received": 1,
      "notes": [],
      "customer_id": "cust_HKsR5se84c5LTO",
      "close_by": 1624472999,
      "close_reason": "on_demand"
    }
  ]
}
```
-------------------------------------------------------------------------------------------------------

### Fetch Payments for a QR Code

```js
instance.qrCode.fetchAllPayments(qrCodeId, options)
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| qrCodeId*  | string | The id of the qr code to which qrcode where made |
| from  | timestamp | timestamp after which the qrcodes were created  |
| to    | timestamp | timestamp before which the qrcodes were created |
| count | integer   | number of qrcodes to fetch (default: 10)        |
| skip  | integer   | number of qrcodes to be skipped (default: 0)    |

**Response:**
```json
{
  "entity": "collection",
  "count": 1,
  "items": [
    {
      "id": "pay_HMtDKn3TnF4D8x",
      "entity": "payment",
      "amount": 500,
      "currency": "INR",
      "status": "captured",
      "order_id": null,
      "invoice_id": null,
      "international": false,
      "method": "upi",
      "amount_refunded": 0,
      "refund_status": null,
      "captured": true,
      "description": "QRv2 Payment",
      "card_id": null,
      "bank": null,
      "wallet": null,
      "vpa": "gauri.kumari@okhdfcbank",
      "email": "gauri.kumari@example.com",
      "contact": "+919999999999",
      "customer_id": "cust_HKsR5se84c5LTO",
      "notes": [],
      "fee": 0,
      "tax": 0,
      "error_code": null,
      "error_description": null,
      "error_source": null,
      "error_step": null,
      "error_reason": null,
      "acquirer_data": {
        "rrn": "116514257019"
      },
      "created_at": 1623662800
    }
  ]
}
```
-------------------------------------------------------------------------------------------------------

### Close a QR Code

```js
instance.qrCode.close(qrCodeId)
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| qrCodeId*  | string | The id of the qr code to be closed |

**Response:**
```json
{
  "id": "qr_HMsVL8HOpbMcjU",
  "entity": "qr_code",
  "created_at": 1623660301,
  "name": "Store_1",
  "usage": "single_use",
  "type": "upi_qr",
  "image_url": "https://rzp.io/i/BWcUVrLp",
  "payment_amount": 300,
  "status": "closed",
  "description": "For Store 1",
  "fixed_amount": true,
  "payments_amount_received": 0,
  "payments_count_received": 0,
  "notes": {
    "purpose": "Test UPI QR code notes"
  },
  "customer_id": "cust_HKsR5se84c5LTO",
  "close_by": 1681615838,
  "closed_at": 1623660445,
  "close_reason": "on_demand"
}
```
-------------------------------------------------------------------------------------------------------

### Refund a Payment

```js
instance.payments.refund(paymentId,{
  "amount": "100",
  "notes": {
    "notes_key_1": "Beam me up Scotty.",
    "notes_key_2": "Engage"
  }
})
```

**Parameters:**

| Name            | Type    | Description                                                                  |
|-----------------|---------|------------------------------------------------------------------------------|
| paymentId*  | string | The id of the payment to be refunded |
| amount  | string | Amount to be refunded |
| notes       | array | Key-value pair that can be used to store additional information about the QR code. Maximum 15 key-value pairs, 256 characters (maximum) each. |

**Response:**
```json
{
  "id": "rfnd_FP8QHiV938haTz",
  "entity": "refund",
  "amount": 500100,
  "receipt": "Receipt No. 31",
  "currency": "INR",
  "payment_id": "pay_29QQoUBi66xm2f",
  "notes": [],
  "receipt": null,
  "acquirer_data": {
    "arn": null
  },
  "created_at": 1597078866,
  "batch_id": null,
  "status": "processed",
  "speed_processed": "normal",
  "speed_requested": "normal"
}
```
-------------------------------------------------------------------------------------------------------

**PN: * indicates mandatory fields**
<br>
<br>
**For reference click [here](https://razorpay.com/docs/api/qr-codes/)**