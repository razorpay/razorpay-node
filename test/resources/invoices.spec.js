'use strict';

const Promise = require('promise')
const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay');
const mocker = require('../mocker')
const equal = require('deep-equal')
const { getDateInSecs,
        normalizeDate,
        normalizeNotes
      } = require('../../dist/utils/razorpay-utils');
const { runCallbackCheckTest,
        runParamsCheckTest,
        runURLCheckTest,
        runCommonTests }  = require("../../dist/utils/predefined-tests.js");

const SUB_PATH  = "/invoices",
      FULL_PATH = `/v1${SUB_PATH}`,
      TEST_INVOICE_ID = "inv_8l7Qvjbguwm3Dq",
      apiObj = rzpInstance.invoices;

const runIDRequiredTest = (params) => {

  let {apiObj, methodName, methodArgs, mockerParams} = params;

  mocker.mock(mockerParams);

  it (`method ${methodName} checks for Invoice ID as param`,
      (done) => {

    apiObj[methodName](...methodArgs).then(() => {

      done(new Error(`method ${methodName} does not`+
                     ` check for Invoice ID`));
    },(err) => {

      done();
    });
  });
}

describe("INVOICES", () => {

  describe('Create Invoice', () => {

    let expectedUrl = `${FULL_PATH}`,
        params = {
          param1: "something",
          param2: "something else",
          notes: {"something": "something else"}
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

  describe('Edit Invoice', () => {

    let expectedUrl = `${FULL_PATH}/${TEST_INVOICE_ID}`,
        methodName = "edit",
        params = {
          param1: "something",
          param2: "something else",
          notes: {"something": "something else"}
        },
        expectedParams = {
          param1: params.param1,
          param2: params.param2,
          ...(normalizeNotes(params.notes))
        },
        methodArgs = [TEST_INVOICE_ID, params],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_INVOICE_ID}`,
          method: "PATCH"
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}`,
        method: mockerParams.method
      }
    });

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      expectedUrl,
      expectedParams,
      mockerParams
    });
  });

  describe('Issue Invoice', () => {

    let expectedUrl = `${FULL_PATH}/${TEST_INVOICE_ID}/issue`,
        methodName = "issue",
        methodArgs = [TEST_INVOICE_ID],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_INVOICE_ID}/issue`,
          method: "POST"
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}/issue`,
        method: mockerParams.method
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

  describe('Delete Invoice', () => {

    let expectedUrl = `${FULL_PATH}/${TEST_INVOICE_ID}`,
        methodName  = "delete",
        methodArgs  = [TEST_INVOICE_ID],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_INVOICE_ID}`,
          method: "DELETE"
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}`,
        method: mockerParams.method
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

  describe("Cancel Invoice", () => {

    let expectedUrl = `${FULL_PATH}/${TEST_INVOICE_ID}/cancel`,
        methodName = "cancel",
        methodArgs = [TEST_INVOICE_ID],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_INVOICE_ID}/cancel`,
          method: "POST"
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}/cancel`,
        method: mockerParams.method
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

  describe("Fetch Invoice", () => {

    let expectedUrl = `${FULL_PATH}/${TEST_INVOICE_ID}`,
        methodName = "fetch",
        methodArgs = [TEST_INVOICE_ID],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_INVOICE_ID}`
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

  describe("Fetch Multiple", () => {

    let methodName = "all",
        params = {
          "param1": "something",
          "skip": 10,
          "count": 10
        },
        methodArgs = [params],
        expectedParams = {
          ...params
        },
        expectedUrl = FULL_PATH,
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

      params = {};
      methodArgs = [params];
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

  describe("Notify", () => {

    let medium = "email",
        expectedUrl = `${FULL_PATH}/${TEST_INVOICE_ID}/notify_by/${medium}`,
        methodName = "notifyBy",
        methodArgs = [TEST_INVOICE_ID, medium],
        mockerParams = {
          "url": `${SUB_PATH}/${TEST_INVOICE_ID}/notify_by/${medium}`,
          "method": "POST"
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined, medium],
      mockerParams: {
        "url": `${SUB_PATH}/${undefined}/notify_by/${medium}`,
        "method": "POST"
      }
    });

    it ("notify method checks for `medium` parameter", (done) => {

      mocker.mock({
        url: `${SUB_PATH}/${TEST_INVOICE_ID}/notify_by/${undefined}`,
        method: "POST"
      });

      apiObj[methodName](TEST_INVOICE_ID, undefined).then(() => {

        done(new Error("medium parameter is not checked for"));
      }).catch(() => {

        assert.ok("medium parameter is checked");
        done();
      });
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
