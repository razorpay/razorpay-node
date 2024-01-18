"use strict";

import rzpInstance from "../razorpay.js";
import mocker from "../mocker.js";
import {
  runCallbackCheckTest,
  runParamsCheckTest,
} from "../../dist/utils/predefined-tests.js";
import { describe, it } from "mocha";

const SUB_PATH = "/payments/qr_codes",
  FULL_PATH = `/v1${SUB_PATH}`,
  TEST_QRCODE_ID = "qr_sometestid",
  apiObj = rzpInstance.qrCode;

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

describe("QRCODE ", () => {
  describe("Create QrCode", () => {
    let expectedUrl = `${FULL_PATH}`,
      params = {
        type: "upi_qr",
        name: "Store Front Display",
        usage: "single_use",
        fixed_amount: true,
        customer_id: "cust_Aa000000000001",
        payment_amount: 300,
        account_type: "bank_account",
        description: "For Store 1",
        customer_id: "cust_HKsR5se84c5LTO",
        close_by: 1681615838,
      },
      expectedParams = {
        ...params,
      },
      methodArgs = [params],
      methodName = "create",
      mockerParams = {
        url: `${SUB_PATH}`,
        method: "POST",
      };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: "Check if all params passed are being sent",
    });

    runCallbackCheckTest({
      apiObj,
      methodName,
      mockerParams,
      methodArgs,
    });
  });

  describe("Fetch QrCode", () => {
    let expectedUrl = `${FULL_PATH}/${TEST_QRCODE_ID}`,
      methodName = "fetchAllPayments",
      methodArgs = [TEST_QRCODE_ID],
      mockerParams = {
        url: `${SUB_PATH}/${TEST_QRCODE_ID}`,
      };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}`,
      },
    });

    methodArgs = [TEST_QRCODE_ID, {}];

    runCallbackCheckTest({
      apiObj,
      methodName,
      mockerParams,
      methodArgs,
    });
  });

  describe("Close QrCode", () => {
    let methodName = "close",
      methodArgs = [TEST_QRCODE_ID],
      mockerParams = {
        url: `${SUB_PATH}/${TEST_QRCODE_ID}`,
      },
      expectedUrl = `${FULL_PATH}/${TEST_QRCODE_ID}/close`;

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}/close`,
      },
    });

    methodArgs = [TEST_QRCODE_ID];

    runCallbackCheckTest({
      apiObj,
      methodName,
      mockerParams,
      methodArgs,
    });
  });

  describe("Fetch all QrCode", () => {
    let methodName = "all",
      params = {
        skip: 0,
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
      mockerParams,
      expectedParams,
      testTitle: "Check if all params passed are being sent",
    });

    params = { from: 1472063400, to: 1472495400 };
    methodArgs = [params];
    expectedParams = {
      from: params.from,
      to: params.to,
    };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
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

  describe("Fetch all QrCode", () => {
    let methodName = "all",
      params = {
        skip: 0,
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
      mockerParams,
      expectedParams,
      testTitle: "Check if all params passed are being sent",
    });

    params = { from: 1472063400, to: 1472495400 };
    methodArgs = [params];
    expectedParams = {
      from: params.from,
      to: params.to,
    };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
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

  describe("Fetch QR Code for a Customer ID", () => {
    let methodName = "all",
      params = {
        customer_id: "cust_IDyPCCMDyHvypc",
      },
      methodArgs = [params],
      expectedParams = {
        ...params,
      },
      mockerParams = {
        url: SUB_PATH,
      };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: "Check if all params passed are being sent",
    });

    methodArgs = [{}];

    runCallbackCheckTest({
      apiObj,
      methodName,
      mockerParams,
      methodArgs,
    });
  });

  describe("Fetch QR Code for a Payment ID", () => {
    let methodName = "all",
      params = {
        payment_id: "pay_Di5iqCqA1WEHq6",
      },
      methodArgs = [params],
      expectedParams = {
        ...params,
      },
      mockerParams = {
        url: SUB_PATH,
      };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: "Check if all params passed are being sent",
    });

    methodArgs = [{}];

    runCallbackCheckTest({
      apiObj,
      methodName,
      mockerParams,
      methodArgs,
    });
  });

  describe("Fetch all payment for a QrCode", () => {
    let methodName = "fetchAllPayments",
      params = {
        skip: 0,
        count: 10,
      },
      methodArgs = [TEST_QRCODE_ID, params],
      expectedParams = {
        ...params,
      },
      mockerParams = {
        url: SUB_PATH + "/" + TEST_QRCODE_ID + "/payments",
      };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: "Check if all params passed are being sent",
    });

    methodArgs = [TEST_QRCODE_ID, {}];

    runCallbackCheckTest({
      apiObj,
      methodName,
      mockerParams,
      methodArgs,
    });
  });
});
