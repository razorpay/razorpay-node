/**
 * TODO: These tests do not test EVERY possible outcome and hence this suite is
 * not adequate; however, since does the job, the problem can be tackled in a later
 * RC.
 */

const { assert } = require('chai');
const equal = require('deep-equal');

const Fixtures = require('../fixtures');
const { checkForID } = require('../common');
const { invoices } = require('../razorpay');
const mocker = require('../mocker');
const { getDateInSecs, normalizeDate, normalizeNotes } = require('../../lib/utils/razorpay-utils');
const {
  callbackCheck,
  checkParameters,
  urlCheck,
  commonTests
} = require('../predefined-tests.js');

const SUB_PATH  = '/invoices';
const FULL_PATH = `/v1${SUB_PATH}`;
const TEST_INVOICE_ID = 'inv_8l7Qvjbguwm3Dq';

describe('#Invoices', () => {

  describe('Assign Invoice', () => {

    commonTests({
      apiObj: invoices,
      methodName: 'create', // ambiguous with create
      methodArgs: [Fixtures.common.parameters],
      expectedUrl: FULL_PATH,
      expectedParams: Fixtures.common.expectedParameters,
      mockerParams: {
       url: `${SUB_PATH}`,
       method: 'POST'
      }
    });

  });

  describe('Edit Invoice', () => {

    const methodName = 'edit';

    checkForID({
      apiObj: invoices,
      methodName,
      methodArgs: [void 0],
      mockerParams: {
        url: `${SUB_PATH}/${void 0}`,
        method: 'PATCH'
      }
    });

    commonTests({
      apiObj: invoices,
      methodName,
      methodArgs: [TEST_INVOICE_ID, Fixtures.common.parameters],
      expectedUrl: `${FULL_PATH}/${TEST_INVOICE_ID}`,
      expectedParams: Fixtures.common.expectedParameters,
      mockerParams: {
        url: `${SUB_PATH}/${TEST_INVOICE_ID}`,
        method: 'PATCH'
      }
    });

  });

  describe('Create Invoice', () => {

    const methodName = 'issue';

    checkForID({
      apiObj: invoices,
      methodName,
      methodArgs: [void 0],
      mockerParams: {
        url: `${SUB_PATH}/${void 0}/issue`,
        method: 'POST'
      }
    });

    commonTests({
      apiObj: invoices,
      methodName,
      methodArgs: [TEST_INVOICE_ID],
      mockerParams: {
        url: `${SUB_PATH}/${TEST_INVOICE_ID}/issue`,
        method: 'POST'
      },
      expectedUrl: `${FULL_PATH}/${TEST_INVOICE_ID}/issue`
    });

  });

  describe('Delete Invoice', () => {

    const methodName  = 'delete';

    checkForID({
      apiObj: invoices,
      methodName,
      methodArgs: [void 0],
      mockerParams: {
        url: `${SUB_PATH}/${void 0}`,
        method: 'DELETE'
      }
    });

    commonTests({
      apiObj: invoices,
      methodName,
      methodArgs: [TEST_INVOICE_ID],
      mockerParams: {
        url: `${SUB_PATH}/${TEST_INVOICE_ID}`,
        method: 'DELETE'
      },
      expectedUrl: `${FULL_PATH}/${TEST_INVOICE_ID}`
    });

  });

  describe('Cancel Invoice', () => {

    const methodName = 'cancel';

    checkForID({
      apiObj: invoices,
      methodName,
      methodArgs: [void 0],
      mockerParams: {
        url: `${SUB_PATH}/${void 0}/cancel`,
        method: 'POST'
      }
    });

    commonTests({
      apiObj: invoices,
      methodName,
      methodArgs: [TEST_INVOICE_ID],
      mockerParams: {
        url: `${SUB_PATH}/${TEST_INVOICE_ID}/cancel`,
        method: 'POST'
      },
      expectedUrl: `${FULL_PATH}/${TEST_INVOICE_ID}/cancel`
    });

  });

  describe('Fetch Invoice', () => {

    const methodName = 'fetch';

    checkForID({
      apiObj: invoices,
      methodName,
      methodArgs: [void 0],
      mockerParams: {
        url: `${SUB_PATH}/${void 0}`
      }
    });

    commonTests({
      apiObj: invoices,
      methodName,
      methodArgs: [TEST_INVOICE_ID],
      mockerParams: {
        url: `${SUB_PATH}/${TEST_INVOICE_ID}`
      },
      expectedUrl: `${FULL_PATH}/${TEST_INVOICE_ID}`
    });

  });

  describe('Fetch Multiple Invoices', () => {

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
      apiObj: invoices,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: 'passes all the parameters to the API'
    });

    checkParameters({
      apiObj: invoices,
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
      apiObj: invoices,
      methodName,
      methodArgs,
      mockerParams,
      expectedParams,
      testTitle: 'converts dates correctly to milliseconds'
    });

    callbackCheck({
      apiObj: invoices,
      methodName,
      mockerParams,
      methodArgs: [{}]
    });

  });

  describe('Notify <Email>', () => {

    const medium = 'email';
    const methodName = 'notifyBy';

    checkForID({
      apiObj: invoices,
      methodName,
      methodArgs: [undefined, medium],
      mockerParams: {
        'url': `${SUB_PATH}/${undefined}/notify_by/${medium}`,
        'method': 'POST'
      }
    });

    it ('checks for a valid medium with with the user is to be notified', async () => {

      mocker.mock({
        url: `${SUB_PATH}/${TEST_INVOICE_ID}/notify_by/${void 0}`,
        method: 'POST'
      });

      try {
        await apiObj[methodName](TEST_INVOICE_ID, void 0);
        assert.fail('The "notify" method did not check for a valid medium of transport.');
      } catch (error) {}

    });

    commonTests({
      apiObj: invoices,
      methodName,
      methodArgs: [TEST_INVOICE_ID, medium],
      mockerParams: {
        'url': `${SUB_PATH}/${TEST_INVOICE_ID}/notify_by/${medium}`,
        'method': 'POST'
      },
      expectedUrl: `${FULL_PATH}/${TEST_INVOICE_ID}/notify_by/${medium}`,
    });

  });

});
