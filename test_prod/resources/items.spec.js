'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')

let itemId = null;

describe('ITEMS', () => {

  it('item create request', (done) => {

    rzpInstance.items.create({
        "name": "Book / English August",
        "description": "An indian story, Booker prize winner.",
        "amount": 20000,
        "currency": "INR"
      }).then((response) => {
      
      itemId = response.id
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('name'))
      done()
    }).catch(err => console.log(err))
  })

  it('fetch item', (done) => {
    rzpInstance.items.fetch(itemId).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok(response.hasOwnProperty('name'))
      done()
    }).catch(err => console.log(err))
  })

  it('fetch all items', (done) => {
    rzpInstance.items.all().then((response) => {
      assert.ok(response.hasOwnProperty('entity'))
      assert.ok(response.hasOwnProperty('items'))
      done()
    }).catch(err => console.log(err))
  })

  it('edit item', (done) => {
    let params = {
        "name": "Book / Ignited Minds - Updated name!",
        "description": "New descirption too. :).",
        "amount": 20000,
        "currency": "INR",
        "active": true
      }

    rzpInstance.items.edit(itemId, params).then((response) => {
      assert.ok(response.hasOwnProperty('id'))
      assert.ok((response.id === itemId))
      done()
    }).catch(err => console.log(err))
  })

  it('delete items', (done) => {
    rzpInstance.items.delete(itemId).then((response) => {
      assert.ok((typeof response === 'object'))
      done()
    }).catch(err => console.log(err))
  })
})
