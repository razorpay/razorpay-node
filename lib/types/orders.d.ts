import { IMap, RazorpayPaginationOptions, INormalizeError } from './api'
import { FundAccounts } from './fundAccount'
import { Payments } from './payments'
import { Tokens } from './tokens'
import { Transfers } from './transfers'

export declare namespace Orders {

    interface RazorpayOrderBankDetailsBaseRequestBody {
        /**
         * The bank account number from which the customer should make the payment. 
         * For example, `765432123456789`
         */
        account_number: string | number;
        /**
         * The bank IFSC. For example, `HDFC0000053`
         */
        ifsc: string;
    }

    interface RazorpayOrderBankDetailsCreateRequestBody extends RazorpayOrderBankDetailsBaseRequestBody {
        /**
         *  The name linked to the bank account. For example, Gaurav Kumar.
         */
        name: string;
    }


    interface RazorpayOrderBaseRequestBody {
        /**
         * The amount for which the order was created, in currency subunits. 
         * For example, for an amount of ₹295, enter 29500
         */
        amount: number | string;
        /**
         * ISO code for the currency in which you want to accept the payment.
         */
        currency: string;
        /**
         * Receipt number that corresponds to this order, set for your internal reference. 
         * Can have a maximum length of 40 characters and has to be unique.
         */
        receipt?: string;
        /**
         * The unique identifier of the offer that is linked to the Subscription. 
         * You can obtain this from the Dashboard.
         * For example, `offer_JHD834hjbxzhd38d`
         */
        offer_id?: string | null;
        /**
         * The payment method used to make the payment. If this parameter is not passed,
         * customers will be able to make payments using both netbanking and UPI payment methods
         */
        method?: 'netbanking' | 'upi' | 'card' | 'emandate' | 'nach';
        /**
         * Details of the bank account that the customer has provided at the time of registration.
         */
        bank_account?: RazorpayOrderBankDetailsCreateRequestBody;
        /**
         * Key-value pair that can be used to store additional information about the entity.
         * Maximum 15 key-value pairs, 256 characters (maximum) each.
         */
        notes?: IMap<string | number>;
        /**
         * Indicates whether the customer can make a partial payment. Possible values:
         * `true` The customer can make partial payments.
         * `false` (default) : The customer cannot make partial payments.
         */
        partial_payment?: boolean;
        /**
         * Minimum amount that must be paid by the customer as the first partial payment. 
         * For example, if an amount of ₹7,000 is to be received from the customer in 
         * two installments of #1 - ₹5,000, #2 - ₹2,000, then you can set this value as 500000. 
         * This parameter should be passed only if partial_payment is true.
         */
        first_payment_min_amount?: number;
        /**
         * Payment capture settings for the payment. The options sent here override the account 
         * level [auto-capture settings]( https://razorpay.com/docs/payments/payments/capture-settings) configured using the Dashboard.
         */
        payment?: RazorpayCapturePayment;
    }

    interface RazorpayOrderCreateRequestBody extends RazorpayOrderBaseRequestBody { }

    interface RazorpayTransferCreateRequestBody extends Pick<RazorpayOrderBaseRequestBody, 'amount' | 'currency'> {
        /**
         * Details regarding the transfer.
         */
        transfers: Transfers.RazorpayOrderCreateRequestBody[];
    }

    interface RazorpayAuthorizationCreateRequestBody extends Omit<RazorpayOrderBaseRequestBody, 'offer_id' | 'bank_account' | 'partial_payment' | 'first_payment_min_amount'> {
        /**
         * Determines whether tha payment status should be changed to captured automatically or not.
         * `true`: Payments are captured automatically.
         * `false`: Payments are not captured automatically.
         */
        payment_capture?: boolean;
        /**
         * The unique identifier of the customer.
         */
        customer_id: string;
        /**
         * Details related to the authorization such as max amount, 
         * frequency and expiry information.
         */
        token: Tokens.RazorpayTokenCard | Tokens.RazorpayTokenEmandate | Tokens.RazorpayTokenNach;
    }

    interface RazorpayOrderUpdateRequestBody extends Pick<RazorpayOrderBaseRequestBody, "notes"> { }

    interface RazorpayOrder extends Omit<RazorpayOrderBaseRequestBody, 'transfers' | 'payment'> {
        /**
         * The unique identifier of the order
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: string;
        /**
         * The amount paid against the order.
         */
        amount_paid: number;
        /**
         * The amount pending against the order.
         */
        amount_due: number,
        /**
         * The status of the order.
         */
        status: 'created' | 'attempted' | 'paid';
        /**
         * The number of payment attempts, successful and failed, 
         * that have been made against this order.
         */
        attempts: number;
        /**
         * Indicates the Unix timestamp when this order was created.
         */
        created_at: number;
        /**
         * A description that appears on the hosted page. 
         * For example, `12:30 p.m. Thali meals (Gaurav Kumar)`.
         */
        description: string;
        /**
         * Details related to the authorization such as max amount, 
         * frequency and expiry information.
         */
        token: Tokens.RazorpayAuthorizationToken;
        payments?: { [key:string] : string };
        offers?: { [key:string] : string };
        transfers?: {entity: string; count: string; items: Transfers.RazorpayTransfer[] } | Transfers.RazorpayTransfer[];
    }

