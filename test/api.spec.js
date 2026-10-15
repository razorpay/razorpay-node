'use strict'

const { assert } = require('chai')
const nock = require('nock')
const API = require('../dist/api')

describe('API errors', () => {
  const api = new API({ hostUrl: 'https://api.razorpay.com', ua: 'razorpay-node-test' })

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
