'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')
const { getDateInSecs } = require('../../dist/utils/razorpay-utils')
const { runCallbackCheckTest,
    runParamsCheckTest }  = require("../../dist/utils/predefined-tests.js");

const SUB_PATH  = "/settlements",
      FULL_PATH = `/v1${SUB_PATH}`,
      TEST_SETTLEMENT_ID = "setlod_sometestid",
      apiObj = rzpInstance.settlements;

describe('SETTLEMENTS ', () => {

  describe('Create on-demand settlement', (done) => {

    let methodName = "createOndemandSettlement",
    params = {
      amount: 1000,
      settle_full_balance: 0,
      description: "Need this to make vendor payments."
    },
    methodArgs = [params],
    expectedParams = {
      ...params
    },

    mockerParams = {
      url: `${SUB_PATH}/ondemand`,
      method : 'POST'
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
  })

  describe('Fetch a settlement', (done) => {

      let methodName = "fetch",
      methodArgs = [TEST_SETTLEMENT_ID],
      mockerParams = {
        url: `${SUB_PATH}/${TEST_SETTLEMENT_ID}`
      };

      runCallbackCheckTest({
        apiObj,
        methodName,
        mockerParams,
        methodArgs
      });
  })

  describe('Fetch On-demand Settlements by ID', (done) => {

    let methodName = "fetchOndemandSettlementById",
      methodArgs = [TEST_SETTLEMENT_ID],
      mockerParams = {
        url: `${SUB_PATH}/ondemand/${TEST_SETTLEMENT_ID}`
      },
      expectedParams = {};

      runParamsCheckTest({
        apiObj,
        methodName,
        methodArgs,
        mockerParams,
        expectedParams,
        testTitle: "Check if all params passed are being sent"
      });
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

      it('`From` & `To` dates are converted to seconds', (done) => {
        let fromDate = 'Aug 25, 2016'
        let toDate = 'Aug 30, 2016'
        let fromDateInSecs = getDateInSecs(fromDate)
        let toDateInSecs = getDateInSecs(toDate)

        mocker.mock({
          url: SUB_PATH
        })

        rzpInstance.settlements.all({
          from: fromDate,
          to: toDate,
          count: 25,
          skip: 5
        }).then((response) => {
          assert.ok(equal(
            response.__JUST_FOR_TESTS__.requestQueryParams,
            {
              from: fromDateInSecs,
              to: toDateInSecs,
              count: 25,
              skip: 5
            }
          ), 'from & to dates are converted to seconds')
          done()
        })
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

      it('`From` & `To` dates are converted to seconds', (done) => {
        let fromDate = 'Aug 25, 2016'
        let toDate = 'Aug 30, 2016'
        let fromDateInSecs = getDateInSecs(fromDate)
        let toDateInSecs = getDateInSecs(toDate)

        mocker.mock({
          url: `${SUB_PATH}/ondemand`
        })

        rzpInstance.settlements.fetchAllOndemandSettlement({
          from: fromDate,
          to: toDate,
          count: 25,
          skip: 5
        }).then((response) => {
          assert.ok(equal(
            response.__JUST_FOR_TESTS__.requestQueryParams.from,
            fromDateInSecs
          ), 'from date is converted to seconds')
          assert.ok(equal(
            response.__JUST_FOR_TESTS__.requestQueryParams.to,
            toDateInSecs
          ), 'to date is converted to seconds')
          done()
        })
      });
  });
});

