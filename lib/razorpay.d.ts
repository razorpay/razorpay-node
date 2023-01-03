import API,{IRazorpayHeaders} from './types/api'
import addons from "./types/addons"
import plans from "./types/plan"

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
    plans: ReturnType<typeof plans>
}

export = Razorpay
