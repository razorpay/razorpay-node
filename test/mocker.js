const nock = require('nock');
const equal = require('deep-equal');

const Fixtures = require('./fixtures');

class Mocker {

  constructor() {
    this.host = 'https://api.razorpay.com';
    this.version = '/v1';
  }

  mock(params) {

    if (typeof params === 'undefined' || typeof params !== 'object' || Array.isArray(params)) {
      throw new TypeError(`Expected "params" to be an object, got ${typeof params}`);
    }

    const defaults = {
      url: '',
      method: 'GET',
      replyWithError: false,
      requestBody: ''
    };

    const mockingParameters = Object.assign({}, defaults, params);
    const statusCode = mockingParameters.replyWithError ? 400 : 200;
    let requestQueryParams = {};

    return nock(this.host)
      .intercept(normalizeUrl(`/${this.version}/${mockingParameters.url}`), mockingParameters.method)
      .query(q => {
        requestQueryParams = q;
        return true;
      })
      .reply(statusCode, (url, requestBody) => {

        if (mockingParameters.replyWithError) {
          return Fixtures.error;
        }

        return {
          success: true,
          '__MOCKED_RESPONSE_DATA__': {
            url,
            method: mockingParameters.method,
            requestQueryParams,
            requestBody: parseRequestBody(requestBody),
            headers: this.reqheaders
          }
        };

      });

  }

}

const normalizeUrl = url => {
  return url.replace(/\/{2,}/g, '/');
}

const parseRequestBody = raw => {

  if (raw.length === 0) {
    return {};
  }

  return raw.split('&').reduce((acc, current) => {
    const [key, value] = current.split('=');
    acc[decodeURIComponent(key)] = decodeURIComponent(value);
    return acc;
  }, {});

}

module.exports = new Mocker();
