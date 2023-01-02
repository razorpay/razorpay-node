import Plans from "./types/plan"
import API,{IRazorpayHeaders} from './types/api'
import addons from "./types/addons"

interface IRazorpayConfig {
    key_id: string,
    key_secret?: string,
    headers?: IRazorpayHeaders
}

declare class Razorpay {
    static VERSION:string
    static validateWebhookSignature:boolean
    constructor(config: IRazorpayConfig)
    api: API
    addons: ReturnType<typeof addons>
    plans: Plans
}

export = Razorpay
