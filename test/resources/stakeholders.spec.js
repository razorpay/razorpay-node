"use strict";

const chai = require("chai");
const { assert } = chai;
const rzpInstance = require("../razorpay");
const mocker = require("../mocker");
const equal = require("deep-equal");

let mockRequest = {
  percentage_ownership: 10,
  name: "Gaurav Kumar",
  email: "gaurav.kumar@example.com",
  relationship: {
    director: true,
    executive: false,
  },
  phone: {
    primary: "7474747474",
    secondary: "7474747474",
  },
  addresses: {
    residential: {
      street: "506, Koramangala 1st block",
      city: "Bengaluru",
      state: "Karnataka",
      postal_code: "560034",
      country: "IN",
    },
  },
  kyc: {
    pan: "AVOPB1111K",
  },
  notes: {
    random_key_by_partner: "random_value",
  },
};

const BASE_URL = "/accounts",
  API_VERSION = "v2",
  TEST_ACCOUNT_ID = "acc_GRWKk7qQsLnDjX",
  TEST_STAKEHOLDER_ID = "sth_GOQ4Eftlz62TSL";

describe("STAKEHOLDERS", () => {
  it("Create an stakeholder", (done) => {
    mocker.mock({
      version: API_VERSION,
      url: `${BASE_URL}/${TEST_ACCOUNT_ID}/stakeholders`,
      method: "POST",
    });

    rzpInstance.stakeholders
      .create(TEST_ACCOUNT_ID, mockRequest)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v2/accounts/${TEST_ACCOUNT_ID}/stakeholders`,
          "Create stakeholder request url formed"
        );

        assert.ok(
          equal(
            response.__JUST_FOR_TESTS__.requestBody.email,
            mockRequest.email
          ),
          "param are passed in request body"
        );
      });
    done();
  });

  it("Edit Stakerholder", (done) => {
    mocker.mock({
      version: API_VERSION,
      url: `/${BASE_URL}/${TEST_ACCOUNT_ID}/stakeholders/${TEST_STAKEHOLDER_ID}`,
      method: "PATCH",
    });

    rzpInstance.stakeholders
      .edit(TEST_ACCOUNT_ID, TEST_STAKEHOLDER_ID, mockRequest)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v2/accounts/${TEST_ACCOUNT_ID}/stakeholders/${TEST_STAKEHOLDER_ID}`,
          "Edit stakeholder request url formed"
        );

        assert.ok(
          equal(
            response.__JUST_FOR_TESTS__.requestBody.email,
            mockRequest.email
          ),
          "All params are passed in request body"
        );
      });
    done();
  });

  it("Stakeholder fetch", (done) => {
    mocker.mock({
      version: API_VERSION,
      url: `/${BASE_URL}/${TEST_ACCOUNT_ID}/stakeholders/${TEST_STAKEHOLDER_ID}`,
    });

    rzpInstance.stakeholders
      .fetch(TEST_ACCOUNT_ID, TEST_STAKEHOLDER_ID)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v2/accounts/${TEST_ACCOUNT_ID}/stakeholders/${TEST_STAKEHOLDER_ID}`,
          "Fetch stakeholder url formed correctly"
        );
        done();
      });
  });

  it("Get all stakeholders ", (done) => {
    mocker.mock({
      version: API_VERSION,
      url: `/${BASE_URL}/${TEST_ACCOUNT_ID}/stakeholders`,
    });

    rzpInstance.stakeholders.all(TEST_ACCOUNT_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v2/accounts/${TEST_ACCOUNT_ID}/stakeholders`,
        "Fetch all stakeholder url formed correctly"
      );
      done();
    });
  });

  it("fetch stakeholder document ", (done) => {
    mocker.mock({
      version: API_VERSION,
      url: `/${BASE_URL}/${TEST_ACCOUNT_ID}/stakeholders/${TEST_STAKEHOLDER_ID}/documents`,
    });

    rzpInstance.stakeholders
      .fetchStakeholderDoc(TEST_ACCOUNT_ID, TEST_STAKEHOLDER_ID)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v2/accounts/${TEST_ACCOUNT_ID}/stakeholders/${TEST_STAKEHOLDER_ID}/documents`,
          "Delete account url formed correctly"
        );
        done();
      });
  });
});
