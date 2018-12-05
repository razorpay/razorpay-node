const { assert } = require('chai');
const mocker = require('../mocker');

module.exports = {

  getTestError(summary, expectedVal, gotVal) {

    const prettify = val => {
      return JSON.stringify(val, null, 2);
    };

    return new Error(
      `${summary}`+
      `Expected(${typeof expectedVal}): ${prettify(expectedVal)};`+
      `Got(${typeof gotVal})\n${prettify(gotVal)}`
    );

  },

  checkForID(params) {

    const { apiObj, methodName, methodArgs, mockerParams } = params;

    mocker.mock(mockerParams);

    it (`throws an error when no ID parameter is provided (${methodName})`, async () => {

      try {
        await apiObj[methodName](...methodArgs);
        throw new Error(
          `API method '${methodName}' did not throw an error on undefined variable value`
        );
      } catch (error) {
        assert.ok(error);
      }

    });

  }

};
