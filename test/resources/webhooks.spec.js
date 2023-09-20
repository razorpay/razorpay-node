"use strict";

const chai = require("chai");
const { assert } = chai;
const rzpInstance = require("../razorpay");
const mocker = require("../mocker");
const equal = require("deep-equal");
const { getDateInSecs } = require("../../dist/utils/razorpay-utils");

let mockRequest = {
  url: "https://google.com",
  alert_email: "gaurav.kumar@example.com",
  secret: "12345",
  events: [
    "payment.authorized",
    "payment.failed",
    "payment.captured",
    "payment.dispute.created",
    "refund.failed",
    "refund.created",
  ],
};

const BASE_URL = "/accounts",
  API_VERSION = "v2",
  TEST_ACCOUNT_ID = "acc_GRWKk7qQsLnDjX",
  TEST_WEBHOOK_ID = "HK890egfiItP3H";

describe("WEBHOOKS", () => {
  it("Create an webhook", (done) => {
    mocker.mock({
      version: API_VERSION,
      url: `${BASE_URL}/${TEST_ACCOUNT_ID}/webhooks`,
      method: "POST",
    });

    rzpInstance.webhooks
      .create(mockRequest, TEST_ACCOUNT_ID)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v2/accounts/${TEST_ACCOUNT_ID}/webhooks`,
          "Create webhook request url formed"
        );

        assert.ok(
          equal(response.__JUST_FOR_TESTS__.requestBody.url, mockRequest.url),
          "param are passed in request body"
        );
      });
    done();
  });

  it("Edit webhook", (done) => {
    const mockParam = {
      url: "https://www.linkedin.com",
      events: ["refund.created"],
    };

    mocker.mock({
      version: API_VERSION,
      url: `${BASE_URL}/${TEST_ACCOUNT_ID}/webhooks/${TEST_WEBHOOK_ID}`,
      method: "PATCH",
    });

    rzpInstance.webhooks
      .edit(mockParam, TEST_WEBHOOK_ID, TEST_ACCOUNT_ID)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v2/accounts/${TEST_ACCOUNT_ID}/webhooks/${TEST_WEBHOOK_ID}`,
          "Edit webhook request url formed"
        );

        assert.ok(
          equal(response.__JUST_FOR_TESTS__.requestBody.url, mockParam.url),
          "All params are passed in request body"
        );
      });
    done();
  });

  it("Webhook fetch", (done) => {
    mocker.mock({
      version: API_VERSION,
      url: `${BASE_URL}/${TEST_ACCOUNT_ID}/webhooks/${TEST_WEBHOOK_ID}`,
    });

    rzpInstance.webhooks
      .fetch(TEST_WEBHOOK_ID, TEST_ACCOUNT_ID)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v2/accounts/${TEST_ACCOUNT_ID}/webhooks/${TEST_WEBHOOK_ID}`,
          "Fetch webhooks url formed correctly"
        );
        done();
      });
  });

  // it('Fetch all webhooks', (done) => {
  //   let fromDate = 'Aug 25, 2016'
  //   let toDate = 'Aug 30, 2016'
  //   let fromDateInSecs = getDateInSecs(fromDate)
  //   let toDateInSecs = getDateInSecs(toDate)
  //   let expectedParams = {
  //     from: fromDateInSecs,
  //     to: toDateInSecs,
  //     count: 25,
  //     skip: 5
  //   }

  //   mocker.mock({
  //     version: API_VERSION,
  //     url: `${BASE_URL}/${TEST_WEBHOOK_ID}/webhooks?count=1`
  //   })

  //   rzpInstance.webhooks.all({
  //     from: fromDate,
  //     to: toDate,
  //     count: 25,
  //     skip: 5
  //   },TEST_ACCOUNT_ID).then((response) => {
  //     assert.ok(equal(
  //       response.__JUST_FOR_TESTS__.requestQueryParams,
  //       expectedParams
  //     ), 'from & to dates are converted to ms & authorized to binary')

  //     // assert.equal(
  //     //   response.__JUST_FOR_TESTS__.url,
  //     //   `/v2/orders?from=${fromDateInSecs}&to=${toDateInSecs}&count=25&skip=5&authorized=1&receipt=testreceiptid`,
  //     //   'Params are appended as part of request'
  //     // )
  //     done()
  //   })
  // })
});
