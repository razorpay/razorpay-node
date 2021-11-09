## payment verification

```js
var { validatePaymentVerification } = require('./dist/utils/razorpay-utils');
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

**PN: * indicates mandatory fields**
<br>
<br>