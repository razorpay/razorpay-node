const { assert } = require('chai');
const nodeify = require('../../lib/utils/nodeify');

describe('#Nodeify', () => {

  it('promise on no callback', () => {

    const retVal = nodeify(Promise.resolve('test'));

    assert.isOk(retVal.then);
    assert.isOk(retVal.catch);

  });

  it('resolves on completion', done => {

    const resolveMsg = 'test';

    nodeify(Promise.resolve(resolveMsg), (err, data) => {
      assert.equal(resolveMsg, data);
      assert.isNotOk(err, 'err should be passed as null');
      done();
    });

  });

  it('rejects on error', done => {

    const errorMsg = 'error';

    nodeify(Promise.reject(errorMsg), (err, data) => {
      assert.equal(err, errorMsg);
      assert.isNotOk(data, 'Response is null');
      done();
    });

  });

});
