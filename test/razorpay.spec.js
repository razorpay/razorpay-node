const { assert } = require('chai');

const Razorpay = require('../lib');

describe('#Razorpay', () => {

  it('validates configuration parameters envelope', () => {

    assert.throws(() => {
      new Razorpay();
    }, TypeError, 'The configuration argument should be an object; got undefined');

    assert.throws(() => {
      new Razorpay('test');
    }, TypeError, 'The configuration argument should be an object; got string');

  });

  it('validates child properties', () => {

    assert.throws(() => {
      new Razorpay( {} );
    }, TypeError, 'The property \'keyId\' should be of type string; got undefined');

    assert.throws(() => {
      new Razorpay( { keyId: 'test' } );
    }, TypeError, 'The property \'keySecret\' should be of type string; got undefined');

  });

  it('initializes correctly on correct parameter description', () => {

    const razorpayClient = new Razorpay({
      keyId: 'test',
      keySecret: 'test'
    });

    assert.isOk(razorpayClient.api);
    assert.isOk(razorpayClient.payments);
    assert.isOk(razorpayClient.refunds);
    assert.isOk(razorpayClient.orders);
    assert.isOk(razorpayClient.customers);
    assert.isOk(razorpayClient.transfers);
    assert.isOk(razorpayClient.virtualAccounts);
    assert.isOk(razorpayClient.invoices);
    assert.isOk(razorpayClient.plans);
    assert.isOk(razorpayClient.subscriptions);
    assert.isOk(razorpayClient.addons);

  });

});
