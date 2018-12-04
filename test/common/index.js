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

  }
};
