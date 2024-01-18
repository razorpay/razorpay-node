"use strict";

import rzpInstance from "../razorpay.js";
import { runCommonTests } from "../../dist/utils/predefined-tests.js";
import { describe, it } from "mocha";

const SUB_PATH = "/cards",
  FULL_PATH = `/v1${SUB_PATH}`,
  TEST_CARD_ID = "card_sometestid",
  apiObj = rzpInstance.cards;

describe("Cards", () => {
  describe("Fetch Card Detail", () => {
    let expectedUrl = `${FULL_PATH}/${TEST_CARD_ID}`,
      methodName = "fetch",
      methodArgs = [TEST_CARD_ID],
      mockerParams = {
        url: `${SUB_PATH}/${TEST_CARD_ID}`,
      };

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedUrl,
    });
  });
});
