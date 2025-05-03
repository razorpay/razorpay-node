'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')
const equal = require('deep-equal')

var customerId = null;

describe('FUND-ACCOUNTS', () => {

    it('Fundaccount create request', (done) => {

        let customerDetails = {
            "name": "Gaurav Kumar",
            "contact": 9123456780,
            "email": "gaurav.kumar@example.com",
            "fail_existing": "0",
            "notes": {
                "notes_key_1": "Tea, Earl Grey, Hot",
                "notes_key_2": "Tea, Earl Grey… decaf."
            }
        }

        rzpInstance.customers.create(customerDetails)
            .then(response => response.id)
            .then((customer_id) => {
                customerId = customer_id 
                rzpInstance.fundAccount.create({
                    "customer_id": customer_id,
                    "account_type": "bank_account",
                    "bank_account": {
                        "name": "Gaurav Kumar",
                        "account_number": "11214311215411",
                        "ifsc": "HDFC0000053"
                    }
                }).then((response) => {
                    //fundAccountId = response.id
                    //console.log(response)
                    assert.ok(response.hasOwnProperty('id'))
                    assert.ok(response.hasOwnProperty('entity'))
                    done()
                })
            })
    })

    it('fetch fund account', (done) => {
        rzpInstance.fundAccount.fetch(customerId).then((response) => {
            assert.ok(response.hasOwnProperty('items'))
            assert.ok(response.hasOwnProperty('count'))
            done()
        }).catch(err=>console.log(err))
    })
})
