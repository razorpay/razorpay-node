"use strict";

import rzpInstance from "../razorpay.js";
import {
  runCallbackCheckTest,
  runParamsCheckTest,
  runCommonTests,
} from "../../dist/utils/predefined-tests.js";
import { describe, it } from "mocha";

const SUB_PATH = "/items",
  FULL_PATH = `/v1${SUB_PATH}`,
  TEST_ITEM_ID = "item_sometestid",
  apiObj = rzpInstance.items;

describe("ITEMS", () => {
  describe("Create Item", () => {
    let expectedUrl = `${FULL_PATH}`,
      params = {
        name: "Book / English August",
        description: "An indian story, Booker prize winner.",
        amount: 20000,
        currency: "INR",
      },
      methodArgs = [params],
      methodName = "create",
      mockerParams = {
        url: `${SUB_PATH}`,
        method: "POST",
      };

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      expectedUrl,
      mockerParams,
    });
  });

  describe("Edit item", () => {
    let expectedUrl = `${FULL_PATH}/${TEST_ITEM_ID}`,
      methodName = "edit",
      params = {
        name: "Book / Ignited Minds - Updated name!",
        description: "New descirption too. :).",
      },
      methodArgs = [TEST_ITEM_ID, params],
      mockerParams = {
        url: `${SUB_PATH}/${TEST_ITEM_ID}`,
        method: "PATCH",
      };

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      expectedUrl,
      mockerParams,
    });
  });

  describe("Delete item", () => {
    let expectedUrl = `${FULL_PATH}/${TEST_ITEM_ID}`,
      methodName = "delete",
      methodArgs = [TEST_ITEM_ID],
      mockerParams = {
        url: `${SUB_PATH}/${TEST_ITEM_ID}`,
        method: "DELETE",
      };

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedUrl,
    });
  });

  describe("Fetch item", () => {
    let expectedUrl = `${FULL_PATH}/${TEST_ITEM_ID}`,
      methodName = "fetch",
      methodArgs = [TEST_ITEM_ID],
      mockerParams = {
        url: `${SUB_PATH}/${TEST_ITEM_ID}`,
      };

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedUrl,
    });
  });

  describe("Fetch All items", () => {
    let methodName = "all",
      params = {
        skip: 10,
        count: 10,
      },
      methodArgs = [params],
      expectedParams = {
        ...params,
      },
      mockerParams = {
        url: `${SUB_PATH}`,
      };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: "Check if all params passed are being sent",
    });

    params = {};
    methodArgs = [params];
    expectedParams = { skip: 0, count: 10 };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: "Check if skip and count are automatically populated",
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
