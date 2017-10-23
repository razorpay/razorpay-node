'use strict';

const Promise = require('promise')
const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay');
const mocker = require('../mocker');
const { getDateInSecs,
        normalizeDate,
        normalizeNotes
      } = require('../../dist/utils/razorpay-utils');
const { runCallbackCheckTest,
        runParamsCheckTest,
        runURLCheckTest,
        runCommonTests }  = require("../../dist/utils/predefined-tests.js");

const SUB_PATH = "/plans",
      FULL_PATH = `/v1${SUB_PATH}`,
      TEST_PLAN_ID = "plan_testid",
      apiObj = rzpInstance.plans;

const runIDRequiredTest = (params) => {

  let {apiObj, methodName, methodArgs, mockerParams} = params;

  mocker.mock(mockerParams);

  it (`method ${methodName} checks for Plan ID as param`,
      (done) => {

    apiObj[methodName](...methodArgs).then(() => {

      done(new Error(`method ${methodName} does not`+
                     ` check for Plan ID`));
    },(err) => {

      done();
    });
  });
}

describe("PLANS", () => {

  describe('Create Plan', () => {
  
    let expectedUrl = `${FULL_PATH}`,
        params = {
          param1: "something",
          param2: "somethingelse",
          notes:{"something": "something else"}
        },
        expectedParams = {
          param1: params.param1,
          param2: params.param2,
          ...(normalizeNotes(params.notes))
        },
        methodArgs = [params],
        methodName = "create",
        mockerParams = {
          url: `${SUB_PATH}`,
          method: "POST"
        };

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      expectedUrl,
      expectedParams,
      mockerParams
    });
  });

  describe('Fetch Plan', () => {
  
    let expectedUrl = `${FULL_PATH}/${TEST_PLAN_ID}`,
        methodName = "fetch",
        methodArgs = [TEST_PLAN_ID],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_PLAN_ID}`
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}`
      }
    });

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedUrl
    });
  });

  describe('Fech All Plans', () => {
  
    let expectedUrl = `${FULL_PATH}`,
        methodName = "all",
        params = {
          "param1": "something",
          "skip": 10,
          "count": 10
        },
        methodArgs = [params],
        expectedParams = {...params},
        mockerParams = {
          url: `${SUB_PATH}`
        };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: "Check if all parameters passed are being sent"
    });

    params = {};
    methodArgs = [params],
    expectedParams = {"skip": 0, "count": 10};

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: "Check if skip and count are automatically populated"
    });


    params = {"from": 'Aug 25, 2016', "to": 'Aug 30, 2016'};
    methodArgs = [params];
    expectedParams = {"from": getDateInSecs(params.from),
                      "to": getDateInSecs(params.to),
                      "count": "10",
                      "skip": "0"};

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: "Check if dates are converted to ms"
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

