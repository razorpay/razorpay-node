'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')

let customerId = null;
let virtualId = null; 

describe('VIRTUAL ACCOUNTS', () => {

    it('create virtual account', (done) => {

        rzpInstance.customers.create({
            "name": "Gaurav Kumar",
            "contact": 9123456780,
            "email": "gaurav.kumar@example.com",
            "fail_existing": 0,
            "notes": {
                "notes_key_1": "Tea, Earl Grey, Hot",
                "notes_key_2": "Tea, Earl Grey… decaf."
            }
        }).then(response=>{
            customerId = response.id
            return customerId
        }).then((id)=>{
            rzpInstance.virtualAccounts.create({
                "receivers": {
                    "types": [
                        "bank_account"
                    ]
                },
                "description": "Virtual Account created for Raftar Soft",
                "customer_id": id,
                "notes": {
                    "project_name": "Banking Software"
                }
            }).then((response) => {
                virtualId = response.id
                assert.ok(response.hasOwnProperty('id'))
                assert.ok(response.hasOwnProperty('entity'))
                done()
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    })

    it('fetch virtualAccount', (done) => {
        rzpInstance.virtualAccounts.fetch(virtualId).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            done()
        }).catch(err => console.log(err))
    })

    it('fetch payments of virtualAccount', (done) => {
        rzpInstance.virtualAccounts.fetchPayments(virtualId).then((response) => {
            assert.ok(response.hasOwnProperty('count'))
            assert.ok(response.hasOwnProperty('items'))
            done()
        }).catch(err => console.log(err))
    })

    it('fetch all virtualAccounts', (done) => {
        rzpInstance.virtualAccounts.all().then((response) => {
            assert.ok(response.hasOwnProperty('count'))
            assert.ok(response.hasOwnProperty('items'))
            done()
        }).catch(err => console.log(err))
    })

    it('close virtualAccounts', (done) => {
        rzpInstance.virtualAccounts.close(virtualId).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            assert.ok(response.hasOwnProperty('entity'))
            done()
        }).catch(err => console.log(err))
    })
})
