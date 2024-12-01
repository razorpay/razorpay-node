'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')
const equal = require('deep-equal');
const { items } = require('../razorpay');

let cardId = "card_LcQgzpfvWP0UKF";

describe('CARDS', () => {
    it('fetch order\'s payments', (done) => {
        rzpInstance.cards.fetch(cardId).then((response) => {
            assert.ok(response.hasOwnProperty('id'))
            done()
        })
    })
})
