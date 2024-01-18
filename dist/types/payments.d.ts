import { IMap, INormalizeError, RazorpayPaginationOptions, PartialOptional } from "./api";
import { Orders } from "./orders";
import { Refunds } from "./refunds"
import { Tokens } from "./tokens";
import { Transfers } from "./transfers"
import { VirtualAccounts } from "./virtualAccounts"

export declare namespace Payments {
    interface RazorpayPaymentBaseRequestBody {
        /**
         * The payment amount represented in smallest unit of the currency passed. 
         * For example, amount = 100 translates to 100 paise, that is ₹1 (default currency is INR).
         */
        amount: number | string;
        /**
         * The currency in which the customer should be charged for the item. For example, `INR`.
         */
        currency: string;
        /**
         * The unique identifier of the order
         */
        order_id: string;
        /**
         * Customer email address used for the payment.
         */
        email: string;
        /**
         * Customer contact number used for the payment.
         */
        contact: string | number;
        /**
         * Key-value pair you can use to store additional information about the entity. 
         * Maximum of 15 key-value pairs, 256 characters each.
         */
        notes: { [key: string]: string }
        /**
         * A user-entered description for the payment. 
         * For example, `Creating recurring payment for Gaurav Kumar`.
         */
        description?: string;
        /**
         * The unique identifier of the customer you want to charge.
         */
        customer_id: string;
    }

    interface RazorpayPaymentCreateRequestBody extends RazorpayPaymentBaseRequestBody { }

    interface RazorpayPaymentUpdateRequestBody extends Pick<RazorpayPaymentBaseRequestBody, "notes"> { }

    interface RazorpayRefundPaymentLinkAccountCreateRequestBody extends Pick<RazorpayPaymentBaseRequestBody, "amount"> {
        /**
         * Reverses transfer made to a linked account.Possible values.
         * `1` - Reverses transfer made to a linked account.
         * `0` - Does not reverse transfer made to a linked account.
         */
        reverse_all?: boolean | 0 | 1;
    }

    interface RazorpayPayment extends RazorpayPaymentCreateRequestBody {
        /**
         * Unique identifier of the payment.
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: 'payment';
        /**
         * The status of the payment
         */
        status: 'created' | 'authorized' | 'captured' | 'refunded' | 'failed';
        /**
         * Unique identifier of the invoice.
         */
        invoice_id: string | null;
        /**
         * Indicates whether the payment is done via an international card or a domestic one.
         */
        international: boolean;
        /**
         * The refund status of the payment.
         */
        refund_status: 'null' | 'partial' | 'full';
        /**
         * The amount refunded in smallest unit of the currency passed.
         * For example, if `amount_refunded` = 100, here 100 stands for 100 paise, 
         * which is equal to ₹1. INR is the default currency.
         */
        amount_refunded?: number;
        /**
         *  Indicates if the payment is captured.
         */
        captured: boolean;
        /**
         * The 4-character bank code which the customer's account is associated with. 
         * For example, UTIB for Axis Bank.
         */
        bank: string;
        /**
         * The unique identifier of the card used by the customer to make the payment.
         */
        card_id: string | null;
        /**
         * The name of the wallet used by the customer to make the payment. 
         * For example, `payzapp`.
         */
        wallet: string | null;
        /**
         * The customer's VPA (Virtual Payment Address) or UPI id used to make the payment. 
         * For example, `gauravkumar@exampleupi`.
         */
        vpa: string | null;
        /**
         * GST charged for the payment.
         */
        tax: number;
        /**
         * Unique identifier of the token.
         */
        token_id: string | null;
        /**
         *  Fee (including GST) charged by Razorpay.
         */
        fee: number;
        /**
         * Error that occurred during payment. For example, `BAD_REQUEST_ERROR`.
         */
        error_code: string | null;
        /**
         * The point of failure. For example, `customer`
         */
        error_source: string | null;
        /**
         * Description of the error that occurred during payment. For example, 
         * Payment processing failed because of incorrect OTP.
         */
        error_description: string | null;
        /**
         * The stage where the transaction failure occurred. 
         * The stages can vary depending on the payment method used to complete the transaction. 
         * For example, `payment_authentication`.
         */
        error_step: string | null;
        /**
         * The exact error reason. For example, `incorrect_otp`.
         */
        error_reason: string | null;
        /**
         *  A dynamic array consisting of a unique reference numbers.
         */
        acquirer_data: {
            /**
             * A unique bank reference number provided by the banking partner when a refund is processed. 
             * This reference number can be used by the customer to track the status of the refund with 
             * the bank.
             */
            rrn?: string;
            /**
             * A unique reference number generated for RuPay card payments.
             */
            authentication_reference_number?: string;
            /**
             * A unique reference number provided by the banking partner in case of netbanking payments.
             */
            bank_transaction_id?: string;
            auth_code?: string;
            upi_transaction_id?: string;
        }
        emi?: {
            issuer: string;
            type: string;
            rate: string;
            duration: string;
        };
        /**
         * Timestamp, in UNIX format, on which the payment was created.
         */
        created_at: number;
        /**
         * The payment method used to make the payment. 
         * If this parameter is not passed, customers will be able to make 
         * payments using both netbanking and UPI payment methods
         */
        method: string;
        token?: Tokens.RazorpayToken;
        offers: {
            entity: string;
            count: number;
            items: { id: string }[]

        }
        card?: RazorpayCard;
    }

