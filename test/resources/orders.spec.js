const { assert } = require('chai');
const { orders } = require('../razorpay');
const mocker = require('../mocker');
const equal = require('deep-equal');
const { getDateInSecs } = require('../../lib/utils/razorpay-utils');

describe('#Orders', () => {

  describe('Fetch - <All>', () => {

    it('fetches orders with the default query parameters', async () => {

      mocker.mock({
        url: '/orders'
      });

      try {

        const response = await orders.all();

        assert.containsAllKeys(
          response['__MOCKED_RESPONSE_DATA__'].requestQueryParams,
          { skip: 0, count: 10 }
        );

      } catch (error) {
        throw error;
      }

    })

    it('converts "to" and "from" parameters to milliseconds', async () => {

      const from = 'Aug 25, 2016';
      const to = 'Aug 30, 2016';
      const fromDateInSecs = getDateInSecs(from);
      const toDateInSecs = getDateInSecs(to);
      const expectedParams = {
        from: fromDateInSecs,
        to: toDateInSecs,
        authorized: 1,
        receipt: 'testreceiptid',
        count: 25,
        skip: 5
      };

      mocker.mock({
        url: '/orders'
      })

      try {

        const response = await orders.all(Object.assign({}, expectedParams, {
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
          `/v1/orders?from=${fromDateInSecs}&to=${toDateInSecs}&count=25&skip=5&authorized=1&receipt=testreceiptid`
        );

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Fetch - <Single>', () => {

    it('throws an error when the orderId is not provided', () => {

      assert.throw(
        orders.fetch,
        TypeError
      );

    });

    it('correctly forms the order fetch request', async () => {

      const orderId = 'order_sometestId';

      mocker.mock({
        url: `/orders/${orderId}`
      })

      try {

        const response = await orders.fetch(orderId);

        assert.equal(
          response['__MOCKED_RESPONSE_DATA__'].url,
          `/v1/orders/${orderId}`
        );

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Create Order', () => {

    it('should throw an error when required parameters are not provided', () => {

      assert.throw(
        orders.create,
        TypeError
      )

      assert.throw(() => {
        orders.create({
          amount: 100
        });
      }, TypeError);

      assert.throw(() => {
        orders.create({
          receipt: ''
        });
      }, TypeError);

    });

    it('creates a correctly formatted and formed POST request', async () => {

      const orderAmount = 100;
      const receipt = 'testreceiptid';
      const params = {
        amount: orderAmount,
        receipt: receipt,
        currency: 'INR',
        payment_capture: true,
        notes: {
          note1: 'This is note1',
          note2: 'This is note2'
        }
      }

      mocker.mock({
        url: `/orders`,
        method: 'POST'
      })

      try {

        const response = await orders.create(params);
        const responseData = response['__MOCKED_RESPONSE_DATA__'];

        // This is a pretty redundant test.
        assert.equal(
          responseData.url,
          '/v1/orders'
        );

        assert.deepEqual(
          responseData.requestBody,
          {
            amount: orderAmount,
            receipt: receipt,
            currency: 'INR',
            payment_capture: 1,
            'notes[note1]': 'This is note1',
            'notes[note2]': 'This is note2'
          }
        );

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Fetch Order - #Payments', () => {

    it('throws an error when orderId is not provided', () => {
      assert.throws(
        orders.fetchPayments,
        TypeError
      );
    });

    it('fetches the order\'s associated payment records', async () => {

      const orderId = 'order_sometestId';

      mocker.mock({
        url: `/orders/${orderId}/payments`
      });

      try {
        const response = await orders.fetchPayments(orderId);
        assert.equal(
          response['__MOCKED_RESPONSE_DATA__'].url,
          '/v1/orders/order_sometestId/payments'
        );
      } catch (error) {
        throw error;
      }

    });

  });

});
