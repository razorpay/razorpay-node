'use strict'

const chai = require('chai')
const assert = chai.assert

// ---------------------------------------------------------------------------
// Backward Compatibility Tests
// Ensures all import/require patterns that worked before v3.0.0 still work
// after the CJS + ESM dual-build migration.
// ---------------------------------------------------------------------------

// --- 1. Main entry (CJS) ---------------------------------------------------
describe('Backward Compatibility', () => {

  describe('require("razorpay") — main CJS entry', () => {
    const Razorpay = require('../dist/razorpay')

    it('returns a function/class directly (no .default unwrap needed)', () => {
      assert.equal(typeof Razorpay, 'function')
    })

    it('instantiates with key_id + key_secret', () => {
      const rp = new Razorpay({ key_id: 'rzp_test_key', key_secret: 'secret' })
      assert.equal(rp.key_id, 'rzp_test_key')
      assert.equal(rp.key_secret, 'secret')
    })

    it('instantiates with oauthToken', () => {
      const rp = new Razorpay({ oauthToken: 'test_oauth_token' })
      assert.equal(rp.oauthToken, 'test_oauth_token')
    })

    it('throws when neither key_id nor oauthToken is provided', () => {
      assert.throws(() => new Razorpay(), '`key_id` or `oauthToken` is mandatory')
    })

    it('VERSION is defined', () => {
      assert.ok(Razorpay.VERSION)
    })

    it('validateWebhookSignature is a static method', () => {
      assert.equal(typeof Razorpay.validateWebhookSignature, 'function')
    })
  })

  // --- 2. All resource properties -------------------------------------------
  describe('instance resource properties', () => {
    const Razorpay = require('../dist/razorpay')
    let rp

    before(() => {
      rp = new Razorpay({ key_id: 'rzp_test_key', key_secret: 'secret' })
    })

    const resources = [
      'orders', 'payments', 'refunds', 'customers', 'transfers',
      'subscriptions', 'invoices', 'paymentLink', 'plans', 'addons',
      'settlements', 'qrCode', 'virtualAccounts', 'fundAccount',
      'items', 'cards', 'accounts', 'stakeholders', 'products',
      'webhooks', 'documents', 'disputes', 'tokens', 'iins'
    ]

    resources.forEach(resource => {
      it(`rp.${resource} is defined`, () => {
        assert.ok(rp[resource], `${resource} is missing from instance`)
      })
    })
  })

  // --- 3. Deep require paths ------------------------------------------------
  describe('deep require paths', () => {

    it('require("razorpay/dist/razorpay") returns class directly', () => {
      const Razorpay = require('../dist/razorpay')
      assert.equal(typeof Razorpay, 'function')
    })

    it('require("razorpay/dist/oAuthTokenClient") returns class', () => {
      const OAuthTokenClient = require('../dist/oAuthTokenClient')
      assert.equal(typeof OAuthTokenClient, 'function')
    })

    it('require("razorpay/dist/utils/razorpay-utils") returns object', () => {
      const utils = require('../dist/utils/razorpay-utils')
      assert.equal(typeof utils, 'object')
      assert.isNotNull(utils)
    })

    it('require("razorpay/dist/utils/nodeify") returns function', () => {
      const nodeify = require('../dist/utils/nodeify')
      assert.equal(typeof nodeify, 'function')
    })

    it('require("razorpay/dist/utils/predefined-tests") returns object', () => {
      const predefined = require('../dist/utils/predefined-tests')
      assert.equal(typeof predefined, 'object')
    })
  })

  // --- 4. OAuthTokenClient --------------------------------------------------
  describe('OAuthTokenClient', () => {
    const OAuthTokenClient = require('../dist/oAuthTokenClient')

    it('instantiates without arguments', () => {
      const client = new OAuthTokenClient()
      assert.ok(client)
    })

    it('has getAccessToken method', () => {
      const client = new OAuthTokenClient()
      assert.equal(typeof client.getAccessToken, 'function')
    })

    it('has refreshToken method', () => {
      const client = new OAuthTokenClient()
      assert.equal(typeof client.refreshToken, 'function')
    })

    it('has revokeToken method', () => {
      const client = new OAuthTokenClient()
      assert.equal(typeof client.revokeToken, 'function')
    })
  })

  // --- 5. Utility functions -------------------------------------------------
  describe('razorpay-utils exports', () => {
    const utils = require('../dist/utils/razorpay-utils')

    it('validateWebhookSignature is exported', () => {
      assert.equal(typeof utils.validateWebhookSignature, 'function')
    })

    it('generateOnboardingSignature is exported', () => {
      assert.equal(typeof utils.generateOnboardingSignature, 'function')
    })

    it('validateWebhookSignature returns true for valid signature', () => {
      const body = '{"event":"payment.captured"}'
      const secret = 'test_secret'
      const crypto = require('crypto')
      const signature = crypto.createHmac('sha256', secret).update(body).digest('hex')
      assert.isTrue(utils.validateWebhookSignature(body, signature, secret))
    })

    it('validateWebhookSignature returns false for invalid signature', () => {
      const body = '{"event":"payment.captured"}'
      const secret = 'test_secret'
      assert.isFalse(utils.validateWebhookSignature(body, 'invalidsignature', secret))
    })
  })

  // --- 6. Callback style (old API) ------------------------------------------
  describe('callback-style API (legacy)', () => {
    const Razorpay = require('../dist/razorpay')

    it('orders.create accepts a callback as last argument and invokes it', (done) => {
      const rp = new Razorpay({ key_id: 'rzp_test_key', key_secret: 'secret' })
      rp.orders.create({ amount: 500, currency: 'INR' }, (err) => {
        // callback is invoked — error expected since no real API key
        assert.ok(err)
        done()
      })
    })

    it('orders.create returns a Promise when no callback is passed', () => {
      const rp = new Razorpay({ key_id: 'rzp_test_key', key_secret: 'secret' })
      const result = rp.orders.create({ amount: 500, currency: 'INR' })
      assert.instanceOf(result, Promise)
      result.catch(() => {}) // suppress unhandled rejection
    })
  })
})
