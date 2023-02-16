import { IMap } from "./api";
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

    interface RazorpayTokenNach extends RazorpayTokenEmandate{
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

    interface RazorpayBankAccount extends Orders.RazorpayBankAccount, Orders.RazorpayBankAccountBaseRequestBody {}

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
        status?:string;
        error_description?: string | null;
        internal_error_code?: string | null;
        source: string | null;
        notes?: IMap<string | number>;
        compliant_with_tokenisation_guidelines?: boolean;
        /**
         * Details of the customer's billing address.
         */
        billing_address: Invoices.RazorpayInvoiceAddress;
    }
    
}