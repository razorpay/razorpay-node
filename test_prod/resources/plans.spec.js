'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')

let planId = null;

describe('PLANS', () => {

  it('plan create request', (done) => {

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
      
      planId = response.id
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('fetch plan', (done) => {
    rzpInstance.plans.fetch(planId).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err => console.log(err))
  })

  it('fetch all plans', (done) => {
    rzpInstance.items.all({
      count : 1
    }).then((response) => {
      assert.ok(response.hasOwnProperty('entity'))
      assert.ok(response.hasOwnProperty('items'))
      done()
    }).catch(err => console.log(err))
  })
})
