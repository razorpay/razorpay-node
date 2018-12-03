const API = require('./api')
const pkg = require('../package.json')
const {
  validateWebhookSignature
} = require('./utils/razorpay-utils');

class Razorpay {

  static validateWebhookSignature(...args) {

    return validateWebhookSignature(...args);

  }

  constructor(options) {

    if (typeof options === 'undefined' || typeof options !== 'object') {
      throw new TypeError(
        `The configuration argument should be an object; got ${ typeof options }`
      );
    }

    let { keyId, keySecret, headers } = options;

    if (typeof keyId === 'undefined' || typeof keyId !== 'string') {
      throw new TypeError(
        `The property 'keyId' should be of type string; got ${ typeof keyId }`
      );
    }

    if (typeof keySecret === 'undefined' || typeof keySecret !== 'string') {
      throw new TypeError(
        `The property 'keySecret' should be of type string; got ${ typeof keySecret }`
      );
    }

    this.api = new API({
      hostUrl: 'https://api.razorpay.com/v1/',
      ua: `razorpay-node@${pkg.version}`,
      keyId,
      keySecret,
      headers
    });

    this.addResources();

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
      plans          : require('./resources/plans')(this.api),
      subscriptions  : require('./resources/subscriptions')(this.api),
      addons         : require('./resources/addons')(this.api)
    })
  }
}

module.exports = Razorpay
