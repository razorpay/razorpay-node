## Funds

### Create a fund account
```js
instance.fundAccount.create({
  "customer_id":"cust_Aa000000000001",
  "account_type":"bank_account",
  "bank_account":{
    "name":"Gaurav Kumar",
    "account_number":"11214311215411",
    "ifsc":"HDFC0000053"
  }
})
```

**Parameters:**

| Name          | Type        | Description                                 |
|---------------|-------------|---------------------------------------------|
| customerId*   | string      | The id of the customer to be fetched  |
| account_type* | string      | The bank_account to be linked to the customer ID  |
| bank_account* | array      | All keys listed [here](https://razorpay.com/docs/payments/customers/customer-fund-account-api/#create-a-fund-account) are supported |

**Response:**
```json
{
  "id": "fa_JexSeA2SS1S19D",
  "entity": "fund_account",
  "customer_id": "cust_JdumbHq5F3kKu6",
  "account_type": "bank_account",
  "bank_account": {
    "ifsc": "HDFC0000053",
    "bank_name": "HDFC Bank",
    "name": "Gaurav Kumar",
    "notes": [],
    "account_number": "11214311215411"
  },
  "batch_id": null,
  "active": true,
  "created_at": 1654682051
}
```
-------------------------------------------------------------------------------------------------------

### Fetch all fund accounts

```js
instance.fundAccount.fetch(customerId)
```

**Parameters:**

| Name          | Type        | Description                                 |
|---------------|-------------|---------------------------------------------|
| customerId*   | string      | The id of the customer to be fetched  |

**Response:**
```json
{
  "id":"fa_Aa00000000001",
  "entity":"fund_account",
  "customer_id":"cust_Aa000000000001",
  "account_type":"bank_account",
  "bank_account":{
    "name":"Gaurav Kumar",
    "account_number":"11214311215411",
    "ifsc":"HDFC0000053",
    "bank_name":"HDFC Bank"
  },
  "batch_id": null,
  "active":true,
  "created_at":1543650891
}
```
-------------------------------------------------------------------------------------------------------

**PN: * indicates mandatory fields**
<br>
<br>
**For reference click [here](https://razorpay.com/docs/payments/customers/customer-fund-account-api/)**