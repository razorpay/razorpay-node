'use strict'

var assert = require('assert');
const rzpInstance = require('../product')
let productId = null;
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

describe('PRODUCT CONFIGURATION', () => {

    it('request a product configuration', (done) => {

        rzpInstance.accounts.create(setAccount)
            .then((response) => {
                accountId = response.id
                console.log(`created account id: ${accountId}`)
                return accountId
            })
            .then((id) => {
                rzpInstance.products.requestProductConfiguration(id, {
                    "product_name" : "payment_gateway",
                    "tnc_accepted" : true,
                    "ip" : "233.233.233.234"
                })
                .then((response)=>{
                    productId = response.id
                    assert.ok(response.hasOwnProperty('id'))
                    assert.ok(response.hasOwnProperty('account_id'))
                    done()
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))

    })

    it('fetch product by id', (done) => {
        rzpInstance.products.fetch(accountId, productId).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            assert.ok((response.id === productId))
            done()
        }).catch(err => console.log(err))
    })

    it('fetch terms and conditions for a sub-merchant', (done) => {
        rzpInstance.products.fetchTnc("payments").then((response) => {
            assert.ok(response.hasOwnProperty('entity'))
            assert.ok(response.hasOwnProperty('id'))
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
