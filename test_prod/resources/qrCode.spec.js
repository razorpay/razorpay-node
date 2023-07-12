'use strict'

var assert = require('assert');
const rzpInstance = require('../razorpay')
const equal = require('deep-equal')

let qrcodeId = null;
let customerId = null;

describe('QRCODE', () => {

  it('qrcode create request', (done) => {
    
    rzpInstance.customers.create({
      "name": "Gaurav Kumar",
      "contact": 9123456780,
      "email": "gaurav.kumar@example.com",
      "fail_existing": 0,
      "notes": {
        "notes_key_1": "Tea, Earl Grey, Hot",
        "notes_key_2": "Tea, Earl Grey… decaf."
      }
    }).then((response)=>{
        customerId = response.id
        return customerId
    }).then((id)=>{
      rzpInstance.qrCode.create({
        "type": "upi_qr",
        "name": "Store_1",
        "usage": "single_use",
        "fixed_amount": true,
        "payment_amount": 300,
        "description": "For Store 1",
        "customer_id": id,
        "notes": {
          "purpose": "Test UPI QR code notes"
        }
      }).then((response) => {
        qrcodeId = response.id
        assert.ok(response.hasOwnProperty('id'))
        assert.ok(response.hasOwnProperty('entity'))
        done()
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  })

  it('fetch qrcode', (done) => {
    rzpInstance.qrCode.fetch(qrcodeId).then((response) => {
      assert.ok(response.hasOwnProperty('entity'))
      assert.ok((response.id === qrcodeId))
      done()
    })
  })

  it('fetch all qrcode', (done) => {
    rzpInstance.qrCode.all({ count : 1 }).then((response) => {
      assert.ok(response.hasOwnProperty('entity'))
      assert.ok(response.hasOwnProperty(('items')))
      done()
    })
  })

  it('close qrcode', (done) => {
    rzpInstance.qrCode.close(qrcodeId).then((response) => {
      assert.ok(response.hasOwnProperty('entity'))
      assert.ok((response.id === qrcodeId))
      done()
    })
  })
})
