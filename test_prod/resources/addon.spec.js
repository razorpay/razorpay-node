'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')
const equal = require('deep-equal');
const { items } = require('../razorpay');

let addonId = null;

describe('ADDON', () => {

    it('Fetch all addons', (done) => {

        rzpInstance.addons.all({ "count": 1 }).then((response) => {
            if (response.hasOwnProperty('items')) {
                if ('id' in response.items[0]) {
                    addonId = response.items[0].id
                }
            }
            assert.ok(response.hasOwnProperty('count'))
            assert.ok(response.hasOwnProperty('items'))
            done()
        }).catch(err => console.log(err))
    })

    it('fetch order\'s payments', (done) => {
        rzpInstance.addons.fetch(addonId).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            done()
        })
    })
})
