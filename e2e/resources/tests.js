var assert = require('assert');
const rzpInstance = require('../razorpay')
const crpyto = require("crypto")
const fs = require("fs")
const path = require("path")

var customerId = null;
var planId = null;
var accountId = null;
var stakeholderId = null;
var qrcodeId = null;
var virtualId = null;
var orderId = null;
var invoiceId = null;
var itemId = null;
var paymentId = null;
var webhookId = null;

let setSubscriptionParam = (id) => {
  return {
    "plan_id": id,
    "total_count": 6,
    "quantity": 1,
    "customer_notify": 1,

    "addons": [
      {
        "item": {
          "name": "Delivery charges",
          "amount": 30000,
          "currency": "INR"
        }
      }
    ],
    "notes": {
      "notes_key_1": "Tea, Earl Grey, Hot",
      "notes_key_2": "Tea, Earl Grey… decaf."
    }
  }
}

let setAccount = {
  "email": `gauriagain.kumar_${Math.floor(Date.now() / 1000)}@example.org`,
  "phone": "9000090000",
  "legal_business_name": "Acme Corp",
  "business_type": "partnership",
  "customer_facing_business_name": "Example",
  "profile": {
    "category": "healthcare",
    "subcategory": "clinic",
    "description": "Healthcare E-commerce platform",
    "addresses": {
      "operation": {
        "street1": "507, Koramangala 6th block",
        "street2": "Kormanagala",
        "city": "Bengaluru",
        "state": "Karnataka",
        "postal_code": 560047,
        "country": "IN"
      },
      "registered": {
        "street1": "507, Koramangala 1st block",
        "street2": "MG Road",
        "city": "Bengaluru",
        "state": "Karnataka",
        "postal_code": 560034,
        "country": "IN"
      }
    },
    "business_model": "Online Clothing ( men, women, ethnic, modern ) fashion and lifestyle, accessories, t-shirt, shirt, track pant, shoes."
  },
  "legal_info": {
    "pan": "AAACL1234C",
    "gst": "18AABCU9603R1ZM"
  },
  "brand": {
    "color": "FFFFFF"
  },
  "notes": {
    "internal_ref_id": "123123"
  },
  "contact_name": "Gaurav Kumar",
  "contact_info": {
    "chargeback": {
      "email": "cb@example.org"
    },
    "refund": {
      "email": "cb@example.org"
    },
    "support": {
      "email": "support@example.org",
      "phone": "9999999998",
      "policy_url": "https://www.google.com"
    }
  },
  "apps": {
    "websites": [
      "https://www.example.org"
    ],
    "android": [
      {
        "url": "playstore.example.org",
        "name": "Example"
      }
    ],
    "ios": [
      {
        "url": "appstore.example.org",
        "name": "Example"
      }
    ]
  }
}

let SetStakeholder = {
  "percentage_ownership": 10,
  "name": "Gaurav Kumar",
  "email": `gauriagain.${crpyto.randomBytes(4).toString('hex')}@example.org`,
  "relationship": {
    "director": true,
    "executive": false
  },
  "phone": {
    "primary": "7474747474",
    "secondary": "7474747474"
  },
  "addresses": {
    "residential": {
      "street": "506, Koramangala 1st block",
      "city": "Bengaluru",
      "state": "Karnataka",
      "postal_code": "560034",
      "country": "IN"
    }
  },
  "kyc": {
    "pan": "AVOPB1111K"
  },
  "notes": {
    "random_key_by_partner": "random_value"
  }
}

