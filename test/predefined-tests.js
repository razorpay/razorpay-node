const { assert } = require('chai');
const equal = require('deep-equal');

const { getTestError } = require('./common');
const mocker = require('./mocker');

const callbackCheck = params => {

  let { apiObj, methodName, methodArgs, mockerParams } = params;

  describe('Common Tests - Callback Tests', () => {

    it('invokes the callback when provided', done => {

      mocker.mock(mockerParams);

      apiObj[methodName](...methodArgs, () => {
        done();
      });

    });

    it('errors on invalid response from the API', done => {

      mocker.mock({...mockerParams, replyWithError: true});

      apiObj[methodName](...methodArgs, err => {

       assert.isOk(err);
       done();

      });

    });

    it('returns a Promise on no callback', () => {

      mocker.mock(mockerParams);
      assert.ok(apiObj[methodName](...methodArgs) instanceof Promise);

    });

  });

}

const urlCheck = params => {

  let { apiObj, methodName, methodArgs, expectedUrl, mockerParams } = params;

  describe('Common Tests - URL Validation', () => {

    it('sends the request to the correct API endpoint', async () => {

      mocker.mock(mockerParams);

      try {

        const data = await apiObj[methodName](...methodArgs);
        const responseData = data['__MOCKED_RESPONSE_DATA__'];

        assert.ok( responseData.url === expectedUrl );

      } catch (e) { throw e; }

    });

  });

}

const checkParameters = params => {

  const {
    apiObj,
    methodName,
    methodArgs,
    expectedParams,
    mockerParams,
    testTitle
  } = params;

  testTitle = testTitle || 'has the correct URL and parameters';

  it(testTitle, async () => {

    mocker.mock(mockerParams);

    try {

      const response = await apiObj[methodName](...methodArgs);
      const responseData = response['__MOCKED_RESPONSE_DATA__'];
      const parameterKey = (responseData.method === 'GET')
       ? 'requestQueryParams' : 'requestBody';

      const responseDataParams = responseData[parameterKey];

      assert.ok(equal(responseDataParams, expectedParams));

    } catch (error) {
      throw error;
    }

  });
}

const commonTests = params => {

  urlCheck({
    ...params
  });

  callbackCheck({
   ...params
  });

  if (params.expectedParams) {

    checkParameters({
      ...params
    });

  }

}

module.exports = {
  urlCheck,
  callbackCheck,
  checkParameters,
  commonTests
};
