## payment verification

```js
var { validatePaymentVerification, validateWebhookSignature } = require('./dist/utils/razorpay-utils');
```

### Verify payment verification

```js
validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
```

**Parameters:**


| Name  | Type      | Description                                      |
|-------|-----------|--------------------------------------------------|
| orderId*  | string | The id of the order to be fetched  |
| paymentId*    | string | The id of the payment to be fetched |
| signature* | string   | Signature returned by the Checkout. This is used to verify the payment. |
| secret* | string   | your api secret as secret |

-------------------------------------------------------------------------------------------------------
### Verify subscription verification

```js
validatePaymentVerification({"subscription_id": subscriptionId, "payment_id": razorpayPaymentId }, signature, secret)
```

**Parameters:**


| Name  | Type      | Description                                      |
|-------|-----------|--------------------------------------------------|
| subscriptionId*  | string | The id of the subscription to be fetched  |
| paymentId*    | string | The id of the payment to be fetched |
| signature* | string   | Signature returned by the Checkout. This is used to verify the payment. |
| secret* | string   | your api secret as secret |

-------------------------------------------------------------------------------------------------------
### Verify paymentlink verification

```js
validatePaymentVerification({
  "payment_link_id": PaymentlinkId,
  "payment_id": PaymentId,
  "payment_link_reference_id": PaymentLinkReferenceId,
  "payment_link_status": PaymentLinkStatus,
}, signature , secret);
```

**Parameters:**


| Name  | Type      | Description                                      |
|-------|-----------|--------------------------------------------------|
| razorpayPaymentlinkId*  | string | The id of the paymentlink to be fetched  |
| razorpayPaymentId*  | string | The id of the payment to be fetched  |
| razorpayPaymentLinkReferenceId*  | string |  A reference number tagged to a Payment Link |
| razorpayPaymentLinkStatus*  | string | Current status of the link  |
| signature* | string   | Signature returned by the Checkout. This is used to verify the payment. |
| secret* | string   | your api secret as secret |

-------------------------------------------------------------------------------------------------------

### Verify webhook verification

```js
var payload = {
  "entity": "event",
  "account_id": "acc_Hn1ukn2d32Fqww",
  "event": "payment.captured",
  "contains": [
    "payment"
  ],
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_JRP3Y66cNcf2qF",
        "entity": "payment",
        "amount": 2244,
        "currency": "INR",
        "status": "captured",
        "order_id": "order_JROxH1kSf9IR6d",
        "invoice_id": null,
        "international": false,
        "method": "card",
        "amount_refunded": 0,
        "refund_status": null,
        "captured": true,
        "description": "#J9iMHZMUTJlod8",
        "card_id": "card_JRP3YBkFQYCmnR",
        "card": {
          "id": "card_JRP3YBkFQYCmnR",
          "entity": "card",
          "name": "ankit das",
          "last4": "4366",
          "network": "Visa",
          "type": "credit",
          "issuer": "UTIB",
          "international": false,
          "emi": true,
          "sub_type": "consumer",
          "token_iin": null
        },
        "bank": null,
        "wallet": null,
        "vpa": null,
        "email": "you@example.com",
        "contact": "+917000569565",
        "notes": {
          "policy_name": "Jeevan Bima"
        },
        "fee": 45,
        "tax": 0,
        "error_code": null,
        "error_description": null,
        "error_source": null,
        "error_step": null,
        "error_reason": null,
        "acquirer_data": {
          "auth_code": "548669"
        },
        "created_at": 1651722469
      }
    }
  },
  "created_at": 1651722476
}

var xRazorpaySignature = "55d3c166391ec51285b388f1bb9f0ba9b13dde1bece4484aaac6edd34a01459a"
var webhookSecret = "123456";

validateWebhookSignature(JSON.stringify(payload), xRazorpaySignature, webhookSecret)
```

**Parameters:**


| Name  | Type      | Description                                      |
|-------|-----------|--------------------------------------------------|
| payload*  | string | raw webhook request body  |
| xRazorpaySignature*  | string | The hash signature is calculated using HMAC with SHA256 algorithm; with your webhook secret set as the key and the webhook request body as the message.  |
| webhookSecret* | string   | your webhook secret |

-------------------------------------------------------------------------------------------------------

**PN: * indicates mandatory fields**
<br>
<br>