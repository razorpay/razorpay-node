import API, { RazorpayHeaders } from './types/api'
import addons from "./types/addons"
import plans from "./types/plans"
import items from "./types/items"
import fundAccount from "./types/fundAccount"
import invoices from "./types/invoices"
import settlements from './types/settlements'

import { validateWebhookSignature } from "./utils/razorpay-utils"

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
    customers: any
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
    orders: any
    /**
     * Orders Entity
     * @see https://razorpay.com/docs/api/payments
     */
    payments: any
    /**
     * Payments Entity
     * @see https://razorpay.com/docs/api/payments/route/transfers
     */
    transfers: any
    /**
     * Transfers Entity
     * @see https://razorpay.com/docs/api/refunds
     */
    refunds: any
    /**
     * Cards Entity
     */
    cards: any
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
    paymentLink: any
    /**
     * Invoices Entity
     * @see https://razorpay.com/docs/payments/invoices/apis/
     */
    invoices: ReturnType<typeof invoices>
    /**
     * QrCode Entity
     * @see https://razorpay.com/docs/payments/qr-codes/apis/
     */
    qrCode: any
    /**
     * Subscrptions Entity
     * @see https://razorpay.com/docs/api/payments/subscriptions/#subscriptions
     */
    subscriptions: any
    /**
     * Settlements Entity
     * @see https://razorpay.com/docs/api/settlements
     */
    settlements: ReturnType<typeof settlements>
    /**
     * VirtualAccounts Entity
     * @see https://razorpay.com/docs/api/payments/smart-collect/
     */
    virtualAccounts: any
}

export = Razorpay
