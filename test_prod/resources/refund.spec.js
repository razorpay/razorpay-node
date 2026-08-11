'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')
const equal = require('deep-equal')

let qrcodeId = null;
let paymentData = null;

describe('REFUND', () => {

    it('fetch all refunds', (done) => {

        rzpInstance.refunds.all({ count: 5 })
            .then((response) => {
                response.items.find(item => {
                    if (item.payment_id) {
                        paymentData = item
                        return true
                    }
                })
                assert.ok(response.hasOwnProperty('count'))
                assert.ok(response.hasOwnProperty('items'))
                done()
            }).catch(err => console.log(err))
    })

    it('fetch refund', (done) => {
        rzpInstance.refunds.fetch(paymentData.id).then((response) => {
            assert.ok(response.hasOwnProperty('entity'))
            assert.ok((response.id === paymentData.id))
            done()
        }).catch(err => console.log(err))
    })

    it('edit refund', (done) => {
        rzpInstance.refunds.edit(paymentData.id, {
            "notes": {
                "notes_key_1": "Beam me up Scotty.",
                "notes_key_2": "Engage"
            }
        }).then((response) => {
            assert.ok(response.hasOwnProperty('entity'))
            assert.ok((response.id === paymentData.id))
            done()
        }).catch(err => console.log(err))
    })
})
