'use strict'

const util = require('util')
const { assert } = require('chai')
const nock = require('nock')
const API = require('../dist/api')

async function getNetworkError (api) {
  nock('https://api.razorpay.com')
    .get('/v1/orders')
    .replyWithError({ code: 'ECONNRESET', message: 'socket hang up' })

  let thrown
  try {
    await api.get({ url: '/orders' })
  } catch (error) {
    thrown = error
  }
  assert.exists(thrown, 'Expected the request to fail')
  return thrown
}

function assertNotOnError (error, secret) {
  const inspected = util.inspect(error, { depth: Infinity, showHidden: true })
  assert.notInclude(inspected, secret)
  assert.notInclude(JSON.stringify(error), secret)
}

describe('API errors', () => {
  const api = new API({ hostUrl: 'https://api.razorpay.com', ua: 'razorpay-node-test' })

  it('keeps the message and code of a network error', async () => {
    const error = await getNetworkError(api)

    assert.instanceOf(error, Error)
    assert.equal(error.message, 'socket hang up')
    assert.equal(error.code, 'ECONNRESET')
  })

  it('does not expose key_secret on a network error', async () => {
    const keyId = 'rzp_test_key_id'
    const keySecret = 'rzp_test_key_secret_value'
    const basicAuthApi = new API({
      hostUrl: 'https://api.razorpay.com',
      ua: 'razorpay-node-test',
      key_id: keyId,
      key_secret: keySecret
    })

    const error = await getNetworkError(basicAuthApi)

    assert.isUndefined(error.config)
    assert.isUndefined(error.request)
    assertNotOnError(error, keySecret)
    assertNotOnError(error, Buffer.from(`${keyId}:${keySecret}`).toString('base64'))
  })

  it('does not expose the OAuth token on a network error', async () => {
    const oauthToken = 'test_oauth_access_token_value'
    const oauthApi = new API({
      hostUrl: 'https://api.razorpay.com',
      ua: 'razorpay-node-test',
      oauthToken
    })

    const error = await getNetworkError(oauthApi)

    assertNotOnError(error, oauthToken)
  })

  it('preserves a network error when the server does not respond', async () => {
    nock('https://api.razorpay.com')
      .get('/v1/orders')
      .replyWithError('connection lost')

    try {
      await api.get({ url: '/orders' })
      assert.fail('Expected the request to fail')
    } catch (error) {
      assert.instanceOf(error, Error)
      assert.include(error.message, 'connection lost')
    }
  })

  it('keeps the SDK error format for an HTTP error response', async () => {
    nock('https://api.razorpay.com')
      .get('/v1/orders')
      .reply(400, { error: { code: 'BAD_REQUEST_ERROR', description: 'Invalid order request' } })

    try {
      await api.get({ url: '/orders' })
      assert.fail('Expected the request to fail')
    } catch (error) {
      assert.deepEqual(error, {
        statusCode: 400,
        error: { code: 'BAD_REQUEST_ERROR', description: 'Invalid order request' }
      })
    }
  })
})
