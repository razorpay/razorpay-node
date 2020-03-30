'use strict';
var API = require('./api');
var pkg = require('../package.json');
var validateWebhookSignature = require('./utils/razorpay-utils').validateWebhookSignature;
var Razorpay = /** @class */ (function () {
    function Razorpay(options) {
        if (options === void 0) { options = {}; }
        var key_id = options.key_id, key_secret = options.key_secret, headers = options.headers;
        if (!key_id) {
            throw new Error('`key_id` is mandatory');
        }
        if (!key_secret) {
            throw new Error('`key_secret` is mandatory');
        }
        this.key_id = key_id;
        this.key_secret = key_secret;
        this.api = new API({
            hostUrl: 'https://api.razorpay.com/v1/',
            ua: "razorpay-node@" + Razorpay.VERSION,
            key_id: key_id,
            key_secret: key_secret,
            headers: headers
        });
        this.addResources();
    }
    Razorpay.validateWebhookSignature = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return validateWebhookSignature.apply(void 0, args);
    };
    Razorpay.prototype.addResources = function () {
        Object.assign(this, {
            payments: require('./resources/payments')(this.api),
            refunds: require('./resources/refunds')(this.api),
            orders: require('./resources/orders')(this.api),
            customers: require('./resources/customers')(this.api),
            transfers: require('./resources/transfers')(this.api),
            virtualAccounts: require('./resources/virtualAccounts')(this.api),
            invoices: require('./resources/invoices')(this.api),
            plans: require('./resources/plans')(this.api),
            subscriptions: require('./resources/subscriptions')(this.api),
            addons: require('./resources/addons')(this.api)
        });
    };
    Razorpay.VERSION = pkg.version;
    return Razorpay;
}());
module.exports = Razorpay;
