const { assert } = require('chai');

const mocker = require('../mocker');
const equal = require('deep-equal');
const { getDateInSecs } = require('../../lib/utils/razorpay-utils');
const { refunds } = require('../razorpay');

describe('#Refunds', () => {

  describe('Fetch <All>', () => {

    it('passes the default parameters correctly in the request', async () => {

      mocker.mock({
        url: '/refunds'
      });

      try {

        const response = await refunds.all();

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
        url: '/refunds'
      })

      try {

        const response = await refunds.all(Object.assign({}, expectedParams, {
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
          `/v1/refunds?from=${fromDateInSecs}&to=${toDateInSecs}&count=25&skip=5`,
        );

      } catch (error) {
        throw error;
      }

    });

    it('forms the correct URL to fetch a specific refund based on ID', async () => {

      const paymentId = 'pay_sometestId';

      mocker.mock({
        url: `/payments/${paymentId}/refunds`
      })

      try {

        const response = await refunds.all({ payment_id: paymentId });

        assert.equal(
          response['__MOCKED_RESPONSE_DATA__'].url,
          `/v1/payments/${paymentId}/refunds?count=10&skip=0`
        );

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Fetch <Single>', () => {

    it('throws an error when the refundId is not provided', () => {

      assert.throw(
        refunds.fetch,
        TypeError
      );

    });

    it('correctly forms the refund GET request', async () => {

      const refundId = 'rfn_sometestId';

      mocker.mock({
        url: `/refunds/${refundId}`
      });

      try {

        const response = await refunds.fetch(refundId);

        assert.equal(
          response['__MOCKED_RESPONSE_DATA__'].url,
          `/v1/refunds/${refundId}`
        );

      } catch (error) {
        throw error;
      }

    });

    it('correctly forms the refund GET request for the payments subpath', async () => {

      const paymentId = 'pay_sometestId';
      const refundId = 'rfn_sometestId';
      const params = {
        payment_id: paymentId
      };

      mocker.mock({
        url: `/payments/${paymentId}/refunds/${refundId}`
      });

      try {

        const response = await refunds.fetch(refundId, params);

        assert.equal(
          response['__MOCKED_RESPONSE_DATA__'].url,
          `/v1/payments/${paymentId}/refunds/${refundId}`
        )

      } catch (error) {
        throw error;
      }

    });

  });

});
