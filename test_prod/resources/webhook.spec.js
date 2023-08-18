'use strict'

var assert = require('assert');
const rzpInstance = require('../product')
const path = require('path')
const fs = require('fs');
const crpyto = require('crypto')
let skipDoc = true;

let accountId = null;
let webhookId = null;

let setAccount = {
    "email": `gauriagain.${crpyto.randomBytes(4).toString('hex')}@example.org`,
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


describe('WEBHOOK', () => {

    it('create webhook account', (done) => {

        rzpInstance.accounts.create(setAccount)
            .then((response) => {
                accountId = response.id
                console.log(`created account id: ${accountId}`)
                return accountId
            })
            .then((id) => {
                console.log('created id',accountId)
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
                  },id)
                .then((response)=>{
                    webhookId = response.id
                    assert.ok(response.hasOwnProperty('id'))
                    assert.ok(response.hasOwnProperty('owner_type'))
                    done()
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))

    })

    it('fetch webhook by id', (done) => {
        rzpInstance.webhooks.fetch(webhookId, accountId).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            assert.ok((response.id === webhookId))
            done()
        }).catch(err => console.log(err))
    })

    it('fetch all webhooks', (done) => {
        rzpInstance.webhooks.all(accountId).then((response) => {
            assert.ok(response.hasOwnProperty('entity'))
            assert.ok(response.hasOwnProperty('items'))
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
})