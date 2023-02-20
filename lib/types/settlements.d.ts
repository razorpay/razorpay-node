import { IMap, INormalizeError, RazorpayPaginationOptions } from "./api";

export declare namespace Settlements {
    
    interface RazorpayInstantSettlementBaseRequestBody {
        /**
         * The amount, in paise, you want settled to your account.
         */
        amount: number | string;
        /**
         * `true`: Razorpay will settle the maximum amount possible. 
         * Values passed in the amount parameter are ignored.
         * 
         * `false` (default value): Razorpay will settle the amount 
         * requested in the amount parameter.
         */
        settle_full_balance?: boolean | 0 | 1;
        /**
         * This is a custom note you can pass for the instant 
         * settlement for your reference. 
         */
        description?: string;
        /**
         * Key-value pair that can be used to store additional 
         * information about the entity.
         */
        notes?: IMap<string | number>;
    }

    interface RazorpayInstantSettlementCreateRequestBody extends RazorpayInstantSettlementBaseRequestBody {}
    
    interface RazorpaySettlement extends RazorpayInstantSettlementBaseRequestBody{
        /**
         * The unique identifier of the settlement.
         */
        id: string;
        /**
         * Indicates the type of entity
         */
        entity: string;
        initiated_at?: number | null;
        processed_at?: number | null;
        reversed_at?: number | null;
        /**
         * Total amount (minus fees and tax), in paise, settled to the bank account.
         */
        amount_settled?: number | null;
        /**
         *  Indicates the state of the instant settlement.
         */
        status: 
        | 'created' 
        | 'processed' 
        | 'failed' 
        | 'initiated' 
        | 'reversed' 
        | 'partially_processed';
        /**
         * Total amount (fees+tax), in paise, deducted for the instant settlement.
         */
        fees: number | null;
        /**
         * Total tax, in paise, charged for the fee component. 
         */
        tax: number | null;
        /**
         * The Unique Transaction Reference (UTR) number available across banks, 
         * which can be used to track a particular settlement in your bank account.
         */
        utr: string | null;
        /**
         * Unix timestamp at which the instant settlement was created.
         */
        created_at: number;
    }

    interface RazorpaySettlementReconBaseRequestBody { 
        /**
         * The year the settlement was received in the `YYYY` format. 
         * For example, `2022`.
         */
        year: number;
        /**
         * The month the settlement was received in the `MM` format. 
         * For example, `06`.
         */
        month?: number;
        /**
         * The date on which the settlement was received in the `DD` format.
         * For example, `11`.
         */
        day?: number;
        /**
         * Specifies the number of available settlements to be fetched. 
         * Maximum count can be `1000`.
         */
        count?: number;
        /**
         * Specifies the number of available settlements to be skipped when fetching a `count`.
         */
        skip?: number;
    }
    
    interface RazorpaySettlementRecon {
        /**
         * The unique identifier of the transaction that has been settled.
         */
        entity_id: string;
        /**
         * Indicates the type of transaction.
         */
        type: string;
        /**
         * The amount, in paise, that has been debited from your account.
         */
        debit: number;
        /**
         * The amount, in paise, that has been credited to your account.
         */
        credit: number;
        /**
         * The total amount, in paise, debited or credited from your account.
         */
        amount: number | string;
        /**
         * The 3-letter ISO currency code for the transaction.
         */
        currency: string;
        /**
         * The fees, in paise, charged to processing the transaction.
         */
        fee: number;
        /**
         * The tax on the fee, in paise, charged to processing the transaction.
         */
        tax: number;
        /**
         * Indicates whether the account settlement for transfer is on hold.
         */
        on_hold: boolean;
        /**
         * Indicates whether the transaction has been settled or not.
         */
        settled: boolean;
        /**
         * Unix timestamp at which the transaction was created.
         */
        created_at: number;
        /**
         * Unix timestamp when the transaction was settled.
         */
        settled_at: number;
        /**
         * The unique identifier of the settlement transaction.
         */
        settlement_id: string;
        /**
         * 
         */
        posted_at?: number | null;
        credit_type: string;
        /**
         * Brief description about the transaction.
         */
        description: string | null;
        /**
         * Notes for the transaction.
         */
        notes: IMap<string | number>;
        /**
         * The unique identifier of the payment linked to `refund` or `transfer` 
         * that has been settled.
         */
        payment_id?: string;
        /**
         * The unique reference number linked to the settlement.
         */
        settlement_utr: string;
        /**
         * Order ID linked to the payment made by the customer that has been settled.
         */
        order_id: string;
        /**
         * Receipt number entered while [creating the Order](https://razorpay.com/docs/api/orders).
         */
        order_receipt?: string | null;
        /**
         * The payment method used to complete the payment.
         */
        method: 'card' | 'netbanking' | 'wallet' | 'emi' | 'upi';
        /**
         * The card network used to process the payment.
         */
        card_network:
        | 'American Express'
        | 'Diners Club'
        | 'Maestro'
        | 'MasterCard'
        | 'RuPay'
        | 'Visa'
        | 'unknown';
        card_issuer: string;
        /**
         * This is a 4-character code denoting the issuing bank.
         */
        card_type: 'credit' | 'debit';
        /**
         * The unique identifier of any dispute, if any, for this transaction.
         */
        dispute_id?: string | null;
    }
    

