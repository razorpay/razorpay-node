'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const { getDateInSecs } = require('../../dist/utils/razorpay-utils');
const { runCallbackCheckTest,
    runParamsCheckTest }  = require("../../dist/utils/predefined-tests.js");

const SUB_PATH  = "/payments/qr_codes",
      FULL_PATH = `/v1${SUB_PATH}`,
      TEST_QRCODE_ID = "qr_sometestid",
      apiObj = rzpInstance.qrCode;

describe('qrCode ', () => {
  it('Create qrCode', (done) => {
    let params = {
        type: 'upi_qr',
        name: 'Store Front Display',
        usage : 'single_use',
        fixed_amount : 'true',
        customer_id:"cust_Aa000000000001",
        payment_amount : 300,
        account_type:"bank_account",
        description: "For Store 1",
        customer_id: "cust_HKsR5se84c5LTO",
        close_by: 1681615838,
    }

    mocker.mock({
      url:  SUB_PATH,
      method: 'POST'
    })

    rzpInstance.qrCode.create(params).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        '/v1/payments/qr_codes',
        'Create qr code request url formed'
      )
      done()
    })
  })

  it('qrCode fetch', (done) => {

    mocker.mock({
      url: `${SUB_PATH}/${TEST_QRCODE_ID}`
    })

    rzpInstance.qrCode.fetch(TEST_QRCODE_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `${FULL_PATH}/${TEST_QRCODE_ID}`,
        'Fetch qr code url formed correctly'
      )
      done()
    })
  })

  it('qrCode close', (done) => {

    mocker.mock({
      url: `${SUB_PATH}/${TEST_QRCODE_ID}/close`,
      method : 'POST'
    })

    rzpInstance.qrCode.close(TEST_QRCODE_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `${FULL_PATH}/${TEST_QRCODE_ID}/close`,
        'Fetch qr code url formed correctly'
      )
      done()
    })
  })
});

describe("Fetch all qrCode", () => {

    let methodName = "all",
        params = {
          "skip": 0,
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

    params = {"from": 1472063400, "to": 1472495400 };
    methodArgs = [params];
    expectedParams = {
                      "from": params.from,
                      "to": params.to,
                     };

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

  describe("Fetch all payment for a qrCode", () => {


    let methodName = "fetchAllPayments",
        params = {
          "skip": 0,
          "count": 10
        },
        methodArgs = [TEST_QRCODE_ID, params],
        expectedParams = {
          ...params
        },
        mockerParams = {
          url: SUB_PATH + '/' + TEST_QRCODE_ID + '/payments'
        };
       
        console.log(mockerParams.url)

      runParamsCheckTest({
        apiObj,
        methodName,
        methodArgs,
        mockerParams,
        expectedParams,
        testTitle: "Check if all params passed are being sent"
      });

      methodArgs = [TEST_QRCODE_ID ,{}];

      runCallbackCheckTest({
        apiObj,
        methodName,
        mockerParams,
        methodArgs
      });
  });

