'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const { runCallbackCheckTest,
    runParamsCheckTest }  = require("../../dist/utils/predefined-tests.js");

const SUB_PATH  = "/settlements",
      FULL_PATH = `/v1${SUB_PATH}`,
      TEST_SETTLEMENT_ID = "setlod_sometestid",
      apiObj = rzpInstance.settlements;

describe('Settlements ', () => {
  it('Create on-demand settlement', (done) => {
    let params = {
        amount: 1000,
        settle_full_balance: 0,
        description: "Need this to make vendor payments.",
        notes: {
          notes_key_1: "Tea, Earl Grey, Hot",
          notes_key_2: "Tea, Earl Grey… decaf."
        }
      }

    mocker.mock({
      url:  `${SUB_PATH}/ondemand`,
      method: 'POST'
    })

    rzpInstance.settlements.create(params).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        '/v1/settlements/ondemand',
        'Create settlements request url formed'
      )
      done()
    })
  })

  it('Fetch a settlement', (done) => {

    mocker.mock({
      url: `${SUB_PATH}/${TEST_SETTLEMENT_ID}`
    })

    rzpInstance.settlements.fetch(TEST_SETTLEMENT_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `${FULL_PATH}/${TEST_SETTLEMENT_ID}`,
        'Fetch settlement url formed correctly'
      )
      done()
    })
  })

  it('Fetch On-demand Settlements by ID', (done) => {

    mocker.mock({
      url: `${SUB_PATH}/ondemand/${TEST_SETTLEMENT_ID}`
    })

    rzpInstance.settlements.fetchOndemandSettlementById(TEST_SETTLEMENT_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `${FULL_PATH}/ondemand/${TEST_SETTLEMENT_ID}`,
        'Fetch settlement url formed correctly'
      )
      done()
    })
  })

describe("Fetch all settlements", () => {

    let methodName = "all",
        params = {
          "skip": 0,
          "count": 10
        },
        methodArgs = [params],
        expectedParams = {
          ...params
        },

        mockerParams = {
          url: SUB_PATH
        };

      runParamsCheckTest({
        apiObj,
        methodName,
        methodArgs,
        mockerParams,
        expectedParams,
        testTitle: "Check if all params passed are being sent"
      });

      methodArgs = [{}];

      runCallbackCheckTest({
        apiObj,
        methodName,
        mockerParams,
        methodArgs
      });
  });

  describe("Settlement report for a month", () => {

    let methodName = "reports",
        params = {
          'year':2021,
          'month':9,
          'day': 3,
          "skip": 0,
          "count": 10
        },
        methodArgs = [params],
        expectedParams = {
          ...params
        },

        mockerParams = {
          url: `${SUB_PATH}/report/combined`
        };

      runParamsCheckTest({
        apiObj,
        methodName,
        methodArgs,
        mockerParams,
        expectedParams,
        testTitle: "Check if all params passed are being sent"
      });

      methodArgs = [{year:2021,month:9}];

      runCallbackCheckTest({
        apiObj,
        methodName,
        mockerParams,
        methodArgs
      });
  });

  describe("Settlement recon", () => {

    let methodName = "settlementRecon",
        params = {
          'year':2021,
          'month':9,
          'day': 3
        },
        methodArgs = [params],
        expectedParams = {
          ...params
        },

        mockerParams = {
          url: `${SUB_PATH}/recon/combined`
        };

      runParamsCheckTest({
        apiObj,
        methodName,
        methodArgs,
        mockerParams,
        expectedParams,
        testTitle: "Check if all params passed are being sent"
      });

      methodArgs = [{year:2021,month:9}];

      runCallbackCheckTest({
        apiObj,
        methodName,
        mockerParams,
        methodArgs
      });
  });

  describe("Fetch all on-demand settlements", () => {

    let methodName = "fetchAllOndemandSettlement",
        params = {
          "skip": 0,
          "count": 10
        },
        methodArgs = [params],
        expectedParams = {
          ...params
        },

        mockerParams = {
          url: `${SUB_PATH}/ondemand`
        };

      runParamsCheckTest({
        apiObj,
        methodName,
        methodArgs,
        mockerParams,
        expectedParams,
        testTitle: "Check if all params passed are being sent"
      });

      methodArgs = [{}];

      runCallbackCheckTest({
        apiObj,
        methodName,
        mockerParams,
        methodArgs
      });
  });
});

