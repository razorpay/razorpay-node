'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')
const { getDateInSecs } = require('../../dist/utils/razorpay-utils')

describe('CUSTOMERS', () => {
  it('Create Customer', (done) => {
    let params = {
      name: 'test',
      email: 'test@razorpay.com',
      contact: '123456789',
      notes: {
        note1: 'This is note1',
        note2: 'This is note2'
      }
    }

    let expectedParams = {
      name: 'test',
      email: 'test@razorpay.com',
      contact: '123456789',
      notes: {
        note1: 'This is note1',
        note2: 'This is note2'
      }
    }

    mocker.mock({
      url: '/customers',
      method: 'POST'
    })

    rzpInstance.customers.create(params).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        '/v1/customers',
        'Create customer request url formed'
      )
      assert.ok(
        equal(
          response.__JUST_FOR_TESTS__.requestBody,
          expectedParams
        ),
        'All params are passed in request body'
      )
      done()
    })
  })

  it('Edit Customer', (done) => {
    const TEST_CUSTOMER_ID = 'cust_6fqBqgrfTSuj5v'
    let params = {
      name: 'test',
      email: 'test@razorpay.com',
      contact: '123456789',
      notes: {
        note1: 'This is note1'
      }
    }

    let expectedParams = {
      name: 'test',
      email: 'test@razorpay.com',
      contact: '123456789',
      notes: {
        note1: 'This is note1'
      }
    }

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}`,
      method: 'PUT'
    })

    rzpInstance.customers.edit(TEST_CUSTOMER_ID, params).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/customers/${TEST_CUSTOMER_ID}`,
        'Edit customer request url formed'
      )

      assert.ok(
        equal(
          response.__JUST_FOR_TESTS__.requestBody,
          expectedParams
        ),
        'All params are passed in request body'
      )
      done()
    })
  })

  it('Customer fetch', (done) => {
    const TEST_CUSTOMER_ID = 'cust_6fqBqgrfTSuj5v'

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}`
    })

    rzpInstance.customers.fetch(TEST_CUSTOMER_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/customers/${TEST_CUSTOMER_ID}`,
        'Fetch customer url formed correctly'
      )
      done()
    })
  })

  it('Fetch all customer ', (done) => {
    
    let expectedParams = {
      skip: 0,
      count: 10
    }

    mocker.mock({
      url: `/customers`
    })

    rzpInstance.customers.all({skip:0,count:10}).then((response) => {
      assert.ok(equal(
        response.__JUST_FOR_TESTS__.requestQueryParams,
        expectedParams
      ), 'skip & count are passed as default queryparams')
      done()
    })
  })

  it('Tokens fetch', (done) => {
    const TEST_CUSTOMER_ID = 'cust_6fqBqgrfTSuj5v'

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}/tokens`
    })

    rzpInstance.customers.fetchTokens(TEST_CUSTOMER_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/customers/${TEST_CUSTOMER_ID}/tokens`,
        'Fetch customer tokens url formed correctly'
      )
      done()
    })
  })

  it('Token fetch', (done) => {
    const TEST_CUSTOMER_ID = 'cust_6fqBqgrfTSuj5v'
    const TEST_TOKEN_ID = 'tkn_YDovP0Tg6fpsp'

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}/tokens/${TEST_TOKEN_ID}`
    })

    rzpInstance.customers.fetchToken(TEST_CUSTOMER_ID, TEST_TOKEN_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/customers/${TEST_CUSTOMER_ID}/tokens/${TEST_TOKEN_ID}`,
        'Fetch customer token url formed correctly'
      )
      done()
    })
  })

  it('Token delete', (done) => {
    const TEST_CUSTOMER_ID = 'cust_6fqBqgrfTSuj5v'
    const TEST_TOKEN_ID = 'tkn_YDovP0Tg6fpsp'

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}/tokens/${TEST_TOKEN_ID}`,
      method: 'DELETE'
    })

    rzpInstance.customers.deleteToken(TEST_CUSTOMER_ID, TEST_TOKEN_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/customers/${TEST_CUSTOMER_ID}/tokens/${TEST_TOKEN_ID}`,
        'Delete customer token url formed correctly'
      )
      done()
    })
  })

  it('Add bank account of customer', (done) => {
    const TEST_CUSTOMER_ID = 'cust_6fqBqgrfTSuj5v'
    const param = {
        "ifsc_code" : "UTIB0000194",
        "account_number"         :"916010082985661",
        "beneficiary_name"      : "Pratheek",
        "beneficiary_address1"  : "address 1",
        "beneficiary_address2"  : "address 2",
        "beneficiary_address3"  : "address 3",
        "beneficiary_address4"  : "address 4",
        "beneficiary_email"     : "random@email.com",
        "beneficiary_mobile"    : "8762489310",
        "beneficiary_city"      :"Bangalore",
        "beneficiary_state"     : "KA",
        "beneficiary_country"   : "IN"
    }

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}/bank_account`,
      method: 'POST'
    })

    rzpInstance.customers.addBankAccount(TEST_CUSTOMER_ID, param).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/customers/${TEST_CUSTOMER_ID}/bank_account`,
        'Add bank account of customer url formed correctly'
      )
      done()
    })
  })

  it('delete bank account of customer', (done) => {
    const TEST_CUSTOMER_ID = 'cust_6fqBqgrfTSuj5v'

    const TEST_BANK_ID = 'ba_NEWc5RgwY8AAUC'

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}/bank_account/${TEST_BANK_ID}`,
      method: 'DELETE'
    })

    rzpInstance.customers.deleteBankAccount(TEST_CUSTOMER_ID, TEST_BANK_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/customers/${TEST_CUSTOMER_ID}/bank_account/${TEST_BANK_ID}`,
        'delete bank account of customer url formed correctly'
      )
      done()
    })
  })

  it('Fetch eligibility id', (done) => {  

    const TEST_ELIGIBILITY_ID = 'elig_F1cxDoHWD4fkQt'

    mocker.mock({
      url: `/customers/eligibility/${TEST_ELIGIBILITY_ID}`,
      method: 'GET'
    })

    rzpInstance.customers.fetchEligibility(TEST_ELIGIBILITY_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/customers/eligibility/${TEST_ELIGIBILITY_ID}`,
        'fetch eligibility request url formed correctly'
      )
      done()
    })
  })

  it('Request for an eligibility check', (done) => {  
    const param = {
      "inquiry": "affordability",
      "amount": 500000,
      "currency": "INR",
      "customer": {
        "id": "cust_KhP5dO1dKmc0Rm",
        "contact": "+918220276214",
        "ip": "105.106.107.108",
        "referrer": "https://merchansite.com/example/paybill",
        "user_agent": "Mozilla/5.0"
      }
    }

    mocker.mock({
      url: `/customers/eligibility`,
      method: 'POST'
    })

    rzpInstance.customers.requestEligibilityCheck(param).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/customers/eligibility`,
        'Request for an eligibility check url formed correctly'
      )
      done()
    })
  })
})
