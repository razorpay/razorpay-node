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

    this.key_id = key_id
    this.key_secret = key_secret

    this.api = new API({
      hostUrl: 'https://api.razorpay.com',
      ua: `razorpay-node@${Razorpay.VERSION}`,
      key_id,
      key_secret,
      headers
    })
    this.addResources()
  }

  addResources() {
    Object.assign(this, {
      accounts       : require('./resources/accounts')(this.api),
      stakeholders   : require('./resources/stakeholders')(this.api),
      payments       : require('./resources/payments')(this.api),
      refunds        : require('./resources/refunds')(this.api),
      orders         : require('./resources/orders')(this.api),
      customers      : require('./resources/customers')(this.api),
      transfers      : require('./resources/transfers')(this.api),
      tokens         : require('./resources/tokens')(this.api),
      virtualAccounts: require('./resources/virtualAccounts')(this.api),
      invoices       : require('./resources/invoices')(this.api),
      iins           : require('./resources/iins')(this.api),
      paymentLink    : require('./resources/paymentLink')(this.api),
      plans          : require('./resources/plans')(this.api),
      products       : require('./resources/products')(this.api),
      subscriptions  : require('./resources/subscriptions')(this.api),
      addons         : require('./resources/addons')(this.api),
      settlements    : require('./resources/settlements')(this.api),
      qrCode         : require('./resources/qrCode')(this.api),
      fundAccount    : require('./resources/fundAccount')(this.api),
      items          : require('./resources/items')(this.api),
      cards          : require('./resources/cards')(this.api),
      webhooks       : require('./resources/webhooks')(this.api)
    })
  }
}

module.exports = Razorpay
