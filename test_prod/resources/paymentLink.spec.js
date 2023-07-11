'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')
const equal = require('deep-equal')

var paymentLinkId = null;

describe('PAYMENTLINKS', function() {

    this.timeout(10000);
  
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
        this.timeout(10000);
        rzpInstance.paymentLink.create(params).then((response) => {
            paymentLinkId = response.id
            assert.ok(response.hasOwnProperty('id'))
            done()
        })
    })

    it('fetch paymentlink', (done) => {
        this.timeout(10000);
        rzpInstance.paymentLink.fetch(paymentLinkId).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            assert.ok((response.id == paymentLinkId))
            done()
        })
    })

    it('edit customer', (done) => {
        let params = {
            "notes": {
                "policy_name": "Jeevan Bima"
            }
        }
        this.timeout(10000);
        rzpInstance.paymentLink.edit(paymentLinkId, params).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            assert.ok((response.id == paymentLinkId))
            done()
        })
    })

    it('fetch all paymentLink', (done) => {
        let expectedParams = {
            skip: 0,
            count: 10
        }
        this.timeout(10000);
        rzpInstance.paymentLink.all(expectedParams).then((response) => {
            assert.ok(response.hasOwnProperty('payment_links'))
            done()
        })
    })

    it('send notification', (done) => {
       this.timeout(10000);
        rzpInstance.paymentLink.notifyBy(paymentLinkId, "email").then((response) => {
            assert.ok(response.hasOwnProperty('success'))
            done()
        })
    })

    it('cancel paymentLink', (done) => {
        this.timeout(10000);
        rzpInstance.paymentLink.cancel(paymentLinkId).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            done()
        })
    })
})
