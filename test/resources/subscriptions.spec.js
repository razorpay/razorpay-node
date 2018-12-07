const { assert } = require('chai');
const equal = require('deep-equal');

const {
  getDateInSecs,
  normalizeDate,
  normalizeNotes
} = require('../../lib/utils/razorpay-utils');
const {
  urlCheck,
  callbackCheck,
  checkParameters,
  commonTests
}  = require('../predefined-tests.js');
const { subscriptions } = require('../razorpay');
const { checkForID } = require('../common');
const mocker = require('../mocker');
const Fixtures = require('../fixtures');

const SUB_PATH = '/subscriptions';
const FULL_PATH = `/v1${SUB_PATH}`;
const TEST_SUBSCRIPTION_ID = 'sub_sometestid';

describe('#Subscriptions', () => {

  describe('Create', () => {

    commonTests({
      apiObj: subscriptions,
      methodName: 'create',
      methodArgs: [Fixtures.common.parameters],
      expectedUrl: FULL_PATH,
      expectedParams: Fixtures.common.expectedParameters,
      mockerParams: {
       url: `${SUB_PATH}`,
       method: 'POST'
      }
    });

  });

  describe("Fetch <Single>", () => {

    const methodName = 'fetch';

    checkForID({
      apiObj: subscriptions,
      methodName,
      methodArgs: [void 0],
      mockerParams: {
        url: `${SUB_PATH}/${void 0}`
      }
    });

    commonTests({
      apiObj: subscriptions,
      methodName,
      methodArgs: [TEST_SUBSCRIPTION_ID],
      mockerParams: {
        url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}`
      },
      expectedUrl: `${FULL_PATH}/${TEST_SUBSCRIPTION_ID}`
    });

  });

  describe('Fetch <All>', () => {

    const methodName = 'all'
    const expectedUrl = FULL_PATH;
    const mockerParams = {
      url: SUB_PATH
    };

    let params = {
      'param1': 'something',
      'skip': 10,
      'count': 10
    };
    let methodArgs = [params];
    let expectedParams = Object.assign({}, params);

    checkParameters({
      apiObj: subscriptions,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: 'passes all the parameters to the API'
    });

    checkParameters({
      apiObj: subscriptions,
      methodName,
      methodArgs: [{}],
      mockerParams,
      expectedParams: { skip: 0, count: 10 },
      testTitle: 'populates "skip" and "count" variables automatically'
    });

    params = {
      from: 'Aug 25, 2016',
      to: 'Aug 30, 2016'
    };
    methodArgs = [params];
    expectedParams = {
      from: getDateInSecs(params.from),
      to: getDateInSecs(params.to),
      count: 10,
      skip: 0
    };

    checkParameters({
      apiObj: subscriptions,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: 'converts dates correctly to milliseconds'
    });

    callbackCheck({
      apiObj: subscriptions,
      methodName,
      mockerParams,
      methodArgs: [{}]
    });

  });

  describe('Cancel', () => {

    const methodName = 'cancel';
    const mockerParams = {
      url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}/cancel`,
      method: "POST"
    };

    checkForID({
      apiObj: subscriptions,
      methodName,
      methodArgs: [void 0, false],
      mockerParams: {
        url: `${SUB_PATH}/${void 0}`,
        method: 'POST'
      }
    });

    it('validates the type of the "cancelAtCycleEnd" parameter', () => {

      assert.throw(() => subscriptions.cancel(TEST_SUBSCRIPTION_ID, null), TypeError);

    });

    checkParameters({
      apiObj: subscriptions,
      methodName,
      methodArgs: [TEST_SUBSCRIPTION_ID, true],
      mockerParams,
      expectedParams: { cancel_at_cycle_end: 1 },
      testTitle: 'properly (explicitly) converts the parameters and sends it with the request'
    });

    commonTests({
      apiObj: subscriptions,
      methodName,
      methodArgs: [TEST_SUBSCRIPTION_ID, false],
      mockerParams,
      expectedUrl: `${FULL_PATH}/${TEST_SUBSCRIPTION_ID}/cancel`
    });

  });

  describe('##Addon', () => {

    describe('Create', () => {

      const methodName = 'createAddon';
      const params = {
  			item: {
  				name: 'Extra Chair',
  				amount: '30000',
  				currency: 'INR'
  			},
  			quantity: 2
  		};

      checkForID({
        apiObj: subscriptions,
        methodName,
        methodArgs: [void 0, params],
        mockerParams: {
          url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}/addons`,
          method: 'POST'
        }
      });

      urlCheck({
        apiObj: subscriptions,
        methodName,
        methodArgs: [TEST_SUBSCRIPTION_ID, params],
        expectedUrl: `${FULL_PATH}/${TEST_SUBSCRIPTION_ID}/addons`,
        mockerParams: {
          url: `${SUB_PATH}/${TEST_SUBSCRIPTION_ID}/addons`,
          method: 'POST'
        }
      });

    });

  });

});
