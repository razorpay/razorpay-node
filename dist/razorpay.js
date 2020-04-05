'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __importDefault(require("./api"));
var pkg = require('../package.json');
var razorpay_utils_1 = require("./utils/razorpay-utils");
var payments_1 = __importDefault(require("./resources/payments"));
var refunds_1 = __importDefault(require("./resources/refunds"));
var orders_1 = __importDefault(require("./resources/orders"));
var customers_1 = __importDefault(require("./resources/customers"));
var transfers_1 = __importDefault(require("./resources/transfers"));
var virtualAccounts_1 = __importDefault(require("./resources/virtualAccounts"));
var invoices_1 = __importDefault(require("./resources/invoices"));
var plans_1 = __importDefault(require("./resources/plans"));
var subscriptions_1 = __importDefault(require("./resources/subscriptions"));
var addons_1 = __importDefault(require("./resources/addons"));
var Razorpay = /** @class */ (function () {
    function Razorpay(options) {
        var _a = options || {}, key_id = _a.key_id, key_secret = _a.key_secret, headers = _a.headers;
        if (!key_id) {
            throw new Error('`key_id` is mandatory');
        }
        if (!key_secret) {
            throw new Error('`key_secret` is mandatory');
        }
        this.key_id = key_id;
        this.key_secret = key_secret;
        this.api = new api_1.default({
            hostUrl: 'https://api.razorpay.com/v1/',
            ua: "razorpay-node@" + Razorpay.VERSION,
            key_id: key_id,
            key_secret: key_secret,
            headers: headers
        });
        this.addResources();
    }
    Razorpay.validateWebhookSignature = function (body, signature, secret) {
        return razorpay_utils_1.validateWebhookSignature(body, signature, secret);
    };
    Razorpay.prototype.addResources = function () {
        Object.assign(this, {
            payments: payments_1.default(this.api),
            refunds: refunds_1.default(this.api),
            orders: orders_1.default(this.api),
            customers: customers_1.default(this.api),
            transfers: transfers_1.default(this.api),
            virtualAccounts: virtualAccounts_1.default(this.api),
            invoices: invoices_1.default(this.api),
            plans: plans_1.default(this.api),
            subscriptions: subscriptions_1.default(this.api),
            addons: addons_1.default(this.api)
        });
    };
    Razorpay.VERSION = pkg.version;
    return Razorpay;
}());
module.exports = Razorpay;
