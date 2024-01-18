"use strict";

import { assert } from "chai";
import rzpInstance from "../razorpay.js";
import mocker from "../mocker.js";
import { describe, it } from "mocha";

describe("FUND ACCOUNTS", () => {
  it("Create Fund", (done) => {
    let params = {
      customer_id: "cust_Aa000000000001",
      account_type: "bank_account",
      bank_account: {
        name: "Gaurav Kumar",
        account_number: "11214311215411",
        ifsc: "HDFC0000053",
      },
    };

    mocker.mock({
      url: "/fund_accounts",
      method: "POST",
    });

    rzpInstance.fundAccount.create(params).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        "/v1/fund_accounts",
        "Create fund account request url formed"
      );
      done();
    });
  });

  it("Fetch all fund ", (done) => {
    let customer_id = "cust_Aa000000000001";

    mocker.mock({
      url: `/fund_accounts`,
      method: "GET",
    });

    rzpInstance.fundAccount.fetch(customer_id).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/fund_accounts?customer_id=${customer_id}`,
        "Fetch all fund accounts"
      );
      done();
    });
  });
});
