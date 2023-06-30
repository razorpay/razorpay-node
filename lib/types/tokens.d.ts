import { IMap, INormalizeError } from "./api";
import { Customers } from "./customers";
import { Invoices } from "./invoices";
import { Orders } from "./orders";
import { Payments } from "./payments";


export declare namespace Tokens {

    interface RazorpayTokenCard {
        /**
         * The maximum amount that can be auto-debited in a single charge. 
         * The minimum value is 100 (₹1 ), and the maximum value is 1500000 (₹15,000).
         */
        max_amount: number;
        /**
         * The Unix timestamp that indicates when the authorization transaction must expire. 
         * The default value is 10 years.
         */
        expire_at: number;
        /**
         * The frequency at which you can charge your customer. 
         * Currently supported frequencies are `as_presented` and `monthly`.
         */
        frequency: string
    }

    interface RazorpayTokenEmandate {
        /**
         * Emandate type used to make the authorization payment
         */
        auth_type?: 'netbanking' | 'debitcard' | 'aadhaar' | 'physical';
        /**
         * The maximum amount in paise a customer can be charged in a transaction. 
         * The value can range from `500` to `100000000`. The default value is `9999900` (₹99,999).
         */
        max_amount?: number;
        /**
         * The Unix timestamp to indicate till when you can use the token (authorization on the payment method) 
         * to charge the customer subsequent payments. The default value is 10 years for emandate. 
         */
        expire_at?: number;
        /**
         * Key-value pair that can be used to store additional information about the entity.
         * Maximum 15 key-value pairs, 256 characters (maximum) each. For example
         */
        notes?: IMap<string | number>;
        /**
         * Customer's bank account details that should be pre-filled on the checkout.
         */
        bank_account?: Orders.RazorpayBankAccountBaseRequestBody;
        /**
         * The amount, in paise, that should be auto-charged in addition to the 
         * authorization amount. For example, `100000`.
         */
        first_payment_amount?: number;
    }

    interface RazorpayTokenNach extends RazorpayTokenEmandate {
        /**
         * Additional information to be printed on the NACH form that your customer will sign.
         */
        nach: {
            /**
             * A user-entered reference that appears on the NACH form.
             */
            form_reference1: string;
            /**
             * A user-entered reference that appears on the NACH form.
             */
            form_reference2: string;
            /**
             * A user-entered description that appears on the hosted page. 
             * For example, `Form for Gaurav Kumar`.
             */
            description: string;
        }
    }

    interface RazorpayAuthorizationToken extends RazorpayTokenEmandate {
        method: string;
        currency: string;
        bank_account: RazorpayBankAccount;
        recurring_status: any;
        failure_reason: any;
        nach?: {
            create_form: boolean;
            /**
             * A user-entered reference that appears on the NACH form.
             */
            form_reference1: string;
            /**
             * A user-entered reference that appears on the NACH form.
             */
            form_reference2: string;
            /**
             * The link from where you can download the pre-filled NACH form.
             */
            prefilled_form: string;
            prefilled_form_transient: string;
            /**
             * The link where the NACH form should be uploaded once it is signed by the customer.
             */
            upload_form_url: string;
            /**
             * A user-entered description that appears on the hosted page. 
             * For example, `Form for Gaurav Kumar`.
             */
            description: string;
        }
    }

    interface RazorpayBankAccount extends Orders.RazorpayBankAccount, Orders.RazorpayBankAccountBaseRequestBody { }

    interface RazorpayTokenBaseRequestBody {
        customer_id?: string
        /**
         *  The type of object that needs to be tokenised. Currently, card is the only supported value.
         */
        method: string
        /**
         * The card details.
         */
        card: Payments.RazorpayCardBaseRequestBody
        /**
         * Token authentication details.
         */
        authentication: Authentication
        notes?: IMap<string | number> | [];
    }

    interface Authentication {
        /**
         * The platform through which authentication was processed
         */
        provider: Provider
        /**
         *  The unique payment identifier of the payment used to collect AFA on any PA/PG.
         */
        provider_reference_id: string
        /**
         * A unique reference number generated when authentication is initiated.
         */
        authentication_reference_number: string
    }

