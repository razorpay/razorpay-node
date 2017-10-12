'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var mocker = require('../../test/mocker'),
    equal = require('deep-equal'),
    chai = require('chai'),
    assert = chai.assert,
    _require = require("../../dist/utils/razorpay-utils"),
    prettify = _require.prettify,
    getTestError = _require.getTestError;


var runCallbackCheckTest = function runCallbackCheckTest(params) {
  var apiObj = params.apiObj,
      methodName = params.methodName,
      methodArgs = params.methodArgs,
      mockerParams = params.mockerParams;


  it("Checks if the passed api callback gets called", function (done) {

    mocker.mock(mockerParams);

    apiObj[methodName].apply(apiObj, _toConsumableArray(methodArgs).concat([function (err) {
      done();
    }]));
  });

  it("Checks for error flow", function (done) {

    mocker.mock(_extends({}, mockerParams, { replyWithError: true }));

    apiObj[methodName].apply(apiObj, _toConsumableArray(methodArgs).concat([function (err) {

      assert.ok(!!err, "Error callback called with error");
      done();
    }]));
  });

  it("Checks if the api call returns a Promise", function (done) {

    mocker.mock(mockerParams);

    var retVal = apiObj[methodName].apply(apiObj, _toConsumableArray(methodArgs));

    retVal && typeof retVal.then === "function" ? done() : done(getTestError("Invalid Return Value", String("Promise"), retVal));
  });
};

var runURLCheckTest = function runURLCheckTest(params) {
  var apiObj = params.apiObj,
      methodName = params.methodName,
      methodArgs = params.methodArgs,
      expectedUrl = params.expectedUrl,
      mockerParams = params.mockerParams;


  it("Checks if the URL is formed correctly", function (done) {

    mocker.mock(mockerParams);

    apiObj[methodName].apply(apiObj, _toConsumableArray(methodArgs).concat([function (err, resp) {

      var respData = resp.__JUST_FOR_TESTS__;

      if (respData.url === expectedUrl) {

        assert.ok(true, "URL Matched");
        done();
      } else {

        done(getTestError("URL Mismatch", expectedUrl, respData.url));
      }
    }]));
  });
};

var runParamsCheckTest = function runParamsCheckTest(params) {
  var apiObj = params.apiObj,
      methodName = params.methodName,
      methodArgs = params.methodArgs,
      expectedParams = params.expectedParams,
      mockerParams = params.mockerParams,
      testTitle = params.testTitle;


  testTitle = testTitle || "Validates URL and Params";

  it(testTitle, function (done) {

    mocker.mock(mockerParams);

    apiObj[methodName].apply(apiObj, _toConsumableArray(methodArgs)).then(function (resp) {

      var respData = resp.__JUST_FOR_TESTS__,
          respParams = respData[respData.method === "GET" ? "requestQueryParams" : "requestBody"];

      if (equal(respParams, expectedParams)) {

        assert.ok(true, "Params Matched");
      } else {

        return getTestError("Params Mismatch", expectedParams, respParams);
      }
    }, function (err) {

      return new Error(prettify(err));
    }).then(function (err) {

      done(err);
    });
  });
};

var runCommonTests = function runCommonTests(params) {
  var apiObj = params.apiObj,
      methodName = params.methodName,
      methodArgs = params.methodArgs,
      expectedUrl = params.expectedUrl,
      expectedParams = params.expectedParams,
      mockerParams = params.mockerParams;


  runURLCheckTest(_extends({}, params));

  if (expectedParams) {

    runParamsCheckTest(_extends({}, params));
  }

  runCallbackCheckTest(_extends({}, params));
};

module.exports = {
  runCallbackCheckTest: runCallbackCheckTest,
  runParamsCheckTest: runParamsCheckTest,
  runURLCheckTest: runURLCheckTest,
  runCommonTests: runCommonTests
};