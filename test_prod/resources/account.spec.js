'use strict'

var assert = require('assert');
const rzpInstance = require('../product')
const path = require('path')
const fs = require('fs');

let accountId = null;
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

describe('ACCOUNTS', () => {

    it('create account', (done) => {

        rzpInstance.accounts.create(setAccount)
            .then((response) => {
                accountId = response.id
                assert.ok(response.hasOwnProperty('id'))
                assert.ok(response.hasOwnProperty('type'))
                done()
            }).catch(err => console.log(err))

    })

    it('fetch account by id', (done) => {
        rzpInstance.accounts.fetch(accountId).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            assert.ok((response.id === accountId))
            done()
        }).catch(err => console.log(err))
    })

    it('document upload token', (done) => {

        rzpInstance.accounts.uploadAccountDoc(accountId, {
            'file': {
                'value': fs.createReadStream(path.resolve(__dirname, `dummy.pdf`)),
                'options': {
                    'filename': 'dummy.pdf',
                    'contentType': null
                }
            },
            'document_type': 'business_proof_url'
        })
            .then(response => {
                assert.ok(response.hasOwnProperty('business_proof_of_identification'))
                done()
            }).catch(err => {
                if(err.hasOwnProperty('error'))
                {
                    if(err.error.reason == 'NA'){
                        console.warn('server issue')
                        done()
                    }
                }
            })

    })

    it('fetch documents', (done) => {
        rzpInstance.accounts.fetchAccountDoc(accountId).then((response) => {
            assert.ok(response.hasOwnProperty('business_proof_of_identification'))
            done()
        }).catch(err => console.log(err))
    })

    it('delete token', (done) => {
        rzpInstance.accounts.delete(accountId).then((response) => {
            assert.ok((response.id === accountId))
            assert.ok(response.hasOwnProperty('id'))
            done()
        }).catch(err => console.log(err))
    })
})
