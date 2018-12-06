const { assert } = require('chai');

const {
  getDateInSecs,
  normalizeDate,
  normalizeNotes
} = require('../../lib/utils/razorpay-utils');
const {
  callbackCheck,
  checkParameters,
  urlCheck,
  commonTests
} = require('../predefined-tests.js');

const { plans } = require('../razorpay');
const { checkForID } = require('../common');
const mocker = require('../mocker');
const Fixtures = require('../fixtures');

const SUB_PATH = '/plans';
const FULL_PATH = `/v1${SUB_PATH}`;
const TEST_PLAN_ID = 'plan_testid';

describe("#Plans", () => {

  describe('Create', () => {

    commonTests({
      apiObj: plans,
      methodName: 'create',
      methodArgs: [Fixtures.common.parameters],
      expectedUrl: FULL_PATH,
      expectedParams: Fixtures.common.expectedParameters,
      mockerParams: {
        url: SUB_PATH,
        method: "POST"
      }
    });

  });

  describe('Fetch <Single>', () => {

    const methodName = 'fetch';

    checkForID({
      apiObj: plans,
      methodName,
      methodArgs: [void 0],
      mockerParams: {
        url: `${SUB_PATH}/${void 0}`
      }
    });

    commonTests({
      apiObj: plans,
      methodName,
      methodArgs: [TEST_PLAN_ID],
      mockerParams: {
        url: `${SUB_PATH}/${TEST_PLAN_ID}`
      },
      expectedUrl: `${FULL_PATH}/${TEST_PLAN_ID}`
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
      apiObj: plans,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: 'passes all the parameters to the API'
    });

    checkParameters({
      apiObj: plans,
      methodName,
      methodArgs: [{}],
      mockerParams,
      expectedParams: {'skip': 0, 'count': 10},
      testTitle: 'Check if skip and count are automatically populated'
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
      apiObj: plans,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: 'converts dates correctly to milliseconds'
    });

    callbackCheck({
      apiObj: plans,
      methodName,
      mockerParams,
      methodArgs: [{}]
    });

  });

});
