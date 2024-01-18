"use strict";

import API from "./api.js";
import pkg from "../package.json" with { type: "json" };
import { validateWebhookSignature } from "./utils/razorpay-utils.js";
import accounts from "./resources/accounts.js";
import stakeholders from "./resources/stakeholders.js";
import payments from "./resources/payments.js";
import refunds from "./resources/refunds.js";
import orders from "./resources/orders.js";
import customers from "./resources/customers.js";
import transfers from "./resources/transfers.js";
import tokens from "./resources/tokens.js";
import virtualAccounts from "./resources/virtualAccounts.js";
import invoices from "./resources/invoices.js";
import iins from "./resources/iins.js";
import paymentLink from "./resources/paymentLink.js";
import plans from "./resources/plans.js";
import products from "./resources/products.js";
import subscriptions from "./resources/subscriptions.js";
import addons from "./resources/addons.js";
import settlements from "./resources/settlements.js";
import qrCode from "./resources/qrCode.js";
import fundAccount from "./resources/fundAccount.js";
import items from "./resources/items.js";
import cards from "./resources/cards.js";
import webhooks from "./resources/webhooks.js";

class Razorpay {
  static VERSION = pkg.version;

  static validateWebhookSignature(...args) {
    return validateWebhookSignature(...args);
  }

  constructor(options = {}) {
    let { key_id, key_secret, headers } = options;

    if (!key_id) {
      throw new Error("`key_id` is mandatory");
    }

    this.key_id = key_id;
    this.key_secret = key_secret;

    this.api = new API({
      hostUrl: "https://api.razorpay.com",
      ua: `razorpay-node@${Razorpay.VERSION}`,
      key_id,
      key_secret,
      headers,
    });
    this.addResources();
  }

  addResources() {
    Object.assign(this, {
      accounts: accounts(this.api),
      stakeholders: stakeholders(this.api),
      payments: payments(this.api),
      refunds: refunds(this.api),
      orders: orders(this.api),
      customers: customers(this.api),
      transfers: transfers(this.api),
      tokens: tokens(this.api),
      virtualAccounts: virtualAccounts(this.api),
      invoices: invoices(this.api),
      iins: iins(this.api),
      paymentLink: paymentLink(this.api),
      plans: plans(this.api),
      products: products(this.api),
      subscriptions: subscriptions(this.api),
      addons: addons(this.api),
      settlements: settlements(this.api),
      qrCode: qrCode(this.api),
      fundAccount: fundAccount(this.api),
      items: items(this.api),
      cards: cards(this.api),
      webhooks: webhooks(this.api),
    });
  }
}

export default Razorpay;
