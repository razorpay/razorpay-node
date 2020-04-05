'use strict';

import API from './api';
const pkg = require('../package.json')
import {
  validateWebhookSignature
} from './utils/razorpay-utils';

import { Headers } from './types';

import Payments from './resources/payments';
import Refunds from './resources/refunds';
import Orders from './resources/orders';
import Customers from './resources/customers';
import Transfers from './resources/transfers';
import VirtualAccounts from './resources/virtualAccounts';
import Invoices from './resources/invoices';
import Plans from './resources/plans';
import Subscriptions from './resources/subscriptions';
import Addons from './resources/addons';

class Razorpay {
  static VERSION = pkg.version

  key_id: string;
  key_secret: string;
  api: InstanceType<typeof API>;

  static validateWebhookSignature (body, signature, secret) {
    return validateWebhookSignature(body, signature, secret);
  }

  constructor(options: {key_id: string, key_secret: string, headers?: Headers}) {
    let { key_id, key_secret, headers } = options || {};

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
      payments       : Payments(this.api),
      refunds        : Refunds(this.api),
      orders         : Orders(this.api),
      customers      : Customers(this.api),
      transfers      : Transfers(this.api),
      virtualAccounts: VirtualAccounts(this.api),
      invoices       : Invoices(this.api),
      plans          : Plans(this.api),
      subscriptions  : Subscriptions(this.api),
      addons         : Addons(this.api)
    })
  }
}

module.exports = Razorpay
