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

  payments;
  refunds;
  orders;
  customers;
  transfers;
  virtualAccounts;
  invoices;
  plans;
  subscriptions;
  addons;

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
    this.payments = Payments(this.api);
    this.refunds = Refunds(this.api);
    this.orders = Orders(this.api);
    this.customers = Customers(this.api);
    this.transfers = Transfers(this.api);
    this.virtualAccounts = VirtualAccounts(this.api);
    this.invoices = Invoices(this.api);
    this.plans = Plans(this.api);
    this.subscriptions = Subscriptions(this.api);
    this.addons = Addons(this.api);
  }
}

module.exports = Razorpay
