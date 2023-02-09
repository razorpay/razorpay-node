export interface RazorpayWebhook {
    /**
     * Payment ID of the successful payment.
     */
    payment_id: string;
}

export interface RazorpayVerifyPayment extends RazorpayWebhook {
    /**
     * The id of the order to be fetched
     */
    order_id: string;
}

export interface RazorpayVerifySubscription extends RazorpayWebhook {
    /**
     * The id of the subscription to be fetched
     */
    subscription_id: string;
}

export interface RazorpayVerifyPaymentLink extends RazorpayWebhook {
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

export function getDateInSecs(date: string): number

export function normalizeDate(date: number | string): number

export function isNumber(num: any): boolean

export function isNonNullObject(input: Object | undefined): boolean

export function normalizeBoolean(bool: boolean | undefined): 1 | 0

export function isDefined(value: any): boolean

export function normalizeNotes(notes: Object): Object

export function getTestError(summary: string, expectedVal: string, gotVal: string): Error

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
export function validatePaymentVerification(payload: RazorpayVerifyPayment | RazorpayVerifySubscription | RazorpayVerifyPaymentLink, signature: string, secret: string): boolean

/**
* given an object , returns prettified string
*
* @param val
*/
export function prettify(val: Object): string