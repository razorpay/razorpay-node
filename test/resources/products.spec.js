"use strict";

import { assert } from "chai";
import rzpInstance from "../razorpay.js";
import mocker from "../mocker.js";
import equal from "deep-equal";
import { describe, it } from "mocha";

const BASE_URL = "/accounts",
  API_VERSION = "v2",
  TEST_ACCOUNT_ID = "acc_GRWKk7qQsLnDjX",
  TEST_PRODUCT_ID = "acc_prd_HEgNpywUFctQ9f",
  PRODUCT_NAME = "payments";

describe("PRODUCTS", () => {
  it("Create an account", (done) => {
    const mockRequest = {
      product_name: "payment_gateway",
      tnc_accepted: true,
      ip: "233.233.233.234",
    };

    mocker.mock({
      version: API_VERSION,
      url: `${BASE_URL}/${TEST_ACCOUNT_ID}/products`,
      method: "POST",
    });

    rzpInstance.products
      .requestProductConfiguration(TEST_ACCOUNT_ID, mockRequest)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v2/accounts/${TEST_ACCOUNT_ID}/products`,
          "Request a Product Configuration url formed"
        );

        assert.ok(
          equal(
            response.__JUST_FOR_TESTS__.requestBody.product_name,
            mockRequest.product_name
          ),
          "param are passed in request body"
        );
        done();
      });
  });

  it("Update a Product Configuration", (done) => {
    const mockRequest = {
      notifications: {
        email: ["gaurav.kumar@example.com", "acd@gmail.com"],
      },
      checkout: {
        theme_color: "#528FFF",
      },
      refund: {
        default_refund_speed: "optimum",
      },
      settlements: {
        account_number: "1234567890",
        ifsc_code: "HDFC0000317",
        beneficiary_name: "Gaurav Kumar",
      },
      tnc_accepted: true,
      ip: "233.233.233.234",
    };

    mocker.mock({
      version: API_VERSION,
      url: `/${BASE_URL}/${TEST_ACCOUNT_ID}/products/${TEST_PRODUCT_ID}`,
      method: "PATCH",
    });

    rzpInstance.products
      .edit(TEST_ACCOUNT_ID, TEST_PRODUCT_ID, mockRequest)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v2/accounts/${TEST_ACCOUNT_ID}/products/${TEST_PRODUCT_ID}`,
          "update product configuration request url formed"
        );

        assert.ok(
          equal(
            response.__JUST_FOR_TESTS__.requestBody.tnc_accepted,
            mockRequest.tnc_accepted
          ),
          "All params are passed in request body"
        );
        done();
      });
  });

  it("fetch terms & condition", (done) => {
    mocker.mock({
      version: API_VERSION,
      url: `/products/${PRODUCT_NAME}/tnc`,
    });

    rzpInstance.products.fetchTnc(PRODUCT_NAME).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v2/products/${PRODUCT_NAME}/tnc`,
        "Fetch account url formed correctly"
      );
      done();
    });
  });
});
