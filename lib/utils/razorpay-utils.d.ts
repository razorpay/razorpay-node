export interface IRazorpayWebhook {
    payment_id: string;
}

export interface IRazorpayVerifyPayment extends IRazorpayWebhook {
    order_id: string;
}

export interface IRazorpayVerifySubscription extends IRazorpayWebhook {
    subscription_id: string;
}

export interface IRazorpayVerifyPaymentLink extends IRazorpayWebhook {
    payment_link_id: string;
    payment_link_reference_id: string;
    payment_link_status: string;
}

/**
* Verify webhook verification
*
* @param {string} body 
* raw webhook request body
* @param {string} signature  
* The hash signature is calculated using HMAC with SHA256 algorithm; with your webhook 
* secret set as the key and the webhook request body as the message.
* @param {string} secret
* your webhook secret
*
*/
export function validateWebhookSignature(body: string, signature: string, secret: string): boolean

/**
*  Payment verfication
*
* @param {object} payload
* Check [doc](https://github.com/razorpay/razorpay-node/blob/master/documents/paymentVerfication.md) for required params
* @param {string} signature
* The hash signature is calculated using HMAC with SHA256 algorithm; with your webhook 
* secret set as the key and the webhook request body as the message.
* @param {string} secret
* your webhook secret
*
*/
export function validatePaymentVerification(payload: IRazorpayVerifyPayment, signature: string, secret: string): boolean
export function validatePaymentVerification(payload: IRazorpayVerifySubscription, signature: string, secret: string): boolean
export function validatePaymentVerification(payload: IRazorpayVerifyPaymentLink, signature: string, secret: string): boolean


/**
* given an object , returns prettified string
*
* @param {Object} val
* @return {string}
*/
export function prettify(val: Object): string