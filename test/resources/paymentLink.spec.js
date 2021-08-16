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
const SUB_PATH  = "/payment_links",
      FULL_PATH = `/v1${SUB_PATH}`,
      TEST_PAYMENTLINK_ID = "plink_ExjpAUN3gVHrPJ",
      apiObj = rzpInstance.paymentLink;

const runIDRequiredTest = (params) => {

  let {apiObj, methodName, methodArgs, mockerParams} = params;

  mocker.mock(mockerParams);

  it (`method ${methodName} checks for PaymentLink ID as param`,
      (done) => {

    apiObj[methodName](...methodArgs).then(() => {

      done(new Error(`method ${methodName} does not`+
                     ` check for PaymentLink ID`));
    },(err) => {

      done();
    });
  });
}

describe("PAYMENTLINK", () => {

  describe('Create PaymentLink', () => {
    it('Payment link create request', (done) => {
     
      let params= {
        "param1": "something",
        "param2": "something else",
        "notes[something]": "something else"
      };
      mocker.mock({
        url: `/payment_links`,
        method: 'POST',
        ignoreParseBody: true
      })

      rzpInstance.paymentLink.create(params).then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          '/v1/payment_links',
          'Create request url formed'
        )

        assert.ok(
          equal(
            response.__JUST_FOR_TESTS__.requestBody,
            {
              "param1": "something",
              "param2": "something else",
              "notes[something]": "something else"
            }
          ),
          'All params are passed in request body'
        )
        done()
      })
    })
  });

  describe("Cancel PaymentLink", () => {

    let expectedUrl = `${FULL_PATH}/${TEST_PAYMENTLINK_ID}/cancel`,
        methodName = "cancel",
        methodArgs = [TEST_PAYMENTLINK_ID],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_PAYMENTLINK_ID}/cancel`,
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

  describe("Fetch PaymentLink", () => {

    let expectedUrl = `${FULL_PATH}/${TEST_PAYMENTLINK_ID}`,
        methodName = "fetch",
        methodArgs = [TEST_PAYMENTLINK_ID],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_PAYMENTLINK_ID}`
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
});
