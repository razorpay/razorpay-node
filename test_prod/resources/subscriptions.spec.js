'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')

let subscriptionId = null;

let setSubscriptionParam = (id) => {
    return {
        "plan_id": id,
        "total_count": 6,
        "quantity": 1,
        "customer_notify": 1,

        "addons": [
            {
                "item": {
                    "name": "Delivery charges",
                    "amount": 30000,
                    "currency": "INR"
                }
            }
        ],
        "notes": {
            "notes_key_1": "Tea, Earl Grey, Hot",
            "notes_key_2": "Tea, Earl Grey… decaf."
        }
    }
}


describe('Subscription', () => {

    it('create subscription', (done) => {

        rzpInstance.plans.create({
            "period": "weekly",
            "interval": 1,
            "item": {
                "name": "Test plan - Weekly",
                "amount": 69900,
                "currency": "INR",
                "description": "Description for the test plan"
            },
            "notes": {
                "notes_key_1": "Tea, Earl Grey, Hot",
                "notes_key_2": "Tea, Earl Grey… decaf."
            }
        }).then((response) => {
            return response.id
        }).then((id) => {
            rzpInstance.subscriptions.create(setSubscriptionParam(id))
                .then(response => {
                    assert.ok(response.hasOwnProperty('entity'))
                    assert.ok(response.hasOwnProperty('id'))
                    done()
                }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    })

    it('fetch all subscriptions', (done) => {
        rzpInstance.subscriptions.all({"status": "active"}).then((response) => {
            response.items.find(item => {
                if (item.status == 'active' && item.payment_method == "card") {
                    console.log(item)
                    subscriptionId = item.id
                    return true
                }
            })
            assert.ok(response.hasOwnProperty('count'))
            assert.ok(response.hasOwnProperty('items'))
            done()
        }).catch(err => console.log(err))
    })

    it('fetch subscription', (done) => {

        rzpInstance.subscriptions.fetch(subscriptionId)
            .then(response => {
                assert.ok(response.hasOwnProperty('entity'))
                assert.ok((response.id == subscriptionId))
                done()
            }).catch(err => console.log(err))
    })

    it('edit subscription', (done) => {

        rzpInstance.subscriptions.update(subscriptionId, {
            "customer_notify": 1
        })
            .then(response => {
                assert.ok(response.hasOwnProperty('entity'))
                assert.ok((response.id == subscriptionId))
                done()
            }).catch(err => console.log(err))
    })

    it('pause subscription', (done) => {

        rzpInstance.subscriptions.pause(subscriptionId, {
            "pause_at": "now"
        })
            .then(response => {
                assert.ok(response.hasOwnProperty('entity'))
                assert.ok((response.id == subscriptionId))
                done()
            }).catch(err => console.log(err))
    })

    it('resume subscription', (done) => {

        rzpInstance.subscriptions.resume(subscriptionId, {
            "resume_at": "now"
        })
            .then(response => {
                assert.ok(response.hasOwnProperty('entity'))
                assert.ok((response.id == subscriptionId))
                done()
            }).catch(err => console.log(err))
    })

})