    interface RazorpayCardBaseRequestBody {
        /**
         * Unformatted card number.
         */
        number: string;
        /**
         * Name of the cardholder.
         */
        name: string;
        /**
         * Expiry month for card in MM format.
         */
        expiry_month: string | number;
        /**
         * Expiry year for card in YY format.
         */
        expiry_year: string | number;
        /**
         * CVV printed on the back of card.
         */
        cvv: string | number;
        /**
         * The cryptogram value for the token.
         */
        cryptogram_value?: string;
        /**
         * Indicates if the payment is made using tokenised card or actual card. Possible values are `true` or `false`
         */
        tokenised?: boolean;
        /**
         * The name of the aggregator that provided the token
         */
        token_provider?: string;
        /**
         * The last 4 digits of the tokenised card.
         */
        last4?: string;
    }

    interface RazorpayCardCreateRequest extends RazorpayCardBaseRequestBody { }

    interface RazorpayCard extends RazorpayCardCreateRequest {
        /**
         * The unique identifier of the card used by the customer to make the payment.
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: string;
        /**
         * The last 4 digits of the card number.
         */
        last4: string;
        /**
         * The card network.
         */
        network:
        | "American Express"
        | "Diners Club"
        | "Maestro"
        | "MasterCard"
        | "RuPay"
        | "Unknown"
        | "Visa";
        /**
         * The card type.
         */
        type: "credit" | "debit" | "prepaid" | "unknown";
        /**
         * The card issuer. The 4-character code denotes the issuing bank.
         */
        issuer: string;
        /**
         * This attribute is set to `true` if the card can be used for EMI payment method.
         */
        emi: boolean;
        /**
         * The sub-type of the customer's card. 
         */
        sub_type: 'customer' | 'business';
        token_iin: string | null;
        /**
         * The transaction flow details.
         */
        flows: {
            otp?: boolean;
            recurring: boolean;
        }
        international: boolean;
        cobranding_partner?: string | null
    }

    interface RazorpayPaymentDowntime {
        /**
         * Unique identifier of the downtime's occurrence.
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: string;
        /**
         * The payment method that is experiencing the downtime. Possible values include:
         * `card`, `netbanking`, `wallet`, `upi`
         */
        method: string;
        /**
         * Timestamp (in Unix) that indicates the start of the downtime. 
         * Applicable for both scheduled and unscheduled downtimes.
         */
        begin: number | null;
        /**
         * Timestamp (in Unix) that indicates the end of the downtime.
         * Available only for scheduled downtimes, where the end-time is known. 
         * Set to null when the end-time in unknown, possibly during unscheduled downtimes.
         */
        end: number | null;
        /**
         * Status of the downtime.
         */
        status: 'scheduled' | 'started' | 'resolved' | 'cancelled';
        /**
         * `true` - This is a scheduled downtime by the issuer, 
         * network, or the bank, which was informed to Razorpay.
         * `false` - This is an unscheduled downtime.
         */
        scheduled: boolean;
        /**
         * Severity of the downtime.
         */
        severity: 'high' | 'medium' | 'low';
        /**
         * Payment method that is under performing.
         */
        instrument: RazorpayPaymentDowntimeInstrument
        /**
         * Timestamp (in Unix) that indicates the time at which the 
         * downtime was recorded in Razorpay servers.
         */
        created_at: number;
        /**
         * Timestamp (in Unix) that indicates the time at which the 
         * downtime record was updated in Razorpay servers.
         */
        updated_at: number;
    }

