## Disputes

### Fetch All Disputes

```js
var options = {
    count: 1
}

instance.disputes.all(options)
```

**Parameters:**

| Name          | Type        | Description                                 |
|---------------|-------------|---------------------------------------------|
| count | integer   | number of dispute to fetch (default: 10)        |
| skip  | integer   | number of dispute to be skipped (default: 0)    |

**Response:**
```json
{
  "entity": "collection",
  "count": 1,
  "items": [
    {
      "id": "disp_Esz7KAitoYM7PJ",
      "entity": "dispute",
      "payment_id": "pay_EsyWjHrfzb59eR",
      "amount": 10000,
      "currency": "INR",
      "amount_deducted": 0,
      "reason_code": "pre_arbitration",
      "respond_by": 1590604200,
      "status": "open",
      "phase": "pre_arbitration",
      "created_at": 1590059211,
      "evidence": {
        "amount": 10000,
        "summary": null,
        "shipping_proof": null,
        "billing_proof": null,
        "cancellation_proof": null,
        "customer_communication": null,
        "proof_of_service": null,
        "explanation_letter": null,
        "refund_confirmation": null,
        "access_activity_log": null,
        "refund_cancellation_policy": null,
        "term_and_conditions": null,
        "others": null,
        "submitted_at": null
      }
    }
  ]
}
```
-------------------------------------------------------------------------------------------------------

### Fetch a Dispute

```js
var disputeId = "disp_0000000000000";

instance.disputes.fetch(disputeId);
```

**Parameters:**

| Name  | Type      | Description                                      |
|-------|-----------|--------------------------------------------------|
| id*  | string | The unique identifier of the dispute.  |

**Response:**
```json
{
  "id": "disp_AHfqOvkldwsbqt",
  "entity": "dispute",
  "payment_id": "pay_EsyWjHrfzb59eR",
  "amount": 10000,
  "currency": "INR",
  "amount_deducted": 0,
  "reason_code": "pre_arbitration",
  "respond_by": 1590604200,
  "status": "open",
  "phase": "pre_arbitration",
  "created_at": 1590059211,
  "evidence": {
    "amount": 10000,
    "summary": "goods delivered",
    "shipping_proof": null,
    "billing_proof": null,
    "cancellation_proof": null,
    "customer_communication": null,
    "proof_of_service": null,
    "explanation_letter": null,
    "refund_confirmation": null,
    "access_activity_log": null,
    "refund_cancellation_policy": null,
    "term_and_conditions": null,
    "others": null,
    "submitted_at": null
  }
}
```
-------------------------------------------------------------------------------------------------------

### Contest a Dispute

```js

//Use this API sample code for draft

var disputeId = "disp_0000000000000";

instance.disputes.contest(disputeId,{
  "billing_proof": [
    "doc_EFtmUsbwpXwBG9",
    "doc_EFtmUsbwpXwBG8"
  ],
  "action": "submit"
})


//Use this API sample code for submit

instance.disputes.contest(disputeId, {
  "amount": 5000,
  "summary": "goods delivered",
  "shipping_proof": [
    "doc_EFtmUsbwpXwBH9",
    "doc_EFtmUsbwpXwBH8"
  ],
  "others": [
    {
      "type": "receipt_signed_by_customer",
      "document_ids": [
        "doc_EFtmUsbwpXwBH1",
        "doc_EFtmUsbwpXwBH7"
      ]
    }
  ],
  "action": "draft"
})
```

**Response:**
```json

// Draft
{
  "id": "disp_AHfqOvkldwsbqt",
  "entity": "dispute",
  "payment_id": "pay_EsyWjHrfzb59eR",
  "amount": 10000,
  "currency": "INR",
  "amount_deducted": 0,
  "reason_code": "chargeback",
  "respond_by": 1590604200,
  "status": "open",
  "phase": "chargeback",
  "created_at": 1590059211,
  "evidence": {
    "amount": 5000,
    "summary": "goods delivered",
    "shipping_proof": [
      "doc_EFtmUsbwpXwBH9",
      "doc_EFtmUsbwpXwBH8"
    ],
    "billing_proof": null,
    "cancellation_proof": null,
    "customer_communication": null,
    "proof_of_service": null,
    "explanation_letter": null,
    "refund_confirmation": null,
    "access_activity_log": null,
    "refund_cancellation_policy": null,
    "term_and_conditions": null,
    "others": [
      {
        "type": "receipt_signed_by_customer",
        "document_ids": [
          "doc_EFtmUsbwpXwBH1",
          "doc_EFtmUsbwpXwBH7"
        ]
      }
    ],
    "submitted_at": null
  }
}

//Submit 
{
  "id": "disp_AHfqOvkldwsbqt",
  "entity": "dispute",
  "payment_id": "pay_EsyWjHrfzb59eR",
  "amount": 10000,
  "currency": "INR",
  "amount_deducted": 0,
  "reason_code": "chargeback",
  "respond_by": 1590604200,
  "status": "under_review",
  "phase": "chargeback",
  "created_at": 1590059211,
  "evidence": {
    "amount": 5000,
    "summary": "goods delivered",
    "shipping_proof": [
      "doc_EFtmUsbwpXwBH9",
      "doc_EFtmUsbwpXwBH8"
    ],
    "billing_proof": [
      "doc_EFtmUsbwpXwBG9",
      "doc_EFtmUsbwpXwBG8"
    ],
    "cancellation_proof": null,
    "customer_communication": null,
    "proof_of_service": null,
    "explanation_letter": null,
    "refund_confirmation": null,
    "access_activity_log": null,
    "refund_cancellation_policy": null,
    "term_and_conditions": null,
    "others": [
      {
        "type": "receipt_signed_by_customer",
        "document_ids": [
          "doc_EFtmUsbwpXwBH1",
          "doc_EFtmUsbwpXwBH7"
        ]
      }
    ],
    "submitted_at": 1590603200
  }
}
```
-------------------------------------------------------------------------------------------------------
**PN: * indicates mandatory fields**
<br>
<br>
**For reference click [here](https://razorpay.com/docs/api/documents)**