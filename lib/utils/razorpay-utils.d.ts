export interface IRazorpayWebhook {
    /**
     * Payment ID of the successful payment.
     */
    payment_id: string;
}

export interface IRazorpayVerifyPayment extends IRazorpayWebhook {
    /**
     * The id of the order to be fetched
     */
    order_id: string;
}

export interface IRazorpayVerifySubscription extends IRazorpayWebhook {
    /**
     * The id of the subscription to be fetched
     */
    subscription_id: string;
}

export interface IRazorpayVerifyPaymentLink extends IRazorpayWebhook {
    /**
     * Payment Link ID generated at the time of link creation.
     */
    payment_link_id: string;
    /**
     * Internal order ID set by you for business reference using the `reference_id` 
     * parameter at the time of link creation. No value is returned if `reference_id` 
     * parameter was not used.
     */
    payment_link_reference_id: string;
    /**
     * Current status of the link.
     */
    payment_link_status: string;
}

/**
* Verify webhook verification
*
* @param body 
* raw webhook request body
* @param signature  
* The hash signature is calculated using HMAC with SHA256 algorithm; with your webhook 
* secret set as the key and the webhook request body as the message.
* @param secret
* your webhook secret
*
*/
export function validateWebhookSignature(body: string, signature: string, secret: string): boolean

/**
*  Payment verfication
*
* @param payload
* Check [doc](https://github.com/razorpay/razorpay-node/blob/master/documents/paymentVerfication.md) for required params
* @param signature
* The hash signature is calculated using HMAC with SHA256 algorithm; with your webhook 
* secret set as the key and the webhook request body as the message.
* @param secret
* your webhook secret
*
*/
export function validatePaymentVerification(payload: IRazorpayVerifyPayment | IRazorpayVerifySubscription | IRazorpayVerifyPaymentLink, signature: string, secret: string): boolean

/**
* given an object , returns prettified string
*
* @param val
*/
export function prettify(val: Object): string