    interface RazorpayPaymentDowntimeInstrument {
        /**
         * Bank code of the affected bank.
         */
        bank?: string;
        /**
         * Code of the affected Payment Service Provider (PSP). 
         * This is populated only when VPA handles associated with the PSP are down. 
         * If a PSP is associated with multiple VPA handles,
         * it is marked down only when all the handles associated with it are down. 
         * For example, `google_pay` is marked down only when all Google Pay handles
         * `oksbi`, `okhdfcbank`, `okicici` and `okaxis` are down.
         */
        psp?: 'google_pay' | 'phonepe' | 'paytm' | 'bhim';
        /**
         * Affected VPA handle. For example, `@oksbi`. To learn about the possible values, 
         * refer to the [list of handles supported by NPCI](https://www.npci.org.in/what-we-do/upi/3rd-party-apps). 
         * If the entire UPI system is experiencing a downtime, the value `ALL` is displayed.
         */
        vpa_handle?: string;
        /**
         * Affected wallet code.
         */
        wallet?: string;
    }

    interface RazorpayRecurringPaymentCreateRequestBody extends Payments.RazorpayPaymentBaseRequestBody {
        /**
         * he `token_id` generated when the customer successfully completes the authorization payment. 
         * Different payment instruments for the same customer have different `token_id`.
         */
        token: string;
        /**
         * Determines whether recurring payment is enabled or not.
         */
        recurring: boolean | 1 | 0 | string;
    }

    interface RazorpayPaymentThirdPartyCreateRequestBody extends Omit<RazorpayPaymentBaseRequestBody, 'customer_id' | 'notes' | 'description'> {
        /**
         * The customer's bank code. For example, `HDFC`.
         */
        bank?: string;
        /**
         * The payment method that is experiencing the downtime. Possible values include:
         * `card`, `netbanking`, `wallet`, `upi`
         */
        method: string;
    }

    interface RazorpayPaymentUpiCreateRequestBody extends PartialOptional<RazorpayPaymentBaseRequestBody, 'customer_id'> {
        method: string;
        /**
         * Specifies if the VPA should be stored as tokens.
         * `1` Saves the VPA details.
         * `0`(default) - Does not save the VPA details.
         */
        save?: boolean | 1 | 0;
        /**
         * The customer's IP address.
         */
        ip: string;
        /**
         * URL where Razorpay will submit the final payment status.
         */
        callback_url?: string;
        /**
         * Value of referer header passed by the client's browser. 
         * For example,`https://example.com/`
         */
        referer: string;
        /**
         * Value of `user_agent` header passed by the client's browser.
         * For example, 
         * Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) 
         * Chrome/79.0.3945.130 Safari/537.36
         */
        user_agent: string;
        /**
         * Details of the expiry of the UPI link
         */
        upi: {
            /**
             * Specify the type of the UPI payment flow.
             * Possible values: `collect` (default), `intent`
             */
            flow: string;
            vpa?: string;
            /**
             * Period of time (in minutes) after which the link will expire. 
             * The default value is 5.
             */
            expiry_time?: number;
        }
    }

    interface RazorpayPaymentQuery extends RazorpayPaginationOptions {
        'expand[]'?: string;
    }

    interface RazorpayCardS2SMethod extends RazorpayCardBaseRequestBody {
        /**
         * Details of the authentication channel.
         */
        authentication?: {
            /**
             * The authentication channel for the payment.
             */
            authentication_channel: 'browser' | 'app'
        }
        /**
         * Information regarding the customer's browser. 
         * This parameter need not be passed when `authentication_channel=app`.
         */
        browser?: {
            /**
             * Indicates whether the customer's browser supports Java. 
             * Obtained from the `navigator` HTML DOM object.
             */
            java_enabled: boolean;
            /**
             * ndicates whether the customer's browser is able to execute JavaScript.
             * Obtained from the `navigator` HTML DOM object.
             */
            javascript_enabled: boolean;
            /**
             * Time difference between UTC time and the cardholder browser local time. 
             * Obtained from the `getTimezoneOffset()` method applied to Date object.
             */
            timezone_offset: number;
            /**
             * Total width of the payer's screen in pixels. 
             * Obtained from the `screen.width` HTML DOM property.
             */
            screen_width: number;
            /**
             * Obtained from the `navigator` HTML DOM object.
             */
            screen_height: number;
            /**
             * Obtained from payer's browser using 
             * the `screen.colorDepth` HTML DOM property.
             */
            color_depth: string;
            /**
             * Obtained from payer's browser using the navigator.
             * language HTML DOM property. Maximum limit of 8 characters.
             */
            language: string;
        }
    }

