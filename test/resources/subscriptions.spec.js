'use strict';

const Promise = require('promise')
const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay');
const mocker = require('../mocker')
const equal = require('deep-equal')
const { getDateInSecs,
        normalizeDate,
        normalizeNotes
      } = require('../../dist/utils/razorpay-utils');
const { runCallbackCheckTest,
        runParamsCheckTest,
        runURLCheckTest,
        runCommonTests }  = require("../../dist/utils/predefined-tests.js");

const SUB_PATH = "/subscriptions",
      FULL_PATH = `/v1${SUB_PATH}`,
      TEST_SUBSCRIPTION_ID = "sub_sometestid",
      TEST_OFFER_ID = "offer_sometestid",
      apiObj = rzpInstance.subscriptions; 

const runIDRequiredTest = (params) => {
  
  let {apiObj, methodName, methodArgs, mockerParams} = params;

  mocker.mock(mockerParams);
  
  it (`method ${methodName} checks for Subscription ID as param`,
      (done) => {

    apiObj[methodName](...methodArgs).then(() => {
 
      done(new Error(`method ${methodName} does not`+
                     ` check for Subscription ID`));
    },(err) => {
      done();
    });
  });
}

describe("SUBSCRIPTIONS", () => {

  describe("Create Subscription", () => {
  
    let expectedUrl = `${FULL_PATH}`,
        params = {
          param1: "something",
          param2: "something else",
          notes: {"something": "something else"}
        },
        expectedParams = {
          param1: params.param1,
          param2: params.param2,
          notes: {"something": "something else"}
        },
        methodArgs = [params],
        methodName = "create",
        mockerParams = {
         url: `${SUB_PATH}`,
         method: "POST"
        };
    
    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      expectedUrl,
      expectedParams,
      mockerParams
    });
  });
  
  describe("Update Subscription", () => {
  
    let expectedUrl = `${FULL_PATH}/${TEST_SUBSCRIPTION_ID}`,
        methodName = "update",
        params = {
          "plan_id":"plan_00000000000002",
          "quantity": 1,
          "remaining_count": 5,
          "schedule_change_at": "now"
        },
        expectedParams = {
          ...params
        },
        methodArgs = [TEST_SUBSCRIPTION_ID, params],
        mockerParams = {
         url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}`,
         method: "PATCH"
        };


      runIDRequiredTest({
        apiObj,
        methodName,
        methodArgs: [undefined],
        mockerParams: {
          url: `${SUB_PATH}/${undefined}`,
          method: "PATCH"
        }
      });
      

      runParamsCheckTest({
        apiObj,
        methodName,
        methodArgs: [TEST_SUBSCRIPTION_ID, params],
        mockerParams,
        expectedParams,
        testTitle: "Check params is being sent or not"
      });
      
  
      runCommonTests({
        apiObj,
        methodName,
        methodArgs,
        expectedUrl,
        mockerParams
      });
  });
  
  describe('Delete Offer', () => {
  
    let expectedUrl = `${FULL_PATH}/${TEST_SUBSCRIPTION_ID}/${TEST_OFFER_ID}`,
          methodName  = "deleteOffer",
          methodArgs  = [TEST_SUBSCRIPTION_ID, TEST_OFFER_ID],
          mockerParams = {
            url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}/${TEST_OFFER_ID}`,
            method: "DELETE"
          }; 

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined, undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}/${undefined}`,
        method: "DELETE"
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

  describe("Fetch Subscription", () => {
  
    let expectedUrl = `${FULL_PATH}/${TEST_SUBSCRIPTION_ID}`,
        methodName = "fetch",
        methodArgs = [TEST_SUBSCRIPTION_ID],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}`
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}`
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

  describe("Fetch All Subscriptions", () => {
 
    let methodName = "all",
       params = {
         "param1": "something",
         "skip": 10,
         "count": 10
       },
       methodArgs = [params],
       expectedParams = {
         ...params
       },
       expectedUrl = FULL_PATH,
       mockerParams = {
         url: SUB_PATH
       };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: "Check if all params passed are being sent"
    });

    params = {};
    methodArgs = [params];
    expectedParams = {"skip": 0, "count": 10};

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: "Check if skip and count are automatically populated"
    });

    params = {"from": 'Aug 25, 2016', "to": 'Aug 30, 2016'};
    methodArgs = [params];
    expectedParams = {"from": getDateInSecs(params.from),
                      "to": getDateInSecs(params.to),
                      "count": "10",
                      "skip": "0"};

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: "Check if dates are converted to ms"
    });

    methodArgs = [{}];

    runCallbackCheckTest({
      apiObj,
      methodName,
      mockerParams,
      methodArgs
    });
  });

  describe("Fetch Pending Updates", () => {
  
    let expectedUrl = `${FULL_PATH}/${TEST_SUBSCRIPTION_ID}/retrieve_scheduled_changes`,
        methodName = "pendingUpdate",
        methodArgs = [TEST_SUBSCRIPTION_ID],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}/retrieve_scheduled_changes`
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}/retrieve_scheduled_changes`
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
  
  describe("Cancel Update", () => {
  
    let expectedUrl = `${FULL_PATH}/${TEST_SUBSCRIPTION_ID}/cancel_scheduled_changes`,
        methodName = "cancelScheduledChanges",
        methodArgs = [TEST_SUBSCRIPTION_ID],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}/cancel_scheduled_changes`,
          method : 'POST'
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}/cancel_scheduled_changes`,
        method : 'POST'
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
  describe("Pause Subscription", () => {
  
    let expectedUrl = `${FULL_PATH}/${TEST_SUBSCRIPTION_ID}/pause`,
        methodName = "pause",
        params = { 
          "pause_at": "now"
        },
        methodArgs = [TEST_SUBSCRIPTION_ID, params],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}/pause`,
          method : 'POST'
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}/pause`,
        method : 'POST'
      }
    });

    let expectedParams = {pause_at: 'now'};

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs: [TEST_SUBSCRIPTION_ID, params],
      mockerParams,
      expectedParams,
      testTitle: "Check if pause at is being sent or not"
    });

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedUrl
    });
  });
  describe("Resume Subscription", () => {
  
    let expectedUrl = `${FULL_PATH}/${TEST_SUBSCRIPTION_ID}/resume`,
        methodName = "resume",
        params = { 
          "resume_at": "now"
        },
        methodArgs = [TEST_SUBSCRIPTION_ID, params],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}/resume`,
          method : 'POST'
        };
            
    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}/resume`,
        method : 'POST'
      }
    });

    let expectedParams = {resume_at: 'now'};

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs: [TEST_SUBSCRIPTION_ID, params],
      mockerParams,
      expectedParams,
      testTitle: "Check if resume at is being sent or not"
    });

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedUrl
    });
  });
  describe("Cancel Subscription", () => {
  
    let expectedUrl = `${FULL_PATH}/${TEST_SUBSCRIPTION_ID}/cancel`,
        methodName = "cancel",
        methodArgs = [TEST_SUBSCRIPTION_ID, false],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}/cancel`,
          method: "POST"
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined, false],
      mockerParams: {
        url: `${SUB_PATH}/${undefined}`,
        method: "POST"
      }
    });

    it("Checks for type of arguments", (done) => {
    
      apiObj.cancel(TEST_SUBSCRIPTION_ID, null).then(() => {

        done(new Error("Datatype is not checked for the arguments"));
      }, () => {

        done();
      });
    });

    let expectedParams = {cancel_at_cycle_end: 1};

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs: [TEST_SUBSCRIPTION_ID, true],
      mockerParams,
      expectedParams,
      testTitle: "Check if cancel at end of cycle is being sent or not"
    });

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      mockerParams,
      expectedUrl
    });
  });

  describe("Create Addon", () => {
  
    let expectedUrl = `${FULL_PATH}/${TEST_SUBSCRIPTION_ID}/addons`,
        methodName = "createAddon",
        params = { 
			"item": {
				"name": "Extra Chair",
				"amount": "30000",
				"currency": "INR"
			},
			"quantity": "2"
		},
        expectedParams = {...params},
        methodArgs = [TEST_SUBSCRIPTION_ID, params],
        mockerParams = {
          url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}/addons`,
          method: "POST"
        };

    runIDRequiredTest({
      apiObj,
      methodName,
      methodArgs: [undefined, params],
      mockerParams: {
        url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}/addons`,
        method: "POST"
      }
    });

    runURLCheckTest({
      apiObj,
      methodName,
      methodArgs,
      expectedUrl,
      mockerParams
    });
  });

  describe("Create Registration Link", () => {
  
    let expectedUrl = `/v1/subscription_registration/auth_links`,
        params = {
          param1: "something",
          param2: "something else",
          notes: {"something": "something else"}
        },
        expectedParams = {
          param1: params.param1,
          param2: params.param2,
          notes: {"something": "something else"}
        },
        methodArgs = [params],
        methodName = "createRegistrationLink",
        mockerParams = {
         url: `/subscription_registration/auth_links`,
         method: "POST"
        };

    runParamsCheckTest({
      apiObj,
      methodName,
      methodArgs: [params],
      mockerParams,
      expectedParams,
      testTitle: "Check if params is being sent or not"
    })

    runCommonTests({
      apiObj,
      methodName,
      methodArgs,
      expectedUrl,
      expectedParams,
      mockerParams
    });
  });
});
