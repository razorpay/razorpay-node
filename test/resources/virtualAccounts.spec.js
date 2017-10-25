'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')
const { getDateInSecs,
        normalizeDate,
        normalizeNotes
      } = require('../../dist/utils/razorpay-utils')
const { runCommonTests }  = require("../../dist/utils/predefined-tests.js");


const SUB_PATH  = "/virtual_accounts",
      FULL_PATH = `/v1${SUB_PATH}`,
      TEST_VIRTUAL_ACCOUNT = "12345566",
      apiObj = rzpInstance.virtualAccounts;

const runIDRequiredTest = (params) => {

  let {apiObj, methodName, methodArgs, mockerParams} = params;

  mocker.mock(mockerParams);

  it (`method ${methodName} checks for Virtual Account ID as param`,
      (done) => {

    apiObj[methodName](...methodArgs).then(() => {

      done(new Error(`method ${methodName} does not`+
                     ` check for Virtual Account ID`));
    },(err) => {

      done();
    });
  });
}

describe("VIRTUAL_ACCOUNTS", () => {

  describe('Fetch Virtual Accounts', () => {
  
    it('Default params', (done) => {
    
      let expectedParams = {
        skip : 0,
        count: 10
      };

      mocker.mock({
        url: `${SUB_PATH}`
      });

      rzpInstance.virtualAccounts.all().then((response) => {
      
        assert.ok(equal(
          response.__JUST_FOR_TESTS__.requestQueryParams,
          expectedParams),
          "skip & count are passed as default transfers queryparams"
        );

        done();
      });
    });

    it('`From` & `To` are converted to ms', (done) => {

      let fromDate       = 'Aug 25, 2016',
          toDate         = 'Aug 30, 2016',
          fromDateInSecs = getDateInSecs(fromDate),
          toDateInSecs   = getDateInSecs(toDate),
          expectedParams = {
            from : fromDateInSecs,
            to   : toDateInSecs,
            count: 25,
            skip : 5
          };

      mocker.mock({
        url: `${SUB_PATH}`
      });

      rzpInstance.virtualAccounts.all({
        from : fromDate,
        to   : toDate,
        count: 25,
        skip : 5
      }).then((response) => {
      
        assert.ok(equal(
          response.__JUST_FOR_TESTS__.requestQueryParams,
          expectedParams),
          'from & to dates are converted to ms'
        )

        assert.equal( 
          response.__JUST_FOR_TESTS__.url,
          `${FULL_PATH}?from=${fromDateInSecs}&to=${toDateInSecs}&count=25&skip=5`,
          'Params are appended as part of request'
        )

        done();
      });
    });
  });

  describe('Fetch Virtual Account', () => {
 
    it ('Validation', (done) => {

      mocker.mock({
        url: `${SUB_PATH}/${undefined}`
      });

      rzpInstance.virtualAccounts.fetch().then(() => {
     
        done(new Error("`rzpInstance.virtualAccounts.fetch` doesn't"+
                       " check for account id"));
      }).catch((err) => {
     
        done();
      });
    });

    it ("Url Check", (done) => {
    
      mocker.mock({
        url: `${SUB_PATH}/${TEST_VIRTUAL_ACCOUNT}`
      });

      rzpInstance.virtualAccounts.fetch(TEST_VIRTUAL_ACCOUNT).then((response) => {
      
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `${FULL_PATH}/${TEST_VIRTUAL_ACCOUNT}`,
          "Fetch Virtual Account URL Match"
        );

        done();
      });
    });
  });

  it ("Create Virtual Account", (done) => {
  
    const params = {
    
      notes : {"comment": "My notes"},
      param1: "param1",
      param2: "param2"
    }, {notes, ...rest} = params;

    mocker.mock({
      url   : `${SUB_PATH}`,
      method: "POST"
    });

    rzpInstance.virtualAccounts.create(params).then((response) => {
 
      assert.ok(equal(
        response.__JUST_FOR_TESTS__.requestBody,
        Object.assign(rest, normalizeNotes(notes))),
        "Params matched, and notes normalized"
      );

      done();
    });
  });

  describe("Virtual Accounts close", () => {
  
    it("Validation", (done) => {

      mocker.mock({
        url: `${SUB_PATH}/${undefined}`
      });

      rzpInstance.virtualAccounts.close().then(() => {
    
        done(new Error("virtualAccounts.close doesn't check for account id"));  
      }).catch(() => {
      
        done();
      });
    });

    it("Url Match", (done) => {
    
      mocker.mock({
        url: `${SUB_PATH}/${TEST_VIRTUAL_ACCOUNT}`,
        method: "PATCH"
      });

      rzpInstance.virtualAccounts.close(TEST_VIRTUAL_ACCOUNT).then((response) => {
     
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `${FULL_PATH}/${TEST_VIRTUAL_ACCOUNT}`,
          "Url is formed correctly"       
        );

        done();
      });
    });
  });

  describe("Virtual Accounts get Payments", () => {
  
    let expectedUrl  = `${FULL_PATH}/${TEST_VIRTUAL_ACCOUNT}/payments`,
        methodName   = "fetchPayments",
        methodArgs   = [TEST_VIRTUAL_ACCOUNT],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_VIRTUAL_ACCOUNT}/payments`
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}/payments`
      }
    });

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedUrl
    });
  });
});
