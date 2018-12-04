const { assert } = require('chai');
const Razorpay = require('../razorpay');
const mocker = require('../mocker');

const { runCommonTests }  = require('../predefined-tests.js');

const SUB_PATH = '/addons';
const FULL_PATH = `/v1${SUB_PATH}`;
const TEST_ADDON_ID = 'addon_sometestid';
const apiObj = Razorpay.addons;

const checkForID = params => {

  let { apiObj, methodName, methodArgs, mockerParams } = params;

  mocker.mock(mockerParams);

  it (`throws an error when no ID parameter is provided (${methodName})`, async () => {

    try {
      await apiObj[methodName](...methodArgs);
      throw new Error(
        `API method '${methodName}' did not throw an error on undefined variable value`
      );
    } catch (error) {
      assert.ok(error);
    }

  });

}

describe('#Addons', () => {

  describe('Fetch', () => {

    const expectedUrl = `${FULL_PATH}/${TEST_ADDON_ID}`;
    const methodName = 'fetch';

    checkForID({
      apiObj,
      methodName,
      methodArgs: [void 0],
      mockerParams: {
        url: `${SUB_PATH}/${void 0}`
      }
    });

    runCommonTests({
      apiObj,
      methodName,
      methodArgs: [TEST_ADDON_ID],
      mockerParams: {
        url: `${SUB_PATH}/${TEST_ADDON_ID}`
      },
      expectedUrl
    });

  });

  describe('Delete', () => {

    const expectedUrl = `${FULL_PATH}/${TEST_ADDON_ID}`;
    const methodName = 'delete';

    checkForID({
      apiObj,
      methodName,
      methodArgs: [void 0],
      mockerParams: {
        url: `${SUB_PATH}/${void 0}`,
        method: 'DELETE'
      }
    });

    runCommonTests({
      apiObj,
      methodName,
      methodArgs: [TEST_ADDON_ID],
      mockerParams: {
        url: `${SUB_PATH}/${TEST_ADDON_ID}`,
        method: 'DELETE'
      },
      expectedUrl
    });

  });

});
