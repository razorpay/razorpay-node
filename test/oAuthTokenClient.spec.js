"use strict";

const mocker = require("./mocker");
const OAuthTokenClient = require("../dist/oAuthTokenClient");
const { assert } = require("chai");

describe("OAuth", () => {
  let rzpHost;
  let rzpVersion;
  const oAuth = new OAuthTokenClient();

  beforeEach(() => {
    rzpHost = mocker.host;
    rzpVersion = mocker.version;
    mocker.host = "https://auth.razorpay.com";
    mocker.version = "";
  });

  afterEach(() => {
    mocker.host = rzpHost;
    mocker.version = rzpVersion;
  });

  it("get access token", (done) => {
    let params = {
      client_id: "XXXXXXXXXXkQ5C",
      client_secret: "XXXXXXXXXXXXXXXXXXHx7rXX",
      grant_type: "authorization_code",
      redirect_uri: "http://example.com/razorpay_callback",
      code: "def50200d844dc80cc44dce2c665d07a374d76802",
      mode: "test",
    };

    mocker.mock({
      url: `/token`,
      method: "POST",
      requestBody: params,
    });

    oAuth
      .getAccessToken(params)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.capturedUrl,
          `${mocker.host}/token`,
          "Fetch stakeholder url formed correctly"
        );
        done();
      })
      .catch((err) => console.log(err));
  });

  it("refresh access token", (done) => {
    let params = {
      client_id: "XXXXXXXXXXkQ5C",
      client_secret: "XXXXXXXXXXXXXXXXXXHx7rXX",
      grant_type: "refresh_token",
      refresh_token: "def5020096e1c470c901d34cd60fa53abdaf3662sa0",
    };

    mocker.mock({
      url: `/token`,
      method: "POST",
      requestBody: params,
    });

    oAuth
      .refreshToken(params)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.capturedUrl,
          `${mocker.host}/token`,
          "Fetch stakeholder url formed correctly"
        );
        done();
      })
      .catch((err) => console.log(err));
  });

  it("revoke access token", (done) => {
    let params = {
      client_id: "XXXXXXXXXXkQ5C",
      client_secret: "XXXXXXXXXXXXXXXXXXHx7rXX",
      grant_type: "refresh_token",
      refresh_token: "def5020096e1c470c901d34cd60fa53abdaf3662sa0",
    };

    mocker.mock({
      url: `/token`,
      method: "PATCH",
      requestBody: params,
    });

    oAuth
      .revokeToken(params)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.capturedUrl,
          `${mocker.host}/token`,
          "Fetch stakeholder url formed correctly"
        );
        done();
      })
      .catch((err) => console.log(err));
  });
});
