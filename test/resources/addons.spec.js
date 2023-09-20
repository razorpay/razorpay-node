"use strict";

const Promise = require("promise");
const chai = require("chai");
const { assert } = chai;
const rzpInstance = require("../razorpay");
const mocker = require("../mocker");
const { getDateInSecs } = require("../../dist/utils/razorpay-utils");

const SUB_PATH = "/addons",
  FULL_PATH = `/v1${SUB_PATH}`,
  TEST_ADDON_ID = "addon_sometestid",
  apiObj = rzpInstance.addons;

const {
  runCommonTests,
  runParamsCheckTest,
  runCallbackCheckTest,
} = require("../../dist/utils/predefined-tests.js");

const runIDRequiredTest = (params) => {
  let { apiObj, methodName, methodArgs, mockerParams } = params;

  mocker.mock(mockerParams);

  it(`method ${methodName} checks for Addon ID as param`, (done) => {
    apiObj[methodName](...methodArgs).then(
      () => {
        done(
          new Error(`method ${methodName} does not` + ` check for Addon ID`)
        );
      },
      (err) => {
        done();
      }
    );
  });
};

describe("Addons", () => {
  describe("Fetch Addon", () => {
    let expectedUrl = `${FULL_PATH}/${TEST_ADDON_ID}`,
      methodName = "fetch",
      methodArgs = [TEST_ADDON_ID],
      mockerParams = {
        url: `${SUB_PATH}/${TEST_ADDON_ID}`,
      };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}`,
      },
    });

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedUrl,
    });
  });

  describe("Delete Addon", () => {
    let expectedUrl = `${FULL_PATH}/${TEST_ADDON_ID}`,
      methodName = "delete",
      methodArgs = [TEST_ADDON_ID],
      mockerParams = {
        url: `${SUB_PATH}/${TEST_ADDON_ID}`,
        method: "DELETE",
      };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}`,
        method: "DELETE",
      },
    });

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedUrl,
    });
  });

  describe("Fetch All Addons", () => {
    let methodName = "all",
      params = {
        param1: "something",
        skip: 10,
        count: 10,
      },
      methodArgs = [params],
      expectedParams = {
        ...params,
      },
      expectedUrl = FULL_PATH,
      mockerParams = {
        url: SUB_PATH,
      };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      expectedParams,
      mockerParams,
      testTitle: "Check if all params passed are being sent",
    });

    params = {};
    methodArgs = [params];
    expectedParams = { skip: 0, count: 10 };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      expectedParams,
      mockerParams,
      testTitle: "Check if skip and count are automatically populated",
    });

    params = { from: "Aug 25, 2016", to: "Aug 30, 2016" };
    methodArgs = [params];
    expectedParams = {
      from: getDateInSecs(params.from),
      to: getDateInSecs(params.to),
      count: "10",
      skip: "0",
    };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      expectedParams,
      mockerParams,
      testTitle: "Check if dates are converted to ms",
    });

    methodArgs = [{}];

    runCallbackCheckTest({
      apiObj,
      methodName,
      mockerParams,
      methodArgs,
    });
  });
});
