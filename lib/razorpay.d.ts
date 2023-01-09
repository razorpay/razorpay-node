import API, { IRazorpayHeaders } from './types/api'
import addons from "./types/addons"
import plans from "./types/plans"
import orders from "./types/orders"
import payments from "./types/payments"
import transfers from "./types/transfers"
import refunds from "./types/refunds"
import cards from "./types/cards"
import fundAccount from "./types/fundAccount"
import items from "./types/items"
import paymentLink from "./types/paymentLink"

interface IRazorpayConfig {
    key_id: string,
    key_secret?: string,
    headers?: IRazorpayHeaders
}

declare class Razorpay {
    static VERSION: string
    static validateWebhookSignature: boolean
    constructor(config: IRazorpayConfig)
    api: API
    addons: ReturnType<typeof addons>
    plans: ReturnType<typeof plans>
    orders: ReturnType<typeof orders>
    payments: ReturnType<typeof payments>
    transfers: ReturnType<typeof transfers>
    refunds: ReturnType<typeof refunds>
    cards: ReturnType<typeof cards>
    fundAccount: ReturnType<typeof fundAccount>
    items: ReturnType<typeof items>
    paymentLink: ReturnType<typeof paymentLink>
}

export = Razorpay
