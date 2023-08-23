'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')
const equal = require('deep-equal')


let settlementId = null;

describe('ORDERS', () => {

    it('fetch all settlements', (done) => {
        rzpInstance.settlements.all({
            count: 1
        }).then((response) => {
            if (response.items.length > 0) {
                settlementId = response.items[0].id
            }
            assert.ok(response.hasOwnProperty('entity'))
            assert.ok(response.hasOwnProperty('items'))
            done()
        }).catch(err => console.log(err))
    })

    it('fetch settlement', (done) => {

    rzpInstance.settlements.fetch(settlementId)
        .then(response => {
            assert.ok(response.hasOwnProperty('entity'))
            assert.ok((response.id == settlementId))
            done()
        }).catch(err => console.log(err))
    })

})
