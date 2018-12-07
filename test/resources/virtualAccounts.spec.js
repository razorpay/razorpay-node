const { assert } = require('chai');

const {
  getDateInSecs,
  normalizeDate,
  normalizeNotes
} = require('../../lib/utils/razorpay-utils');

const { commonTests }  = require('../predefined-tests.js');
const { checkForID } = require('../common');
const { virtualAccounts } = require('../razorpay');
const mocker = require('../mocker');
const Fixtures = require('../fixtures');

const SUB_PATH  = '/virtual_accounts';
const FULL_PATH = `/v1${SUB_PATH}`;
const TEST_VIRTUAL_ACCOUNT = '12345566';

describe("#Virtual Accounts", () => {

  describe('Fetch <All>', () => {

    it('passes the default parameters correctly in the request', async () => {

      mocker.mock({
        url: '/virtual_accounts'
      });

      try {

        const response = await virtualAccounts.all();

        assert.deepEqual(
          response['__MOCKED_RESPONSE_DATA__'].requestQueryParams,
          {
            skip: 0,
            count: 10
          }
        );

      } catch (error) {
        throw error;
      }

    });

    it('converts "to" and "from" parameters to milliseconds', async () => {

      const from = 'Aug 25, 2016';
      const to = 'Aug 30, 2016';
      const fromDateInSecs = getDateInSecs(from);
      const toDateInSecs = getDateInSecs(to);
      const expectedParams = {
        from: fromDateInSecs,
        to: toDateInSecs,
        count: 25,
        skip: 5
      };

      mocker.mock({
        url: '/virtual_accounts'
      })

      try {

        const response = await virtualAccounts.all(Object.assign({}, expectedParams, {
          to,
          from
        }));

        const responseData = response['__MOCKED_RESPONSE_DATA__'];

        assert.deepEqual(
          responseData.requestQueryParams,
          expectedParams
        );

        assert.equal(
          responseData.url,
          `/v1/virtual_accounts?from=${fromDateInSecs}&to=${toDateInSecs}&count=25&skip=5`,
        );

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Fetch <Single>', () => {

    it('throws an error when virtualAccountId is not provided', () => {

      assert.throw(virtualAccounts.fetch, TypeError);

    });

    it('forms the correct GET request to fetch a specific virtual account', async () => {

      mocker.mock({
        url: `${SUB_PATH}/${TEST_VIRTUAL_ACCOUNT}`
      });

      try {

        const response = await virtualAccounts.fetch(TEST_VIRTUAL_ACCOUNT);

        assert.equal(
          response['__MOCKED_RESPONSE_DATA__'].url,
          `${FULL_PATH}/${TEST_VIRTUAL_ACCOUNT}`,
        );

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Create', () => {

    it('forms a proper POST request to create a new virtual account', async () => {

      mocker.mock({
        url: `${SUB_PATH}`,
        method: 'POST'
      });

      try {

        const response = await virtualAccounts.create(Fixtures.common.parameters);

        assert.deepEqual(
          response['__MOCKED_RESPONSE_DATA__'].requestBody,
          Fixtures.common.expectedParameters
        );

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Close', () => {

    it('throws an error when virtualAccountId is not provided', () => {

      assert.throw(virtualAccounts.close, TypeError);

    });

    it('forms the correct GET request to fetch a specific virtual account', async () => {

      mocker.mock({
        url: `${SUB_PATH}/${TEST_VIRTUAL_ACCOUNT}`,
        method: 'PATCH'
      });

      try {

        const response = await virtualAccounts.close(TEST_VIRTUAL_ACCOUNT);

        assert.equal(
          response['__MOCKED_RESPONSE_DATA__'].url,
          `${FULL_PATH}/${TEST_VIRTUAL_ACCOUNT}`,
        );

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Get Payments', () => {

    const methodName = 'fetchPayments';

    checkForID({
      apiObj: virtualAccounts,
      methodName,
      methodArgs: [void 0],
      mockerParams: {
        url: `${SUB_PATH}/${void 0}/payments`
      }
    });

    commonTests({
      apiObj: virtualAccounts,
      methodName,
      methodArgs: [TEST_VIRTUAL_ACCOUNT],
      mockerParams: {
        url: `${SUB_PATH}/${TEST_VIRTUAL_ACCOUNT}/payments`
      },
      expectedUrl: `${FULL_PATH}/${TEST_VIRTUAL_ACCOUNT}/payments`
    });

  });

});
