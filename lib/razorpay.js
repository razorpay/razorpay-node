'use strict'

const API = require('./api')
const pkg = require('../package.json')
const {
  validateWebhookSignature
} = require('./utils/razorpay-utils');

class Razorpay {
  static VERSION = pkg.version

  static validateWebhookSignature (...args) {
  
    return validateWebhookSignature(...args);
  }

  constructor(options = {}) {
    let { key_id, key_secret, headers } = options

    if (!key_id) {
      throw new Error('`key_id` is mandatory')
    }

    if (!key_secret) {
      throw new Error('`key_secret` is mandatory')
    }

    this.key_id = key_id
    this.key_secret = key_secret

    this.api = new API({
      hostUrl: 'https://api.razorpay.com/v1/',
      ua: `razorpay-node@${Razorpay.VERSION}`,
      key_id,
      key_secret,
      headers
    })
    this.addResources()
  }

  addResources() {
    Object.assign(this, {
      payments       : require('./resources/payments')(this.api),
      refunds        : require('./resources/refunds')(this.api),
      orders         : require('./resources/orders')(this.api),
      customers      : require('./resources/customers')(this.api),
      transfers      : require('./resources/transfers')(this.api),
      virtualAccounts: require('./resources/virtualAccounts')(this.api),
      invoices       : require('./resources/invoices')(this.api),
      paymentLink    : require('./resources/paymentLink')(this.api),
      plans          : require('./resources/plans')(this.api),
      subscriptions  : require('./resources/subscriptions')(this.api),
      addons         : require('./resources/addons')(this.api)
    })
  }
}

module.exports = Razorpay
