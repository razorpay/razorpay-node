'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')

let mockRequest = {
  "email": "gauriagain.kumar@example.org",
  "phone": "9000090000",
  "legal_business_name": "Acme Corp",
  "business_type": "partnership",
  "customer_facing_business_name": "Example",
  "profile": {
    "category": "healthcare",
    "subcategory": "clinic",
    "description": "Healthcare E-commerce platform",
    "addresses": {
      "operation": {
        "street1": "507, Koramangala 6th block",
        "street2": "Kormanagala",
        "city": "Bengaluru",
        "state": "Karnataka",
        "postal_code": 560047,
        "country": "IN"
      },
      "registered": {
        "street1": "507, Koramangala 1st block",
        "street2": "MG Road",
        "city": "Bengaluru",
        "state": "Karnataka",
        "postal_code": 560034,
        "country": "IN"
      }
    },
    "business_model": "Online Clothing ( men, women, ethnic, modern ) fashion and lifestyle, accessories, t-shirt, shirt, track pant, shoes."
  },
  "legal_info": {
    "pan": "AAACL1234C",
    "gst": "18AABCU9603R1ZM"
  },
  "brand": {
    "color": "FFFFFF"
  },
  "notes": {
    "internal_ref_id": "123123"
  },
  "contact_name": "Gaurav Kumar",
  "contact_info": {
    "chargeback": {
      "email": "cb@example.org"
    },
    "refund": {
      "email": "cb@example.org"
    },
    "support": {
      "email": "support@example.org",
      "phone": "9999999998",
      "policy_url": "https://www.google.com"
    }
  },
  "apps": {
    "websites": [
      "https://www.example.org"
    ],
    "android": [
      {
        "url": "playstore.example.org",
        "name": "Example"
      }
    ],
    "ios": [
      {
        "url": "appstore.example.org",
        "name": "Example"
      }
    ]
  }
}

const BASE_URL = '/accounts',
  API_VERSION = 'v2',
  TEST_ACCOUNT_ID = 'acc_GRWKk7qQsLnDjX';

describe('ACCOUNTS', () => {
  it('Create an account', (done) => {

    mocker.mock({
      version: API_VERSION,
      url: `${BASE_URL}`,
      method: 'POST'
    })

    rzpInstance.accounts.create(mockRequest).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v2/accounts`,
        'Create account request url formed'
      )

      assert.ok(
        equal(
          response.__JUST_FOR_TESTS__.requestBody.email,
          mockRequest.email
        ),
        'param are passed in request body'
      )
      done()
    })
  })

  it('Edit Account', (done) => {
    mocker.mock({
      version: API_VERSION,
      url: `/${BASE_URL}/${TEST_ACCOUNT_ID}`,
      method: 'PATCH'
    })

    rzpInstance.accounts.edit(TEST_ACCOUNT_ID, mockRequest).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v2/accounts/${TEST_ACCOUNT_ID}`,
        'Edit account request url formed'
      )

      assert.ok(
        equal(
          response.__JUST_FOR_TESTS__.requestBody.email,
          mockRequest.email
        ),
        'All params are passed in request body'
      )
      done()
    })
  })

  it('Account fetch', (done) => {
    mocker.mock({
      version: API_VERSION,
      url: `/${BASE_URL}/${TEST_ACCOUNT_ID}`
    })

    rzpInstance.accounts.fetch(TEST_ACCOUNT_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v2/accounts/${TEST_ACCOUNT_ID}`,
        'Fetch account url formed correctly'
      )
      done()
    })
  })

  it('Delete an account ', (done) => {

    mocker.mock({
      version: API_VERSION,
      url: `/${BASE_URL}/${TEST_ACCOUNT_ID}`,
      method: 'DELETE'
    })

    rzpInstance.accounts.delete(TEST_ACCOUNT_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v2/accounts/${TEST_ACCOUNT_ID}`,
        'Delete account url formed correctly'
      )
      done()
    })
  })

  it('fetch account document ', (done) => {
    mocker.mock({
      version: API_VERSION,
      url: `/${BASE_URL}/${TEST_ACCOUNT_ID}/documents`,
    })

    rzpInstance.accounts.fetchAccountDoc(TEST_ACCOUNT_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v2/accounts/${TEST_ACCOUNT_ID}/documents`,
        'Delete account url formed correctly'
      )
      done()
    })
  })
})
