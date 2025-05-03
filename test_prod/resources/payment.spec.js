'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')
const equal = require('deep-equal');
const { items } = require('../razorpay');

let paymentId = null
let fetchCardDetails = "pay_MCO770x0UjBDZh"

describe('PAYMENT', function() {
  
    it('fetch payment', (done) => {
        let expectedParams = {
            count: 1
        }
        rzpInstance.payments.all(expectedParams)  // fetch payment-id from payment collection
            .then(resp => {
                if (resp.hasOwnProperty("items")) {
                    if (resp.items.length > 0) {
                        paymentId = resp.items[0].id
                    }
                }
                return paymentId
            }).catch(err => console.log(err))
            .then((id) => {
                rzpInstance.payments.fetch(id).then((response) => {
                    assert.ok(response.hasOwnProperty('id'))
                    assert.ok((response.id == id))
                    done()
                }).catch(err => console.log(err))
            })
    })

    it('fetch all payments', (done) => {
        let expectedParams = {
            skip: 0,
            count: 10
        }
        rzpInstance.payments.all(expectedParams).then((response) => {
            assert.ok(response.hasOwnProperty('items'))
            done()
        }).catch(err => console.log(err))
    })

    it('edit payments', (done) => {
        let params = {
            "notes": {
                "key1": "value1",
                "key2": "value2"
            }
        }
        rzpInstance.payments.edit(paymentId, params).then((response) => {
            assert.ok((response.id == paymentId))
            done()
        }).catch(err=>console.log(err))
    })

    it('fetch cards details with paymentId', (done) => {
        rzpInstance.payments.fetchCardDetails(fetchCardDetails).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            assert.ok(response.hasOwnProperty('entity'))
            done()
        }).catch(err=>console.log(err))
    })
})
