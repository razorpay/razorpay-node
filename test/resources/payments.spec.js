const { assert } = require('chai');
const equal = require('deep-equal');

const { payments } = require('../razorpay');
const { getDateInSecs } = require('../../lib/utils/razorpay-utils');
const { commonTests }  = require('../predefined-tests.js');
const mocker = require('../mocker');

const TEST_PAYMENT_ID = 'pay_sometestId';

describe('#Payments', () => {

  describe('Fetch - <All>', () => {

    it('parses the default query parameters properly', async () => {

      mocker.mock({
        url: '/payments'
      })

      try {

        const response = await payments.all();

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
        url: '/payments'
      })

      try {

        const response = await payments.all(Object.assign({}, expectedParams, {
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
          `/v1/payments?from=${fromDateInSecs}&to=${toDateInSecs}&count=25&skip=5`,
        );

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Fetch - <Single>', () => {

    it('throws an error when the paymentId is not provided', () => {

      assert.throw(
        payments.fetch,
        TypeError
      );

    });

    it('correctly forms the payment fetch request', async () => {

      const paymentId = 'pay_sometestId';

      mocker.mock({
        url: `/payments/${paymentId}`
      })

      try {

        const response = await payments.fetch(paymentId);

        assert.equal(
          response['__MOCKED_RESPONSE_DATA__'].url,
          `/v1/payments/${paymentId}`,
          'Fetch payment url formed correctly'
        );

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Capture', () => {

    it('should throw an error when required parameters are not provided', () => {

      assert.throw(
        payments.capture,
        TypeError
      );

      assert.throw(() => payments.capture(''), TypeError);
      assert.throw(() => payments.capture(void 0, ''), TypeError);

    })

    it('creates a correctly formatted and formed POST request', async () => {

      const paymentId = 'pay_sometestId';
      const captureAmount = 100;

      mocker.mock({
        url: `/payments/${paymentId}/capture`,
        method: 'POST'
      })

      try {

        const response = await payments.capture(paymentId, captureAmount);
        const responseData = response['__MOCKED_RESPONSE_DATA__'];

        assert.equal(
          responseData.url,
          `/v1/payments/${paymentId}/capture`
        );

        assert.deepEqual(
          responseData.requestBody,
          { amount: captureAmount }
        );

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Refund', () => {

    it('throws an error when the required parameter is missing', () => {

      assert.throw(
        payments.refund,
        TypeError
      );

    })

    it('creates a correctly formatted and formed POST request', async () => {

      const paymentId = 'pay_sometestId';
      const refundAmount = 100;

      mocker.mock({
        url: `/payments/${paymentId}/refund`,
        method: 'POST'
      });


      try {

        const response = await payments.refund(paymentId, {
          amount: refundAmount,
          notes: {
            note1: 'This is note1',
            note2: 'This is note2'
          }
        });

        const responseData = response['__MOCKED_RESPONSE_DATA__'];

        assert.equal(
          responseData.url,
          `/v1/payments/${paymentId}/refund`
        );

        assert.deepEqual(
          responseData.requestBody,
          {
            amount: refundAmount,
            'notes[note1]': 'This is note1',
            'notes[note2]': 'This is note2'
          }
        );

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Transfers', () => {

    it('throws an error when the required parameter is missing', () => {

      assert.throw(
        payments.transfer,
        TypeError
      );

    })

    it('creates a correctly formatted and formed POST request', async () => {

      const paymentId = 'pay_sometestpayId';

      mocker.mock({
        url: `/payments/${paymentId}/transfers`,
        method: 'POST'
      });

      try {

        const response = await payments.transfer(paymentId, {
          transfers: [
            {
              account: 'acc_7jO4N6LScw5CEG',
              amount: 100,
              currency: 'INR',
              on_hold: true
            }
          ],
          notes: {
            note1: 'This is note1',
            note2: 'This is note2'
          }
        });

        const responseData = response['__MOCKED_RESPONSE_DATA__'];

        assert.equal(
          responseData.url,
          `/v1/payments/${paymentId}/transfers`,
          'Payment transfer request URL formed'
        );

        assert.deepEqual(
          responseData.requestBody,
          {
            'transfers[0][account]': 'acc_7jO4N6LScw5CEG',
            'transfers[0][amount]': 100,
            'transfers[0][currency]': 'INR',
            'transfers[0][on_hold]': 1,
            'notes[note1]': 'This is note1',
            'notes[note2]': 'This is note2'
          }
        );

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Bank Transfers', () => {

    it('throws an error when the required parameter is missing', async () => {

      assert.throw(
        payments.bankTransfer,
        TypeError
      );

    });

    commonTests({
      apiObj: payments,
      methodName: 'bankTransfer',
      methodArgs: [TEST_PAYMENT_ID],
      mockerParams: {
        url: `/payments/${TEST_PAYMENT_ID}/bank_transfer`
      },
      expectedUrl: `/v1/payments/${TEST_PAYMENT_ID}/bank_transfer`
    });

  });

});
