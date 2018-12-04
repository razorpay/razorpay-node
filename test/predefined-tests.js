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

const runParamsCheckTest = (params) => {

  let {
    apiObj,
    methodName,
    methodArgs,
    expectedParams,
    mockerParams,
    testTitle
  } = params;

  testTitle = testTitle || "Validates URL and Params";

  it (testTitle, (done) => {

    mocker.mock(mockerParams);

    apiObj[methodName](...methodArgs).then((resp) => {

      const respData = resp.__JUST_FOR_TESTS__,
            respParams = respData[respData.method === "GET"
                                    ? "requestQueryParams"
                                    : "requestBody"];

        if (equal(respParams, expectedParams)) {

          assert.ok(true, "Params Matched");
        } else {

          return getTestError(
            "Params Mismatch",
            expectedParams,
            respParams
          );
        }
    }, (err) => {

      return new Error(prettify(err));
    }).then((err) => {

      done(err);
    });
  });
}

const runCommonTests = (params) => {

  let {
    apiObj,
    methodName,
    methodArgs,
    expectedUrl,
    expectedParams,
    mockerParams
  } = params;

  urlCheck({
    ...params
  });

  if (expectedParams) {

    runParamsCheckTest({
      ...params
    });

  }

  callbackCheck({
   ...params
  });
}

module.exports = {
  urlCheck,
  callbackCheck,
  runCommonTests
};