    interface RazorpayInstantSettlement extends RazorpayInstantSettlementBaseRequestBody{
        /**
         * The unique identifier of the instant settlement transaction.
         */
        id: string;
        /**
         * Indicates the type of entity. 
         */
        entity: string;
        /**
         * The settlement amount, in paise, requested by you.
         */
        amount_requested: number;
        /**
         * Total amount (minus fees and tax), in paise, 
         * settled to the bank account.
         */
        amount_settled: number;
        /**
         * Portion of the requested amount, in paise, yet 
         * to be settled to you.
         */
        amount_pending: number;
        /**
         * Portion of the requested amount, in paise, that was not settled to you. 
         * This amount is reversed to your PG current balance.
         */
        amount_reversed: number;
        /**
         * Total amount (fees+tax), in paise, deducted for the instant settlement. 
         */
        fees: number;
        /**
         * Total tax, in paise, charged for the fee component.
         */
        tax: number;
        /**
         * The 3-letter ISO currency code for the settlement.
         */
        currency: string;
        /**
         * Indicates the state of the instant settlement
         */
        status: 'created' | 'processed' | 'failed' | 'initiated' | 'reversed' | 'partially_processed';
        /**
         * Unix timestamp at which the instant settlement was created.
         */
        created_at: number;
        /**
         * List of payouts created for the instant settlement.
         */
        ondemand_payouts?: {
            entity: string;
            count: number;
            items: Settlements.RazorpaySettlement[];
        }
        scheduled: boolean;
    }
    
    interface RazorpayOndemandSettlementQuery extends RazorpayPaginationOptions {
        'expand[]'?: string;
    }
}

declare function settlements(api: any): {
    /**
     * Create on-demand settlement
     * 
     * @param params - Check [doc](https://razorpay.com/docs/api/settlements/instant#create-an-instant-settlement) for required params
     * 
     */
    createOndemandSettlement(params: Settlements.RazorpayInstantSettlementCreateRequestBody): Promise<Settlements.RazorpayInstantSettlement>
    createOndemandSettlement(params: Settlements.RazorpayInstantSettlementCreateRequestBody, callback: (err: INormalizeError | null, data: Settlements.RazorpayInstantSettlement) => void): void
    /**
    * Get all settlements
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/settlements/instant#fetch-all-instant-settlements) for required params
    *
    */
    all(params?: RazorpayPaginationOptions): Promise<{
        entity: string;
        count: number;
        items: Array<Settlements.RazorpaySettlement>;
    }>
    all(params: RazorpayPaginationOptions, callback: (err: INormalizeError | null, data: {
        entity: string;
        count: number;
        items: Array<Settlements.RazorpaySettlement>;
    }) => void): void
    /**
    * Fetches a settlement given Settlement ID
    *
    * @param settlementId - The unique identifier of the settlement.
    *
    */
    fetch(settlementId: string): Promise<Settlements.RazorpaySettlement>
    fetch(settlementId: string, callback: (err: INormalizeError | null, data: Settlements.RazorpaySettlement) => void): void
    /**
    * Fetch all demand settlements
    *
    * @param settlementId - The unique identifier of the settlement.
    * @param params - Check [doc](https://razorpay.com/docs/api/settlements/instant#fetch-all-instant-settlements) for required params
    * 
    */
    fetchAllOndemandSettlement(params: Settlements.RazorpayOndemandSettlementQuery): Promise<{
        entity: string;
        count: number;
        items: Settlements.RazorpayInstantSettlement[];
    }>
    fetchAllOndemandSettlement(params: Settlements.RazorpayOndemandSettlementQuery, callback: (err: INormalizeError | null, data: {
        entity: string;
        count: number;
        items: Settlements.RazorpayInstantSettlement[];
    }) => void): void
    /**
    * Fetch on-demand settlement by ID
    *
    * @param settlementId - The unique identifier of the settlement.
    * @param params - Check [doc](https://razorpay.com/docs/api/settlements/instant#fetch-instant-settlement-by-id) for required params
    * 
    */
    fetchOndemandSettlementById(settlementId: string, params?: { 'expand[]': 'ondemand_payouts' }): Promise<Settlements.RazorpayInstantSettlement>;
    fetchOndemandSettlementById(settlementId: string, params: { 'expand[]'?: 'ondemand_payouts' }, callback: (err: INormalizeError | null, data: Settlements.RazorpayInstantSettlement) => void): void
    /**
    * Settlement report for a month
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/settlements#settlement-recon) for required params
    *
    */
    reports(params: Settlements.RazorpaySettlementReconBaseRequestBody): Promise<Settlements.RazorpaySettlementRecon>
    reports(params: Settlements.RazorpaySettlementReconBaseRequestBody, callback: (err: INormalizeError | null, data: Settlements.RazorpaySettlementRecon) => void): void
}

export default settlements