    interface RazorpayPaymentS2SCreateRequestBody extends RazorpayPaymentBaseRequestBody {
        save:boolean | number;
        /**
         *  Pass the unique token id created when the customer made the first payment.
         */
        token?:string;
        /**
         * Pass the sub-merchant's unique identifier.
         */
        account_id?: string;
        card: Partial<RazorpayCardS2SMethod>;
        /**
         * The customer's IP address.
         */
        ip: string;
        /**
         * Referrer header passed by the client's browser.
         */
        referer?: string;
        /**
         * The User-Agent header of the user's browser. 
         * Default value will be passed by Razorpay if not provided by merchant.
         */
        user_agent: string | null;
    }

    interface RazorpayPaymentS2SJson {
        /**
         * Unique identifier of the payment. Present for all responses.
         */
        razorpay_payment_id: string;
        /**
         * A list of action objects available to you to continue the payment process. 
         * Present when the payment requires further processing.
         */
        next: [
            {
                [key: string]: string
            }
        ];
        metadata?: {
            [key: string]: string
        }
    }

    interface RazorpayPaymentDetails {
        id: string;
        entity: string;
        payment_id: string;
        mode: string;
        bank_reference: string;
        amount: number | string;
        payer_bank_account: RazorpayBankAccount;
        virtual_account_id: string;
        virtual_account: VirtualAccounts.RazorpayVirtualAccount;
    }

    interface RazorpayBankAccount extends Orders.RazorpayBankAccount {
        id: string;
        entity: string;
    }

}

