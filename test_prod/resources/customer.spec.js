'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')
const equal = require('deep-equal')

var customerId = null;

describe('CUSTOMERS', () => {

  it('Customer create request', (done) => {

    let params = {
        "name": "Gaurav Kumar",
        "contact": 9123456780,
        "email": "gaurav.kumar@example.com",
        "fail_existing": "0",
        "notes": {
          "notes_key_1": "Tea, Earl Grey, Hot",
          "notes_key_2": "Tea, Earl Grey… decaf."
        }
      }

    rzpInstance.customers.create(params).then((response) => {
      customerId = response.id
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      done()
    }).catch(err=>console.log(err))
  })

  it('fetch customers', (done) => {
    rzpInstance.customers.fetch(customerId).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok((response.id==customerId))
      done()
    })
  })

  it('edit customer', (done) => {
    let params = {
        "contact": 9123456780
    }

    rzpInstance.customers.edit(customerId, params).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('entity'))
      assert.ok((response.id==customerId))
      done()
    }).catch(err=>console.log(err))
  })

  it('fetch all customers', (done) => {
    let expectedParams = {
      skip: 0,
      count: 10
    }

    rzpInstance.orders.all(expectedParams).then((response) => {
      assert.ok(response.hasOwnProperty('items'))
      assert.ok(response.hasOwnProperty('count'))
      done()
    })
  })
})
