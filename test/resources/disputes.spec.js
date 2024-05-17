'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')

let mockRequest = {
    "amount": 5000,
    "summary": "goods delivered",
    "shipping_proof": [
      "doc_EFtmUsbwpXwBH9",
      "doc_EFtmUsbwpXwBH8"
    ],
    "others": [
      {
        "type": "receipt_signed_by_customer",
        "document_ids": [
          "doc_EFtmUsbwpXwBH1",
          "doc_EFtmUsbwpXwBH7"
        ]
      }
    ],
    "action": "draft"
}

const BASE_URL = '/disputes',
    TEST_DISPUTE_ID = 'disp_AHfqOvkldwsbqt';

describe('DISPUTE', () => {

    it('Dispute fetch', (done) => {
        mocker.mock({
            url: `/${BASE_URL}/${TEST_DISPUTE_ID}`
        })

        rzpInstance.disputes.fetch(TEST_DISPUTE_ID).then((response) => {
            assert.equal(
                response.__JUST_FOR_TESTS__.url,
                `/v1/disputes/${TEST_DISPUTE_ID}`,
                'Fetch dispute url formed correctly'
            )
            done()
        })
    })

    it('Fetch all dispute', (done) => {

        mocker.mock({
            url: `/${BASE_URL}`,
        })

        rzpInstance.disputes.all({count:10, skip: 0}).then((response) => {
            assert.equal(
                response.__JUST_FOR_TESTS__.url,
                `/v1/disputes?count=10&skip=0`,
                'fetch all disputes url formed correctly'
            )
            done()
        })
    })

    it('Accept a dispute ', (done) => {
        mocker.mock({
            url: `/${BASE_URL}/${TEST_DISPUTE_ID}/accept`,
            method: "POST"
        })

        rzpInstance.disputes.accept(TEST_DISPUTE_ID).then((response) => {
            assert.equal(
                response.__JUST_FOR_TESTS__.url,
                `/v1/disputes/${TEST_DISPUTE_ID}/accept`,
                'accept a dispute url formed correctly'
            )
            done()
        })
    })

    it('contest a dispute ', (done) => {
        mocker.mock({
            url: `/${BASE_URL}/${TEST_DISPUTE_ID}/contest`,
            method: "PATCH"
        })

        rzpInstance.disputes.contest(TEST_DISPUTE_ID, mockRequest).then((response) => {
            assert.equal(
                response.__JUST_FOR_TESTS__.url,
                `/v1/disputes/${TEST_DISPUTE_ID}/contest`,
                'accept a dispute url formed correctly'
            )
            done()
        })
    })
})