    interface RazorpayOrderQuery extends RazorpayPaginationOptions {
        /**
         * Possible values:
         * `1` : Retrieves Orders for which payments have been authorized. Payment and order states differ.
         * `0` : Retrieves orders for which payments have not been authorized.
         */
        authorized?: boolean | 1 | 0;
        /**
         * Retrieves the orders that contain the provided value for receipt.
         */
        receipt?: string;
        /**
         * Used to retrieve additional information about the payment. 
         * Using this parameter will cause a sub-entity to be added to the response.
         */
        'expand[]'?: 'payments' | 'payments.card' | 'transfers' | 'virtual_account';
    }

    interface RazorpayBankAccountBaseRequestBody {
        /**
         * Name of the beneficiary.
         */
        beneficiary_name: string;
        beneficiary_mobile?: string;
        /**
         * Customer's bank account number.
         */
        account_number: string | number;
        /**
         * Customer's bank account type. `savings`(default)
         */
        account_type: 'savings' | 'current';
        /**
         * Customer's bank IFSC. For example `UTIB0000001`.
         */
        ifsc_code: string;
    }

    interface RazorpayBankAccount extends Omit<FundAccounts.RazorpayBankAccount, 'notes'> {
        beneficiary_email: string;
    }
    
    interface RazorpayCapturePayment {
        /**
         * Option to automatically capture payment
         */
        capture: 'automatic' | 'manual';
        capture_options?: {
            /**
             * Time in minutes till when payments in the `authorized` 
             * state should be auto-captured. Minimum value `12` minutes. 
             * This parameter is mandatory only if the value of `capture` 
             * parameter is `automatic`.
             */
            automatic_expiry_period: number;
            /**
             * Time in minutes till when you can manually 
             * capture payments in the `authorized` state.
             */
            manual_expiry_period: number;
            /**
             * Refund speed for payments that were not 
             * captured (automatically or manually).
             */
            refund_speed: 'optimum' | 'normal';
        }
    }
}

declare function orders(api: any): {
    /**
     * Creates a order
     * 
     * @param params - Check [doc](https://razorpay.com/docs/api/orders/#create-an-order) for required params
     * @see https://razorpay.com/docs/api/payments/recurring-payments/
     */
    create(params: Orders.RazorpayOrderCreateRequestBody | Orders.RazorpayTransferCreateRequestBody | Orders.RazorpayAuthorizationCreateRequestBody): Promise<Orders.RazorpayOrder>
    create(params: Orders.RazorpayOrderCreateRequestBody | Orders.RazorpayTransferCreateRequestBody | Orders.RazorpayAuthorizationCreateRequestBody, callback: (err: INormalizeError | null, data: Orders.RazorpayOrder) => void): void;
    /**
    * Get all orders
    *
    * @param params
    *
    */
    all(params?: Orders.RazorpayOrderQuery): Promise<{
        entity: string;
        count: number;
        items: Array<Orders.RazorpayOrder>;
    }>
    all(params: Orders.RazorpayOrderQuery, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Orders.RazorpayOrder>
    }) => void): void
    /**
    * Fetches a order given Order ID
    *
    * @param orderId - The unique identifier of the order 
    *
    */
    fetch(orderId: string): Promise<Orders.RazorpayOrder>
    fetch(orderId: string, callback: (err: INormalizeError | null, data: Orders.RazorpayOrder) => void): void
    /**
    * Edit a order given Order ID
    *
    * @param orderId - The unique identifier of the order
    * @param params - Check [doc](https://razorpay.com/docs/api/orders/#update-order) for required params
    * 
    */
    edit(orderId: string, params: Orders.RazorpayOrderUpdateRequestBody): Promise<Orders.RazorpayOrder>
    edit(orderId: string, params: Orders.RazorpayOrderUpdateRequestBody, callback: (err: INormalizeError | null, data: Orders.RazorpayOrder) => void): void
    /**
    * Fetch payments for an order
    *
    * @param orderId - The unique identifier of the order
    *  
    */
    fetchPayments(orderId: string, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Payments.RazorpayPayment>
    }) => void): void
    fetchPayments(orderId: string): Promise<{
        entity: string,
        count: number,
        items: Array<Payments.RazorpayPayment>
    }>
    /**
    * Fetch transfers for an order
    *
    * @param orderId - The unique identifier of the order
    * 
    */
    fetchTransferOrder(orderId: string): Promise<Orders.RazorpayOrder>
    fetchTransferOrder(orderId: string, callback: (err: INormalizeError | null, data: Orders.RazorpayOrder) => void): void
}

export default orders