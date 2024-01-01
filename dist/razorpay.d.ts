import API, { RazorpayHeaders } from './types/api'
import addons from "./types/addons"
import plans from "./types/plans"
import items from "./types/items"
import fundAccount from "./types/fundAccount"
import invoices from "./types/invoices"
import transfers from "./types/transfers"
import settlements from './types/settlements'
import orders from './types/orders'
import refunds from './types/refunds'
import qrCode from './types/qrCode'
import virtualAccounts from './types/virtualAccounts'
import payments from './types/payments'
import subscriptions from './types/subscriptions'
import paymentLink from './types/paymentLink'
import cards from './types/cards'
import { validateWebhookSignature } from "./utils/razorpay-utils"
import customers from './types/customers'
import accounts from './types/accounts'
import stakeholders from './types/stakeholders'
import webhooks from './types/webhooks'
import products from './types/products'
import tokens from './types/tokens'
import iins from './types/iins'

interface IRazorpayConfig {
    key_id: string;
    key_secret?: string;
    headers?: RazorpayHeaders;
}

declare class Razorpay {
    static VERSION: string
    static validateWebhookSignature: typeof validateWebhookSignature

    constructor(config: IRazorpayConfig)
    api: API
    /**
     * Accounts Entity
     * @see https://razorpay.com/docs/api/partners/account-onboarding/
     */
    accounts: ReturnType<typeof accounts>
    /**
     * Customers Entity
     * @see https://razorpay.com/docs/api/customers/
     */
    customers: ReturnType<typeof customers>
    /**
     * Addons Entity
     * @see https://razorpay.com/docs/api/payments/subscriptions/#add-on
     */
    addons: ReturnType<typeof addons>
    /**
     * Plans Entity
     * @see https://razorpay.com/docs/api/payments/subscriptions/#plans
     */
    plans: ReturnType<typeof plans>
    /**
     * Orders Entity
     * @see https://razorpay.com/docs/api/orders
     */
    orders: ReturnType<typeof orders>
    /**
     * Payments Entity
     * @see https://razorpay.com/docs/api/payments
     */
    payments: ReturnType<typeof payments>
    /**
     * Transfers Entity
     * @see https://razorpay.com/docs/api/payments/route/transfers
     */
    transfers: ReturnType<typeof transfers>
    /**
     * Refunds Entity
     * @see https://razorpay.com/docs/api/refunds
     */ 
    refunds: ReturnType<typeof refunds>
    /**
     * Cards Entity
     */
    cards: ReturnType<typeof cards>
    /**
     * FundaAccount Entity
     * @see https://razorpay.com/docs/api/x/fund-accounts/
     */
    fundAccount: ReturnType<typeof fundAccount>
    /**
     * Items Entity
     * @see https://razorpay.com/docs/payments/invoices/items/api/
     */
    items: ReturnType<typeof items>
    /**
     * PaymentLinks Entity
     * @see https://razorpay.com/docs/payments/payment-links/apis
     */
    paymentLink: ReturnType<typeof paymentLink>
    /**
     * Products Entity
     * @see https://razorpay.com/docs/payments/payment-links/apis
     */
    products: ReturnType<typeof products>
    /**
     * Invoices Entity
     * @see https://razorpay.com/docs/payments/invoices/apis/
     */
    invoices: ReturnType<typeof invoices>
    /**
     * QrCode Entity
     * @see https://razorpay.com/docs/payments/qr-codes/apis/
     */
    qrCode: ReturnType<typeof qrCode>
    /**
     * Subscrptions Entity
     * @see https://razorpay.com/docs/api/payments/subscriptions/#subscriptions
     */
    subscriptions: ReturnType<typeof subscriptions>
    /**
     * Stakeholders Entity
     * @see https://razorpay.com/docs/api/partners/stakeholder#stakeholders-entity
     */
    stakeholders: ReturnType<typeof stakeholders>
    /**
     * Settlements Entity
     * @see https://razorpay.com/docs/api/settlements
     */
    settlements: ReturnType<typeof settlements>
    /**
     * VirtualAccounts Entity
     * @see https://razorpay.com/docs/api/payments/smart-collect/
     */
    virtualAccounts: ReturnType<typeof virtualAccounts>
    /**
     * Webhook Entity
     * @see https://razorpay.com/docs/api/partners/webhooks/#webhook-entity
     */
    webhooks: ReturnType<typeof webhooks>
    /**
     * Tokens Entity
     * @see https://razorpay.com/docs/payments/payment-methods/cards/token-hq/merchant-requestor-with-network-tokens/apis/#1-tokenise-cards
     */
    tokens: ReturnType<typeof tokens>
    /**
     * Iins Entity
     * @see https://razorpay.com/docs/api/payments/cards/iin-api/#iin-entity
     */
    iins: ReturnType<typeof iins>
}

export = Razorpay
