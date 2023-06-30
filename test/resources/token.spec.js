'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')

let mockRequest = {
    "customer_id": "cust_1Aa00000000001",
    "method": "card",
    "card": {
      "number": "4111111111111111",
      "cvv": "123",
      "expiry_month": "12",
      "expiry_year": "21",
      "name": "Gaurav Kumar"
    },
    "authentication": {
      "provider": "razorpay",
      "provider_reference_id": "pay_123wkejnsakd",
      "authentication_reference_number": "100222021120200000000742753928"  
    },
    "notes": []
  }

const BASE_URL = '/tokens',
      API_VERSION = 'v2';

describe('TOKENS', () => {
  it('Create an token', (done) => {

    mocker.mock({
      url: `${BASE_URL}`,
      method: 'POST'
    })

    rzpInstance.tokens.create(mockRequest).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/tokens`,
        'Create token request url formed'
      )

      assert.ok(
        equal(
          response.__JUST_FOR_TESTS__.requestBody.customer_id,
          mockRequest.customer_id
        ),
        'param are passed in request body'
      )
      done()
    })
  })

  it('fetch card properties', (done) => {
    
    const mockRequest = {
      id: 'token_4lsdksD31GaZ09'
    }  

    mocker.mock({
      url: `/${BASE_URL}/fetch`,
      method: 'POST'
    })

    rzpInstance.tokens.fetch(mockRequest).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/tokens/fetch`,
        'Fetch account url formed correctly'
      )
      done()
    })
  })

  it('delete token', (done) => {
    
    const mockRequest = {
      id: 'token_4lsdksD31GaZ09'
    }  

    mocker.mock({
      url: `/${BASE_URL}/delete`,
      method: 'POST'
    })

    rzpInstance.tokens.delete(mockRequest).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/tokens/delete`,
        'Fetch account url formed correctly'
      )
      done()
    })
  })
})
