'use strict';

const mocker = require('../../test/mocker'),
      equal = require('deep-equal'),
      chai = require('chai'),
      { assert } = chai,
      { prettify,
       getTestError} = require("../../dist/utils/razorpay-utils");

const runCallbackCheckTest = (params) => {

  let {
    apiObj,
    methodName,
    methodArgs,
    mockerParams
  } = params;

  it ("Checks if the passed api callback gets called", (done) => {

    mocker.mock(mockerParams);

    apiObj[methodName](...methodArgs, (err) => {
      done();
    });
  });

  it ("Checks for error flow", (done) => {

    mocker.mock({...mockerParams, replyWithError: true});

    apiObj[methodName](...methodArgs, (err) => {
    
     assert.ok(!!err, "Error callback called with error");
     done();
    });
  });

  it ("Checks if the api call returns a Promise", (done) => {
  
    mocker.mock(mockerParams);

    const retVal = apiObj[methodName](...methodArgs);

    retVal && typeof retVal.then === "function"
      ? done()
      : done(getTestError("Invalid Return Value", String("Promise"), retVal))
  });
}

const runURLCheckTest = (params) => {

  let {
    apiObj,
    methodName,
    methodArgs,
    expectedUrl,
    mockerParams
  } = params;

  it ("Checks if the URL is formed correctly", (done) => {

    mocker.mock(mockerParams);

    apiObj[methodName](...methodArgs, (err, resp) => {

      const respData = resp.__JUST_FOR_TESTS__;

      if (respData.url === expectedUrl) {

        assert.ok(true, "URL Matched");
        done();
      } else {

        done(getTestError(
          "URL Mismatch",
          expectedUrl,
          respData.url       
        ));
      }
    });
  });
}

const runParamsCheckTest = (params) => {

  let {
    apiObj,
    methodName,
    methodArgs,
    expectedParams,
    mockerParams,
    testTitle
  } = params;

  testTitle = testTitle || "Validates URL and Params";

  it (testTitle, (done) => {
  
    mocker.mock(mockerParams);

    apiObj[methodName](...methodArgs).then((resp) => {

      const respData = resp.__JUST_FOR_TESTS__,
            respParams = respData[respData.method === "GET"
                                    ? "requestQueryParams"
                                    : "requestBody"];

        if (equal(respParams, expectedParams)) {

          assert.ok(true, "Params Matched");
        } else {

          return getTestError(
            "Params Mismatch",
            expectedParams,
            respParams
          );
        }
    }, (err) => {
    
      return new Error(prettify(err));
    }).then((err) => {
    
      done(err); 
    });
  });
}

const runCommonTests = (params) => {

  let {
    apiObj,
    methodName,
    methodArgs,
    expectedUrl,
    expectedParams,
    mockerParams
  } = params;

  runURLCheckTest({
    ...params
  });

  if (expectedParams) {

    runParamsCheckTest({
      ...params
    });
  }

  runCallbackCheckTest({
   ...params       
  });
}

module.exports = {
  runCallbackCheckTest,
  runParamsCheckTest,
  runURLCheckTest,
  runCommonTests
};
