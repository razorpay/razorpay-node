'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')

let customerId = null;
let transferId = null;

describe('TRANSFERS', () => {

    it('fetch all transfers', (done) => {

        rzpInstance.transfers.all()
        .then((response) => {
            if(response.items.length > 0){
                if('id' in  response.items[0]){
                    transferId = response.items[0].id
                }
            }
            assert.ok(response.hasOwnProperty('count'))
            assert.ok(response.hasOwnProperty('items'))
            done()
        }).catch(err => console.log(err))
    })

    it('fetch transfer', (done) => {
        rzpInstance.transfers.fetch(transferId).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            assert.ok(response.hasOwnProperty('entity'))
            assert.ok((response.id == transferId))
            done()
        }).catch(err => console.log(err))
    })

    it('fetch settlement details', (done) => {
        rzpInstance.transfers.fetchSettlements().then((response) => {
            assert.ok(response.hasOwnProperty('count'))
            assert.ok(response.hasOwnProperty('items'))
            done()
        }).catch(err => console.log(err))
    })
})
