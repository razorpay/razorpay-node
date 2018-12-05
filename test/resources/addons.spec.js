const { assert } = require('chai');
const Razorpay = require('../razorpay');
const mocker = require('../mocker');

const { commonTests }  = require('../predefined-tests.js');
const { checkForID } = require('../common');

const SUB_PATH = '/addons';
const FULL_PATH = `/v1${SUB_PATH}`;
const TEST_ADDON_ID = 'addon_sometestid';
const apiObj = Razorpay.addons;

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

    commonTests({
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

    commonTests({
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
