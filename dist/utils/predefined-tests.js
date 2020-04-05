'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocker = require('../../test/mocker'), equal = require('deep-equal'), chai = require('chai'), assert = chai.assert, _a = require("../../dist/utils/razorpay-utils"), prettify = _a.prettify, getTestError = _a.getTestError;
exports.runCallbackCheckTest = function (params) {
    var apiObj = params.apiObj, methodName = params.methodName, methodArgs = params.methodArgs, mockerParams = params.mockerParams;
    it("Checks if the passed api callback gets called", function (done) {
        mocker.mock(mockerParams);
        apiObj[methodName].apply(apiObj, __spreadArrays(methodArgs, [function (err) {
                done();
            }]));
    });
    it("Checks for error flow", function (done) {
        mocker.mock(__assign(__assign({}, mockerParams), { replyWithError: true }));
        apiObj[methodName].apply(apiObj, __spreadArrays(methodArgs, [function (err) {
                assert.ok(!!err, "Error callback called with error");
                done();
            }]));
    });
    it("Checks if the api call returns a Promise", function (done) {
        mocker.mock(mockerParams);
        var retVal = apiObj[methodName].apply(apiObj, methodArgs);
        retVal && typeof retVal.then === "function"
            ? done()
            : done(getTestError("Invalid Return Value", String("Promise"), retVal));
    });
};
exports.runURLCheckTest = function (params) {
    var apiObj = params.apiObj, methodName = params.methodName, methodArgs = params.methodArgs, expectedUrl = params.expectedUrl, mockerParams = params.mockerParams;
    it("Checks if the URL is formed correctly", function (done) {
        mocker.mock(mockerParams);
        apiObj[methodName].apply(apiObj, __spreadArrays(methodArgs, [function (err, resp) {
                var respData = resp.__JUST_FOR_TESTS__;
                if (respData.url === expectedUrl) {
                    assert.ok(true, "URL Matched");
                    done();
                }
                else {
                    done(getTestError("URL Mismatch", expectedUrl, respData.url));
                }
            }]));
    });
};
exports.runParamsCheckTest = function (params) {
    var apiObj = params.apiObj, methodName = params.methodName, methodArgs = params.methodArgs, expectedParams = params.expectedParams, mockerParams = params.mockerParams, testTitle = params.testTitle;
    testTitle = testTitle || "Validates URL and Params";
    it(testTitle, function (done) {
        mocker.mock(mockerParams);
        apiObj[methodName].apply(apiObj, methodArgs).then(function (resp) {
            var respData = resp.__JUST_FOR_TESTS__, respParams = respData[respData.method === "GET"
                ? "requestQueryParams"
                : "requestBody"];
            if (equal(respParams, expectedParams)) {
                assert.ok(true, "Params Matched");
            }
            else {
                return getTestError("Params Mismatch", expectedParams, respParams);
            }
        }, function (err) {
            return new Error(prettify(err));
        }).then(function (err) {
            done(err);
        });
    });
};
exports.runCommonTests = function (params) {
    var apiObj = params.apiObj, methodName = params.methodName, methodArgs = params.methodArgs, expectedUrl = params.expectedUrl, expectedParams = params.expectedParams, mockerParams = params.mockerParams;
    exports.runURLCheckTest(__assign({}, params));
    if (expectedParams) {
        exports.runParamsCheckTest(__assign({}, params));
    }
    exports.runCallbackCheckTest(__assign({}, params));
};
