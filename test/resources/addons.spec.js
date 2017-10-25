'use strict';

const Promise = require('promise')
const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay');
const mocker = require('../mocker');

const SUB_PATH = "/addons",
      FULL_PATH = `/v1${SUB_PATH}`,
      TEST_ADDON_ID = "addon_sometestid",
      apiObj = rzpInstance.addons;

const { runCommonTests }  = require("../../dist/utils/predefined-tests.js");

const runIDRequiredTest = (params) => {

  let {apiObj, methodName, methodArgs, mockerParams} = params;

  mocker.mock(mockerParams);

  it (`method ${methodName} checks for Addon ID as param`,
      (done) => {

    apiObj[methodName](...methodArgs).then(() => {

      done(new Error(`method ${methodName} does not`+
                     ` check for Addon ID`));
    },(err) => {

      done();
    });
  });
}

describe("Addons", () => {

  describe("Fetch Addon", () => {
  
    let expectedUrl = `${FULL_PATH}/${TEST_ADDON_ID}`,
        methodName = "fetch",
        methodArgs = [TEST_ADDON_ID],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_ADDON_ID}`
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

  describe("Delete Addon", () => {
  
    let expectedUrl = `${FULL_PATH}/${TEST_ADDON_ID}`,
        methodName = "delete",
        methodArgs = [TEST_ADDON_ID],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_ADDON_ID}`,
          method: "DELETE"
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}`,
        method: "DELETE"
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
});
