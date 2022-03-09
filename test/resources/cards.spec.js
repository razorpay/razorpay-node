'use strict';

const Promise = require('promise')
const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay');
const mocker = require('../mocker');

const SUB_PATH = "/cards",
      FULL_PATH = `/v1${SUB_PATH}`,
      TEST_CARD_ID = "card_sometestid",
      apiObj = rzpInstance.cards;

const { runCommonTests }  = require("../../dist/utils/predefined-tests.js");

describe("Cards", () => {

    describe("Fetch Card Detail", () => {
  
        let expectedUrl = `${FULL_PATH}/${TEST_CARD_ID}`,
            methodName = "fetch",
            methodArgs = [TEST_CARD_ID],
            mockerParams = {
              url: `${SUB_PATH}/${TEST_CARD_ID}`
            };
        
        runCommonTests({
          apiObj,
          methodName,
          methodArgs,
          mockerParams,
          expectedUrl
        });

    })    
    
});