describe('API TEST', function () {

  it('create account', (done) => {
    rzpInstance.accounts.create(setAccount)
      .then((response) => {
        accountId = response.id
        console.log(`created account id: ${accountId}`)
        assert.ok(response.hasOwnProperty('id'))
        done()
      }).catch(err => console.log(err))
  })

  it('Customer create request', (done) => {

    let params = {
      "name": "Gaurav Kumar",
      "contact": 9123456780,
      "email": "gaurav.kumar@example.com",
      "fail_existing": "0",
      "notes": {
        "notes_key_1": "Tea, Earl Grey, Hot",
        "notes_key_2": "Tea, Earl Grey… decaf."
      }
    }

    rzpInstance.customers.create(params).then((response) => {
      customerId = response.id
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('Customer edit request', (done) => {

    let params = {
      "contact": 9123456780,
      "email": "gaurav.kumar@example.com",
    }

    rzpInstance.customers.edit(customerId, params).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('Fundaccount create request', (done) => {
    rzpInstance.fundAccount.create({
      "customer_id": customerId,
      "account_type": "bank_account",
      "bank_account": {
        "name": "Gaurav Kumar",
        "account_number": "11214311215411",
        "ifsc": "HDFC0000053"
      }
    }).then((response) => {

      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('Order create request', (done) => {
    rzpInstance.orders.create({
      "amount": 100,
      "currency": "INR",
      "customer_id": customerId,
      "method": "card",
      "token": {
        "max_amount": 5000,
        "expire_at": 2709971120,
        "frequency": "monthly"
      },
      "receipt": `Receipt No. ${Math.floor(Date.now() / 1000)}`,
      "notes": {
        "notes_key_1": "Tea, Earl Grey, Hot",
        "notes_key_2": "Tea, Earl Grey... decaf."
      }
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('Create an order to charge the customer', (done) => {
    rzpInstance.orders.create({
      "amount": 0,
      "currency": "INR",
      "method": "emandate",
      "customer_id": customerId,
      "receipt": `Receipt No. ${Math.floor(Date.now() / 1000)}`,
      "notes": {
        "notes_key_1": "Beam me up Scotty",
        "notes_key_2": "Engage"
      },
      "token": {
        "auth_type": "netbanking",
        "max_amount": 9999900,
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
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('Create order Papernach', (done) => {
    rzpInstance.orders.create({
      "amount": 0,
      "currency": "INR",
      "method": "nach",
      "customer_id": customerId,
      "receipt": `Receipt No. ${Math.floor(Date.now() / 1000)}`,
      "notes": {
        "notes_key_1": "Beam me up Scotty",
        "notes_key_2": "Engage"
      },
      "token": {
        "auth_type": "physical",
        "max_amount": 10000000,
        "notes": {
          "notes_key_1": "Tea, Earl Grey, Hot",
          "notes_key_2": "Tea, Earl Grey… decaf."
        },
        "bank_account": {
          "account_number": "11214311215411",
          "ifsc_code": "HDFC0000001",
          "beneficiary_name": "Gaurav Kumar",
          "account_type": "savings"
        },
        "nach": {
          "form_reference1": "Recurring Payment for Gaurav Kumar",
          "form_reference2": "Method Paper NACH",
          "description": "Paper NACH Gaurav Kumar"
        }
      }
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('Create order Papernach', (done) => {
    rzpInstance.orders.create({
      "amount": 1000,
      "currency": "INR",
      "payment_capture": true,
      "receipt": "Receipt No. 1",
      "notes": {
        "notes_key_1": "Tea, Earl Grey, Hot",
        "notes_key_2": "Tea, Earl Grey… decaf."
      }
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('Create order registerEmandate', (done) => {
    rzpInstance.orders.create({
      "amount": 0,
      "currency": "INR",
      "method": "emandate",
      "customer_id": customerId,
      "receipt": `Receipt No. ${Math.floor(Date.now() / 1000)}`,
      "notes": {
        "notes_key_1": "Beam me up Scotty",
        "notes_key_2": "Engage"
      },
      "token": {
        "first_payment_amount": 100,
        "auth_type": "netbanking",
        "max_amount": 9999900,
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
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('Create order registerNach', (done) => {
    rzpInstance.orders.create({
      "amount": 0,
      "currency": "INR",
      "method": "nach",
      "customer_id": customerId,
      "receipt": "Receipt No. 1",
      "notes": {
        "notes_key_1": "Beam me up Scotty",
        "notes_key_2": "Engage"
      },
      "token": {
        "first_payment_amount": 10000,
        "auth_type": "physical",
        "max_amount": 10000000,
        "notes": {
          "notes_key_1": "Tea, Earl Grey, Hot",
          "notes_key_2": "Tea, Earl Grey… decaf."
        },
        "bank_account": {
          "account_number": "11214311215411",
          "ifsc_code": "HDFC0000001",
          "beneficiary_name": "Gaurav Kumar",
          "account_type": "savings"
        },
        "nach": {
          "form_reference1": "Recurring Payment for Gaurav Kumar",
          "form_reference2": "Method Paper NACH",
          "description": "Paper NACH Gaurav Kumar"
        }
      }
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('Create order Upi', (done) => {
    rzpInstance.orders.create({
      "amount": 100,
      "currency": "INR",
      "customer_id": customerId,
      "method": "upi",
      "token": {
        "max_amount": 200000,
        "expire_at": 2709971120,
        "frequency": "monthly"
      },
      "receipt": "Receipt No. 1",
      "notes": {
        "notes_key_1": "Tea, Earl Grey, Hot",
        "notes_key_2": "Tea, Earl Grey… decaf."
      }
    }).then((response) => {
      orderId = response.id
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('edit order Upi', (done) => {
    rzpInstance.orders.edit(orderId, {
      "notes": {
        "key1": "value3",
        "key2": "value2"
      }
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('Create Invoice', (done) => {
    rzpInstance.invoices.create({
      "type": "invoice",
      "description": "Invoice for the month of January 2020",
      "draft": "1",
      "partial_payment": true,
      "customer": {
        "name": "Gaurav Kumar",
        "contact": 9999999999,
        "email": "gaurav.kumar@example.com",
        "billing_address": {
          "line1": "Ground & 1st Floor, SJR Cyber Laskar",
          "line2": "Hosur Road",
          "zipcode": 560068,
          "city": "Bengaluru",
          "state": "Karnataka",
          "country": "in"
        },
        "shipping_address": {
          "line1": "Ground & 1st Floor, SJR Cyber Laskar",
          "line2": "Hosur Road",
          "zipcode": 560068,
          "city": "Bengaluru",
          "state": "Karnataka",
          "country": "in"
        }
      },
      "line_items": [
        {
          "name": "Master Cloud Computing in 30 Days",
          "description": "Book by Ravena Ravenclaw",
          "amount": 399,
          "currency": "INR",
          "quantity": 1
        }
      ],
      "sms_notify": 1,
      "email_notify": 1,
      "currency": "INR",
    }).then((response) => {
      invoiceId = response.id
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('Edit Invoice', (done) => {
    rzpInstance.invoices.edit(invoiceId, {
      "notes": {
        "updated-key": "An updated note."
      }
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('Plan Create', (done) => {
    rzpInstance.plans.create({
      "period": "weekly",
      "interval": 1,
      "item": {
        "name": "Test plan - Weekly",
        "amount": 69900,
        "currency": "INR",
        "description": "Description for the test plan"
      },
      "notes": {
        "notes_key_1": "Tea, Earl Grey, Hot",
        "notes_key_2": "Tea, Earl Grey… decaf."
      }
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('Item create', (done) => {
    rzpInstance.items.create({
      "name": "Book / English August",
      "description": "An indian story, Booker prize winner.",
      "amount": 20000,
      "currency": "INR"
    }).then((response) => {
      itemId = response.id
      assert.ok(response.hasOwnProperty('id'))
      done()
    }).catch(err => console.log(err))
  })

  it('Item edit', (done) => {
    rzpInstance.items.edit(itemId, {
      "name": "Book / Ignited Minds - Updated name!",
      "description": "New descirption too. :).",
      "amount": 20000,
      "currency": "INR",
      "active": true
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      done()
    }).catch(err => console.log(err))
  })

  it('Item fetch all', (done) => {
    rzpInstance.items.all().then((response) => {
      assert.ok(response.hasOwnProperty('items'))
      done()
    }).catch(err => console.log(err))
  })

  it('Payment edit', (done) => {
    rzpInstance.payments.edit("pay_M2Wt26QOM8Zmny", {
      "notes": {
        "note_key 1": "Beam me up Scotty update",
        "note_key 2": "Tea. Earl Gray. Hot. update"
      }
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      done()
    }).catch(err => console.log(err))
  })

  it('Payment refund', (done) => {
    rzpInstance.payments.refund("pay_M2Wt26QOM8Zmny", {
      "amount": "100",
      "notes": {
        "note_key 1": "Beam me up Scotty update",
        "note_key 2": "Tea. Earl Gray. Hot. update"
      }
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      done()
    }).catch(err => console.log(err))
  })

  it('Payment transfer', (done) => {
    rzpInstance.payments.transfer("pay_M2Wt26QOM8Zmny", {
      "transfers": [
        {
          "account": 'acc_I0QRP7PpvaHhpB',
          "amount": 100,
          "currency": "INR",
          "notes": {
            "name": "Gaurav Kumar",
            "roll_no": "IEC2011025"
          },
          "on_hold": 1,
        }
      ]
    }).then((response) => {
      assert.ok(response.hasOwnProperty('items'))
      done()
    }).catch(err => console.log(err))
  })

  it('QrCode create', (done) => {
    rzpInstance.qrCode.create({
      "type": "upi_qr",
      "name": "Store_1",
      "usage": "single_use",
      "fixed_amount": true,
      "payment_amount": 300,
      "description": "For Store 1",
      "notes": {
        "purpose": "Test UPI QR code notes"
      }
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      done()
    }).catch(err => console.log(err))
  })

  it('Paymentlink create request', (done) => {

    let params = {
      "amount": 500,
      "currency": "INR",
      "accept_partial": true,
      "first_min_partial_amount": 100,
      "reference_id": "TS1989",
      "description": "For XYZ purpose",
      "customer": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "+919000090000"
      },
      "notify": {
        "sms": true,
        "email": true
      },
      "reminder_enable": true,
      "notes": {
        "policy_name": "Jeevan Bima"
      },
      "callback_url": "https://example-callback-url.com/",
      "callback_method": "get"
    }

    rzpInstance.paymentLink.create(params).then((response) => {
      paymentId = response.id
      assert.ok(response.hasOwnProperty('id'))
      done()
    }).catch(err => console.log(err))
  })

  it('Paymentlink edit request', (done) => {
    let params = {
      "reference_id": `Receipt No. ${Math.floor(Date.now() / 1000)}`,
      "reminder_enable": false,
      "notes": {
        "policy_name": "Jeevan Saral"
      }
    }

    rzpInstance.paymentLink.edit(paymentId, params).then((response) => {
      paymentId = response.id
      assert.ok(response.hasOwnProperty('id'))
      done()
    }).catch(err => console.log(err))
  })

  it('Token create request', (done) => {
    rzpInstance.tokens.create({
      "customer_id": customerId,
      "method": "card",
      "card": {
        "number": "4111111111111111",
        "cvv": "123",
        "expiry_month": "12",
        "expiry_year": "24",
      },
      "authentication": {
        "provider": "razorpay",
        "provider_reference_id": "pay_123wkejnsakd"
      },
      "notes": []
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      done()
    }).catch(err => console.log(err))
  })

  it('Transfer edit request', (done) => {
    rzpInstance.transfers.edit("trf_MHzE2BQtBbPuf2", {
      "on_hold": "1",
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      done()
    }).catch(err => console.log(err))
  })

  it('Subscription create request', (done) => {
    rzpInstance.subscriptions.create({
      "plan_id": "plan_MHzDyLBBi1hGNB",
      "total_count": 6,
      "quantity": 1,
      "customer_notify": 1,
      "addons": [
        {
          "item": {
            "name": "Delivery charges",
            "amount": 3000,
            "currency": "INR"
          }
        }
      ],
      "notes": {
        "notes_key_1": "Tea, Earl Grey, Hot",
        "notes_key_2": "Tea, Earl Grey… decaf."
      }
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      done()
    }).catch(err => console.log(err))
  })

  it('Subscription create registration', (done) => {
    rzpInstance.subscriptions.createRegistrationLink({
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
        "max_amount": 50000,
        "bank_account": {
          "beneficiary_name": "Gaurav Kumar",
          "account_number": "11214311215411",
          "account_type": "savings",
          "ifsc_code": "HDFC0001233"
        }
      },
      "receipt": `Receipt No. ${Math.floor(Date.now() / 1000)}`,
      "sms_notify": 1,
      "email_notify": 1,
      "notes": {
        "note_key 1": "Beam me up Scotty",
        "note_key 2": "Tea. Earl Gray. Hot."
      }
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      done()
    }).catch(err => console.log(err))
  })

  it('VirtualAccount create request', (done) => {
    rzpInstance.virtualAccounts.create({
      "receivers": {
        "types": [
          "bank_account"
        ]
      },
      "description": "Virtual Account created for Raftar Soft",
      "customer_id": customerId,
      "notes": {
        "project_name": "Banking Software"
      }
    }).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      done()
    }).catch(err => console.log(err))
  })

  it('edit account', (done) => {
    rzpInstance.accounts.edit(accountId, {})
      .then((response) => {
        assert.ok(response.hasOwnProperty('id'))
        done()
      }).catch(err => console.log(err))
  })

  it('fetch account', (done) => {
    rzpInstance.accounts.fetch(accountId)
      .then((response) => {
        assert.ok(response.hasOwnProperty('id'))
        done()
      }).catch(err => console.log(err))
  })

  it('Account fileupload request', (done) => {
    rzpInstance.accounts.uploadAccountDoc("acc_M28vQMUgbIBo1N", {
      'file': {
        'value': fs.createReadStream(path.resolve("./dummy.pdf")),
        'options': {
          'filename': 'dummy.pdf',
          'contentType': null
        }
      },
      'document_type': 'business_proof_url'
    }).then((response) => {
      assert.ok(response.hasOwnProperty('business_proof_of_identification'))
      done()
    }).catch(err => console.log(err))
  })

  it('create stakeholder account', (done) => {
    rzpInstance.stakeholders.create(accountId, SetStakeholder)
      .then((response) => {
        stakeholderId = response.id
        assert.ok(response.hasOwnProperty('id'))
        done()
      }).catch(err => console.log(err))
  })

  it('fetch stakeholder account', (done) => {
    rzpInstance.stakeholders.fetch(accountId, stakeholderId)
      .then((response) => {
        assert.ok(response.hasOwnProperty('id'))
        done()
      }).catch(err => console.log(err))
  })

  it('edit stakeholder account', (done) => {
    rzpInstance.stakeholders.edit(accountId, stakeholderId, {})
      .then((response) => {
        assert.ok(response.hasOwnProperty('id'))
        done()
      }).catch(err => console.log(err))
  })

  it('Stakeholder fileupload request', (done) => {
    rzpInstance.stakeholders.uploadStakeholderDoc("acc_M83Uw27KXuC7c8", "sth_M83WuwmrCFa55g", {
      'file': {
        'value': fs.createReadStream(path.resolve("./dummy.pdf")),
        'options': {
          'filename': 'dummy.pdf',
          'contentType': null
        }
      },
      'document_type': 'aadhar_front'
    }).then((response) => {
      assert.ok(response.hasOwnProperty('individual_proof_of_address'))
      done()
    }).catch(err => console.log(err))
  })

  it('create webhook account', (done) => {
    rzpInstance.webhooks.create({
      "url": "https://google.com",
      "alert_email": "gaurav.kumar@example.com",
      "secret": "12345",
      "events": [
        "payment.authorized",
        "payment.failed",
        "payment.captured",
        "payment.dispute.created",
        "refund.failed",
        "refund.created"
      ]
    }, accountId)
      .then((response) => {
        webhookId = response.id
        assert.ok(response.hasOwnProperty('id'))
        assert.ok(response.hasOwnProperty('owner_type'))
        done()
      }).catch(err => console.log(err))
  })

  it('delete account', (done) => {
    rzpInstance.accounts.delete(accountId).then((response) => {
      console.log(`deleted account id: ${accountId}`)
      assert.ok((response.id === accountId))
      assert.ok(response.hasOwnProperty('id'))
      done()
    }).catch(err => console.log(err))
  })
});