declare function payments(api: any): {
    /**
    * Get all payments
    *
    * @param params
    *
    */
    all(params?: Payments.RazorpayPaymentQuery): Promise<{
        entity: string;
        count: number;
        items: Array<Payments.RazorpayPayment>;
    }>
    all(params: Payments.RazorpayPaymentQuery, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Payments.RazorpayPayment>
    }) => void): void
    /**
    * Fetch a payment
    *
    * @param paymentId - The unique identifier of the payment.
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/#fetch-a-payment) for required params
    *
    */
    fetch(paymentId: string, params?: { 'expand[]': 'card' | 'emi' | 'offers' }): Promise<Payments.RazorpayPayment>
    fetch(paymentId: string, params: { 'expand[]': 'card' | 'emi' | 'offers' }, callback: (err: INormalizeError | null, data: Payments.RazorpayPayment) => void): void
    /**
    * Capture payment
    *
    * @param paymentId - The unique identifier of the payment.
    * @param amount - The amount to be captured (should be equal to the authorised amount, 
    * in the smallest unit of the chosen currency).
    * @param currency - ISO code of the currency in which the payment was made.
    *
    */
    capture(paymentId: string, amount: number | string, currency: string): Promise<Payments.RazorpayPayment>
    capture(paymentId: string, amount: number | string, currency: string, callback: (err: INormalizeError | null, data: Payments.RazorpayPayment) => void): void
    /**
    * Edit a payment given Payment ID
    *
    * @param paymentId - The unique identifier of the payment. 
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/#update-the-payment) for required params
    * 
    */
    edit(paymentId: string, params: { notes: IMap<string | number> }): Promise<Payments.RazorpayPayment>
    edit(paymentId: string, params: { notes: IMap<string | number> }, callback: (err: INormalizeError | null, data: Payments.RazorpayPayment) => void): void
    /**
    * Create payment json
    *
    * @param params - Check [doc](https://razorpay.com/docs/payments/payment-gateway/s2s-integration/json/v2/build-integration/cards/#12-create-a-payment) for required params
    * 
    */
    createPaymentJson(params: Payments.RazorpayPaymentS2SCreateRequestBody | Payments.RazorpayPaymentThirdPartyCreateRequestBody): Promise<Payments.RazorpayPaymentS2SJson>
    createPaymentJson(params: Payments.RazorpayPaymentS2SCreateRequestBody | Payments.RazorpayPaymentThirdPartyCreateRequestBody, callback: (err: INormalizeError | null, data: Payments.RazorpayPaymentS2SJson) => void): void
    /**
    * Create a recurring payment
    *
    * @param params
    * @link https://razorpay.com/docs/api/payments/recurring-payments/emandate/create-subsequent-payments#32-create-a-recurring-payment
    * @link https://razorpay.com/docs/api/payments/recurring-payments/cards/create-subsequent-payments#32-create-a-recurring-payment
    * @link https://razorpay.com/docs/api/payments/recurring-payments/paper-nach/create-subsequent-payments#32-create-a-recurring-payment
    * @link https://razorpay.com/docs/api/payments/recurring-payments/upi/create-subsequent-payments#32-create-a-recurring-payment
    * 
    */
    createRecurringPayment(params: Payments.RazorpayRecurringPaymentCreateRequestBody): Promise<{
        razorpay_payment_id?: string;
        razorpay_order_id?: string;
        razorpay_signature?: string;
    }>
    createRecurringPayment(params: Payments.RazorpayRecurringPaymentCreateRequestBody, callback: (err: INormalizeError | null, data: {
        razorpay_payment_id?: string;
        razorpay_order_id?: string;
        razorpay_signature?: string;
    }) => void): void
    /**
    * Generate otp
    *
    * @param paymentId - The unique identifier of the payment.
    * 
    */
    otpGenerate(paymentId: string): Promise<Payments.RazorpayPaymentS2SJson>
    otpGenerate(paymentId: string, callback: (err: INormalizeError | null, data: Payments.RazorpayPaymentS2SJson) => void): void
    /**
    * Otp submit
    *
    * @param paymentId - The unique identifier of the payment.
    * @param params - Check [doc](https://razorpay.com/docs/payments/payment-gateway/s2s-integration/json/v2/build-integration/cards/#response-on-submitting-otp) for required params
    *
    */
    otpSubmit(paymentId: string, params: { otp: string }): Promise<{
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
    }>
    otpGenerate(paymentId: string, params: { otp: string }, callback: (err: INormalizeError | null, data: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
    }) => void): void
    /**
    * OTP Resend
    *
    * @param paymentId - The unique identifier of the payment.
    *
    */
    otpResend(paymentId: string): Promise<{
        "next": string[];
        "razorpay_payment_id": string;
    }>
    otpResend(paymentId: string, callback: (err: INormalizeError | null, data: {
        "next": string[];
        "razorpay_payment_id": string;
    }) => void): void
    /** 
    * Create Payment UPI s2s / VPA token (Third party validation)
    *
    * @param params
    * @link https://razorpay.com/docs/payments/third-party-validation/s2s-integration/upi/collect#step-14-initiate-a-payment
    * @link https://razorpay.com/docs/payments/third-party-validation/s2s-integration/upi/intent/#step-2-initiate-a-payment
    *
    */
    createUpi(params: Payments.RazorpayPaymentUpiCreateRequestBody): Promise<{ razorpay_payment_id: string; link?: string; }>
    createUpi(params: Payments.RazorpayPaymentUpiCreateRequestBody, callback: (err: INormalizeError | null, data: {
        razorpay_payment_id: string;
        link?: string
    }) => void): void
    /** 
    * Validate vpa
    *
    * @param params - Check [doc](https://razorpay.com/docs/payments/third-party-validation/s2s-integration/upi/collect#step-13-validate-the-vpa) for required params
    *
    */
    validateVpa(params: { vpa: string }): Promise<{
        vpa: string;
        success: boolean;
        customer_name: string;
    }>
    validateVpa(params: { vpa: string }, callback: (err: INormalizeError | null, data: {
        vpa: string;
        success: boolean;
        customer_name: string;
    }) => void): void
    /** 
    * Fetch payment methods
    * 
    * @link https://razorpay.com/docs/payments/third-party-validation/s2s-integration/methods-api/#fetch-payment-methods
    * 
    */
    fetchPaymentMethods(): Promise<{ [key: string]: string }>
    fetchPaymentMethods(callback: (err: INormalizeError | null, data: {
        [key: string]: string;
    }) => void): void
    /** 
    * Create a normal/instant instant refund.
    * 
    * Refund payments and reverse transfer from a linked account
    *
    * @param paymentId - The unique identifier of the payment. 
    * @param params - Check [doc](https://razorpay.com/docs/api/refunds/#create-a-normal-refund) for required params
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/route/transfers#refund-payments-and-reverse-transfer-from-a-linked) for required params
    */
    refund(paymentId: string, params: Payments.RazorpayRefundPaymentLinkAccountCreateRequestBody | Refunds.RazorpayRefundCreateRequestBody): Promise<Refunds.RazorpayRefund>
    refund(paymentId: string, params: Payments.RazorpayRefundPaymentLinkAccountCreateRequestBody | Refunds.RazorpayRefundCreateRequestBody, callback: (err: INormalizeError | null, data: Refunds.RazorpayRefund) => void): void
    /** 
    * Fetch multiple refunds for a payment
    *
    * @param paymentId - The unique identifier of the payment. 
    * @param params - Check [doc](https://razorpay.com/docs/api/refunds/#fetch-multiple-refunds-for-a-payment) for required params
    *
    */
    fetchMultipleRefund(paymentId: string, params?: RazorpayPaginationOptions): Promise<{
        entity: string;
        count: number;
        items: Array<Refunds.RazorpayRefund>;
    }>
    fetchMultipleRefund(paymentId: string, params: RazorpayPaginationOptions, callback: (err: INormalizeError | null, data: {
        entity: string;
        count: number;
        items: Array<Refunds.RazorpayRefund>;
    }) => void): void

    /** 
    * Fetch a specific refund for a payment
    *
    * @param paymentId - The unique identifier of the payment.
    * @param refundId - The unique identifier of the refund.
    *
    */
    fetchRefund(paymentId: string, refundId: string): Promise<Refunds.RazorpayRefund>
    fetchRefund(paymentId: string, refundId: string, callback: (err: INormalizeError | null, data: Refunds.RazorpayRefund) => void): void
    /**
    * Fetch transfers for a payment
    *
    * @param paymentId - The unique identifier of the payment.
    *
    */
    fetchTransfer(paymentId: string): Promise<{
        entity: string;
        count: number;
        items: Array<Transfers.RazorpayTransfer>;
    }>
    fetchTransfer(paymentId: string, callback: (err: INormalizeError | null, data: {
        entity: string;
        count: number;
        items: Array<Transfers.RazorpayTransfer>;
    }) => void): void

    /**
    * Create transfers from payment
    *
    * @param paymentId - The unique identifier of the payment.
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/route/transfers/#create-transfers-from-payments) for required params
    * 
    */
    transfer(paymentId: string, params: { transfers: Transfers.RazorpayPaymentCreateRequestBody[] }): Promise<{
        entity: string;
        count: number;
        items: Array<Transfers.RazorpayTransfer>;
    }>
    transfer(paymentId: string, params: { transfers: Transfers.RazorpayPaymentCreateRequestBody[] }, callback: (err: INormalizeError | null, data: {
        entity: string;
        count: number;
        items: Array<Transfers.RazorpayTransfer>;
    }) => void): void
    /**
    * Fetch payment details using id and transfer method
    *
    * @param paymentId - The unique identifier of the payment. 
    * 
    */
    bankTransfer(paymentId: string): Promise<Payments.RazorpayPaymentDetails>
    bankTransfer(paymentId: string, callback: (err: INormalizeError | null, data: Payments.RazorpayPaymentDetails) => void): void
    /**
    * Fetch card details with paymentId
    *
    * @param paymentId - The unique identifier of the payment.
    * 
    */
    fetchCardDetails(paymentId: string): Promise<Payments.RazorpayCard>
    fetchCardDetails(paymentId: string, callback: (err: INormalizeError | null, data: Payments.RazorpayCard) => void): void
    /**
    * Fetch Payment Downtime Details
    */
    fetchPaymentDowntime(): Promise<{
        entity: string;
        count: number;
        items: Array<Payments.RazorpayPaymentDowntime>
    }>
    fetchPaymentDowntime(callback: (err: INormalizeError | null, data: {
        entity: string;
        count: number;
        items: Array<Payments.RazorpayPaymentDowntime>
    }) => void): void
    /**
    * Fetch Payment Downtime
    *
    * @param downtimeId - The unique identifier of the payment.
    * 
    */
    fetchPaymentDowntimeById(downtimeId: string): Promise<Payments.RazorpayPaymentDowntime>
    fetchPaymentDowntimeById(downtimeId: string, callback: (err: INormalizeError | null, data: Payments.RazorpayPaymentDowntime) => void): void
}

export default payments