    interface RazorpayToken {
        /**
         * The unique identifier linked to an item
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: string;
        /**
         * The token is being fetched.
         */
        token: string;
        /**
         * Card issuing bank details.
         */
        bank: string | null;
        /**
         * Provides wallet information.
         */
        wallet: string | null;
        /**
         * The payment method used to make the transaction.
         */
        method: string;
        /**
         * Details related to card used to make the transaction.
         */
        card?: Payments.RazorpayCard;
        /**
         * The VPA details
         */
        vpa?: {
            /**
             * The username of the VPA holder. For example, `gaurav.kumar`.
             */
            username: string | null;
            /**
             * The VPA handle. Here it is `upi`.
             */
            handle: string | null;
            /**
             * The name of the VPA holder.
             */
            name: string | null;
        },
        bank_details?: Tokens.RazorpayBankAccount;
        /**
         * This represents whether recurring is enabled for this token or not.
         */
        recurring: boolean;
        recurring_details: {
            status: string;
            failure_reason: string | null;
        },
        /**
         * The authorization type details.
         */
        auth_type: string | null;
        /**
         * The unique identifier issued by the payment gateway during customer registration. 
         * This can be Gateway Reference Number or Gateway Token.
         */
        mrn: string | null;
        /**
         * The VPA usage timestamp
         */
        used_at: number;
        start_time: number;
        /**
         * The token creation timestamp.
         */
        created_at: number;
        /**
         * The token expiry date timestamp.
         */
        expired_at: number;
        /**
         * Indicates whether the option to change currency is enabled or not.
         */
        dcc_enabled: boolean;
        /**
         * The maximum amount that can be auto-debited in a single charge. 
         * The minimum value is 100 (₹1 ), and the maximum value is 1500000 (₹15,000).
         */
        max_amount?: number;
        /**
         * The overall status for the token.
         */
        status?: Status;
        error_code?: string;
        error_description?: string | null;
        internal_error_code?: string | null;
        source: string | null;
        notes?: IMap<string | number>;
        compliant_with_tokenisation_guidelines?: boolean;
        customer_id?: string;
        customer: Customers.RazorpayCustomer; 
        /**
         * Details of the customer's billing address.
         */
        billing_address: Invoices.RazorpayInvoiceAddress;
    }

    interface RazorpyProcessPayment {
        token_number: string
        /**
         * The token cryptogram value.
         */
        cryptogram_value: string
        /**
         * A dynamic 4-digit number printed on the front of the Amex card. This cvv should 
         * be passed in the CVV field to your PA/PG for processing the payment.
         */
        cvv: string
        /**
         * The token expiry month in `mm` format.
         */
        token_expiry_month: number
        /**
         * The token expiry year in `yyyy` format.
         */
        token_expiry_year: number
        /**
         * The details of the card
         */
        card: {
            /**
             * The card number.
             */
            number: string
            /**
             * The expiry month of the card in `mm` format.
             */
            expiry_month: string
            /**
             * The expiry year of the card in `yyyy` format.
             */
            expiry_year: number
        }
    }

    type Status = 
    | 'initiated' 
    | 'active' 
    | 'suspended' 
    | 'deactivated'

    type Provider = 
    | 'amex'
    | 'axis_migs'
    | 'cashfree'
    | 'ccavenue'
    | 'cybersource'
    | 'first_data'
    | 'fss'
    | 'hdfc'
    | 'mpgs'
    | 'paysecure'
    | 'paytm'
    | 'payu'
    | 'zakpay'
    | 'razorpay'

}

declare function tokens(api: any): {
    /**
     * Create a token
     * 
     * @param params - Check [doc](https://razorpay.com/docs/payments/payment-methods/cards/token-hq/merchant-requestor/apis/#11-create-a-token) for required params
     * 
     */
    create(params: Tokens.RazorpayTokenBaseRequestBody): Promise<Tokens.RazorpayToken>
    create(params: Tokens.RazorpayTokenBaseRequestBody, callback: (err: INormalizeError | null, data: Tokens.RazorpayToken) => void): void;
    /**
    * Fetch card properties of an existing token
    *
    * @param params - Check [doc](https://razorpay.com/docs/payments/payment-methods/cards/token-hq/merchant-requestor/apis/#12-fetch-card-properties-of-an-existing-token) for required params
    *
    */
    fetch(params: { id: string}): Promise<Tokens.RazorpayToken>
    fetch(params: { id: string}, callback: (err: INormalizeError | null, data: Tokens.RazorpayToken) => void): void;
    /**
    * Delete a token
    *
    * @param params - Check [doc](https://razorpay.com/docs/payments/payment-methods/cards/token-hq/merchant-requestor/apis/#13-delete-a-token) for required params
    * 
    */
    delete(params: { id: string}): Promise<[]>
    delete(params: { id: string}, callback: (err: INormalizeError | null, data: []) => void): void;
    /**
    * Process a payment on another PA/PG with token created on razorpay
    *
    * @param params - Check [doc](https://razorpay.com/docs/payments/payment-methods/cards/token-hq/merchant-requestor-with-network-tokens/apis/#3-process-a-payment-on-another-pa-pg) for required params
    *
    */
    processPaymentOnAlternatePAorPG(params: { id: string}): Promise<Tokens.RazorpyProcessPayment>
    processPaymentOnAlternatePAorPG(params: { id: string}, callback: (err: INormalizeError | null, data: Tokens.RazorpyProcessPayment) => void): void;
}

export default tokens