'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')
const equal = require('deep-equal')

var paymentLinkId = null;

describe('PAYMENTLINKS', function() {
 
    it('paymentlink create request', (done) => {

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
            paymentLinkId = response.id
            assert.ok(response.hasOwnProperty('id'))
            done()
        }).catch(err=>console.log(err))
    })

    it('fetch paymentlink', (done) => {
        rzpInstance.paymentLink.fetch(paymentLinkId).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            assert.ok((response.id == paymentLinkId))
            done()
        }).catch(err=>console.log(err))
    })

    it('edit customer', (done) => {
        let params = {
            "notes": {
                "policy_name": "Jeevan Bima"
            }
        }
        rzpInstance.paymentLink.edit(paymentLinkId, params).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            assert.ok((response.id == paymentLinkId))
            done()
        }).catch(err=>console.log(err))
    })

    it('fetch all paymentLink', (done) => {
        let expectedParams = {
            skip: 0,
            count: 10
        }
        rzpInstance.paymentLink.all(expectedParams).then((response) => {
            assert.ok(response.hasOwnProperty('payment_links'))
            done()
        }).catch(err=>console.log(err))
    })

    it('send notification', (done) => {
        rzpInstance.paymentLink.notifyBy(paymentLinkId, "email").then((response) => {
            assert.ok(response.hasOwnProperty('success'))
            done()
        }).catch(err=>console.log(err))
    })

    it('cancel paymentLink', (done) => {
        rzpInstance.paymentLink.cancel(paymentLinkId).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            done()
        }).catch(err=>console.log(err))
    })
})
