// TODO: There is a lot of redundancy in the code base. Refractor it again.

const equal = require('deep-equal');

const { assert } = require('chai');
const { customers } = require('../razorpay');
const { getDateInSecs } = require('../../lib/utils/razorpay-utils');
const mocker = require('../mocker');
const Fixtures = require('../fixtures');

describe('#Customers', () => {

  it('creates a customer', async () => {

    mocker.mock({
      url: '/customers',
      method: 'POST'
    })

    try {

      const response = await customers.create(Fixtures.customer.parameters);
      const responseData = response['__MOCKED_RESPONSE_DATA__'];

      assert.equal(
        responseData.url,
        '/v1/customers'
      );

      assert.ok(
        equal(
          responseData.requestBody,
          Fixtures.customer.expectedParameters
        )
      );

    } catch (error) {
      throw error;
    }

  });

  it('edits customer data based on ID', async () => {

    const TEST_CUSTOMER_ID = 'cust_6fqBqgrfTSuj5v'

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}`,
      method: 'PUT'
    });

    try {

      const response = await customers.edit(TEST_CUSTOMER_ID, Fixtures.customer.parameters);
      const responseData = response['__MOCKED_RESPONSE_DATA__'];

      assert.equal(
        responseData.url,
        `/v1/customers/${TEST_CUSTOMER_ID}`
      );

      assert.ok(
        equal(
          responseData.requestBody,
          Fixtures.customer.expectedParameters
        )
      );

    } catch (error) {
      throw error;
    }

  });

  it('fetches the customer', async () => {

    const TEST_CUSTOMER_ID = 'cust_6fqBqgrfTSuj5v'

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}`
    });

    try {

      const response = await customers.fetch(TEST_CUSTOMER_ID);
      assert.equal(
        response['__MOCKED_RESPONSE_DATA__'].url,
        `/v1/customers/${TEST_CUSTOMER_ID}`
      );

    } catch (error) {
      throw error;
    }

  })

  describe('Customer Tokens', () => {

    it('fetches all the tokens for a customer', async function() {

      const TEST_CUSTOMER_ID = 'cust_6fqBqgrfTSuj5v';

      mocker.mock({
        url: `/customers/${TEST_CUSTOMER_ID}/tokens`
      });

      try {

        const response = await customers.fetchTokens(TEST_CUSTOMER_ID);
        assert.equal(
          response['__MOCKED_RESPONSE_DATA__'].url,
          `/v1/customers/${TEST_CUSTOMER_ID}/tokens`
        );

      } catch (error) {
        throw error;
      }

    });

    it('fetches a single token by ID', async function() {

      const TEST_CUSTOMER_ID = 'cust_6fqBqgrfTSuj5v'
      const TEST_TOKEN_ID = 'tkn_YDovP0Tg6fpsp'

      mocker.mock({
        url: `/customers/${TEST_CUSTOMER_ID}/tokens/${TEST_TOKEN_ID}`
      });

      try {
        const response = await customers.fetchToken(TEST_CUSTOMER_ID, TEST_TOKEN_ID);
        assert.equal(
          response['__MOCKED_RESPONSE_DATA__'].url,
          `/v1/customers/${TEST_CUSTOMER_ID}/tokens/${TEST_TOKEN_ID}`
        );
      } catch (error) {
        throw error;
      }

    });

    it('deletes a token by ID', async function() {

      const TEST_CUSTOMER_ID = 'cust_6fqBqgrfTSuj5v'
      const TEST_TOKEN_ID = 'tkn_YDovP0Tg6fpsp'

      mocker.mock({
        url: `/customers/${TEST_CUSTOMER_ID}/tokens/${TEST_TOKEN_ID}`,
        method: 'DELETE'
      })

      try {
        const response = await customers.deleteToken(TEST_CUSTOMER_ID, TEST_TOKEN_ID);
        assert.equal(
          response['__MOCKED_RESPONSE_DATA__'].url,
          `/v1/customers/${TEST_CUSTOMER_ID}/tokens/${TEST_TOKEN_ID}`
        );
      } catch (error) {
        throw error;
      }

    });

  });

});
