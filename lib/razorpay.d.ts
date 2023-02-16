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
     * Orders Entity
     * @see https://razorpay.com/docs/api/payments
     */
    payments: ReturnType<typeof payments>
    /**
     * Payments Entity
     * @see https://razorpay.com/docs/api/payments/route/transfers
     */
    transfers: ReturnType<typeof transfers>
    /**
     * Transfers Entity
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
     * Settlements Entity
     * @see https://razorpay.com/docs/api/settlements
     */
    settlements: ReturnType<typeof settlements>
    /**
     * VirtualAccounts Entity
     * @see https://razorpay.com/docs/api/payments/smart-collect/
     */
    virtualAccounts: ReturnType<typeof virtualAccounts>
}

export = Razorpay
