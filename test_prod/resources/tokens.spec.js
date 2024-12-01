'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')

let tokenId = null;
let customerId = null;

describe('TOKENS', () => {

    it('create token account', (done) => {

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
            rzpInstance.tokens.create({
                "customer_id": id,
                "method": "card",
                "card": {
                  "number": "4854980604708430",
                  "cvv": "123",
                  "expiry_month": "12",
                  "expiry_year": "24"
                },
                "authentication": {
                  "provider": "razorpay",
                  "provider_reference_id": "pay_123wkejnsakd"
                },
                "notes": []
              }).then((response) => {
                tokenId = response.id
                assert.ok(response.hasOwnProperty('id'))
                assert.ok(response.hasOwnProperty('entity'))
                done()
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    })

    it('fetch tokens', (done) => {
        rzpInstance.tokens.fetch({ id: tokenId }).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            assert.ok(response.hasOwnProperty('entity'))
            assert.ok((response.id === tokenId))
            done()
        }).catch(err => console.log(err))
    })

    it('delete token', (done) => {
        rzpInstance.tokens.delete({
            id : tokenId
        }).then((response) => {
            assert.ok((typeof response == 'object'))
            done()
        }).catch(err => console.log(err))
    })
})
