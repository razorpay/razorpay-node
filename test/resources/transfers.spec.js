const { assert } = require('chai');

const { getDateInSecs, normalizeNotes } = require('../../lib/utils/razorpay-utils');
const { transfers, payments } = require('../razorpay');
const mocker = require('../mocker');
const Fixtures = require('../fixtures');

describe('#Transfers', () => {

  it('creates a properly formatted request to create a direct transfer', async () => {

    const { notes, ...rest } = {
      account: 'acc_7jO4N6LScw5CEG',
      amount: 100,
      currency: 'INR',
      notes: {
        note1: 'This is note1',
        note2: 'This is note2'
      }
    };

    const params = Object.assign({}, { notes }, rest);
    const expectedParams = Object.assign({}, rest, normalizeNotes(notes));

    mocker.mock({
      url: '/transfers',
      method: 'POST'
    });

    try {

      const response = await transfers.create(params);
      const responseData = response['__MOCKED_RESPONSE_DATA__'];

      assert.equal(
        responseData.url,
        '/v1/transfers',
      );

      assert.deepEqual(
        responseData.requestBody,
        expectedParams
      );

    } catch (error) {
      throw error;
    }

  });

  it('creates a transfer request from a payment resource', async () => {

    const TEST_PAYMENT_ID = 'pay_6fqBqgrfTSuj5v';

    mocker.mock({
      url: `/payments/${TEST_PAYMENT_ID}/transfers`,
      method: 'POST'
    });

    try {

      const response = await payments.transfer(TEST_PAYMENT_ID, {
        notes: Fixtures.common.parameters.notes
      });
      const responseData = response['__MOCKED_RESPONSE_DATA__'];

      assert.equal(
        responseData.url,
        `/v1/payments/${TEST_PAYMENT_ID}/transfers`,
      );

      assert.deepEqual(
        responseData.requestBody,
        normalizeNotes(Fixtures.common.parameters.notes)
      );

    } catch (error) {
      throw error;
    }

  });

  it('creates a properly formed PATCH request to edit a transfer', async () => {

    const TEST_TRANSFER_ID = 'trf_6fqBqgrfTSuj5v';
    const params = {
      on_hold: true,
      notes: {
        note1: 'This is note1'
      }
    };

    const expectedParams = {
      on_hold: 1,
      'notes[note1]': 'This is note1'
    };

    mocker.mock({
      url: `/transfers/${TEST_TRANSFER_ID}`,
      method: 'PATCH'
    });

    try {

      const response = await transfers.edit(TEST_TRANSFER_ID, params);
      const responseData = response['__MOCKED_RESPONSE_DATA__'];

      assert.equal(
        responseData.url,
        `/v1/transfers/${TEST_TRANSFER_ID}`
      );

      assert.deepEqual(
        responseData.requestBody,
        expectedParams
      );

    } catch (error) {
      throw error;
    }

  });

  it('creates a properly formed POST request to reverse a transfer', async () => {

    const TEST_TRANSFER_ID = 'trf_6fqBqgrfTSuj5v';
    const { notes, ...rest } = {
      amount: 100,
      currency: 'INR',
      notes: {
        note1: 'This is note1'
      }
    };

    const params = Object.assign({}, { notes }, rest);
    const expectedParams = Object.assign({}, rest, normalizeNotes(notes));

    mocker.mock({
      url: `/transfers/${TEST_TRANSFER_ID}/reversals`,
      method: 'POST'
    })

    try {

      const response = await transfers.reverse(TEST_TRANSFER_ID, params);
      const responseData = response['__MOCKED_RESPONSE_DATA__'];

      assert.equal(
        responseData.url,
        `/v1/transfers/${TEST_TRANSFER_ID}/reversals`
      );

      assert.deepEqual(
        responseData.requestBody,
        expectedParams
      );

    } catch (error) {
      throw error;
    }

  })

  it('creates a properly formed GET request to fetch a specific transfer resource', async () => {

    const TEST_TRANSFER_ID = 'trf_6fqBqgrfTSuj5v';

    mocker.mock({
      url: `/transfers/${TEST_TRANSFER_ID}`
    });

    try {

      const response = await transfers.fetch(TEST_TRANSFER_ID);

      assert.equal(
        response['__MOCKED_RESPONSE_DATA__'].url,
        `/v1/transfers/${TEST_TRANSFER_ID}`
      );

    } catch (error) {
      throw error;
    }

  });

  describe('Fetch <All>', () => {

    it('passes the default parameters correctly in the request', async () => {

      mocker.mock({
        url: '/transfers'
      });

      try {

        const response = await transfers.all();

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
        url: '/transfers'
      })

      try {

        const response = await transfers.all(Object.assign({}, expectedParams, {
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
          `/v1/transfers?from=${fromDateInSecs}&to=${toDateInSecs}&count=25&skip=5`,
        );

      } catch (error) {
        throw error;
      }

    });

  });

});
