import { IMap, INormalizeError, RazorpayPaginationOptions } from "./api";

export declare namespace Transfers {
    interface RazorpayTransferBaseRequestBody {
        /**
         * Unique identifier of the linked account to which the transfer must be made.
         */
        account: string;
        /**
         * The amount (in paise) to be transferred to the linked account. 
         * For example, for an amount of ₹200.35, the value of this field should be 20035.
         */
        amount: number | string;
        /**
         * The currency used in the transaction. We support only INR for Route transactions.
         */
        currency: string;
        /**
         * Set of key-value pairs that can be associated with an entity. 
         * These pairs can be useful for storing additional information about the entity. 
         * A maximum of 15 key-value pairs, each of 256 characters (maximum), are supported.
         */
        notes?: IMap<string | number>;

    }

    interface RazorpayTransferCreateRequestBody extends RazorpayTransferBaseRequestBody { }

    interface RazorpayTransferUpdateRequestBody {
        /**
         * Indicates whether the account settlement for transfer is on hold. 
         * Possible values:
         * `1` - Put the transfer settlement on hold
         * `0` - Releases the settlement.
         */
        on_hold?: boolean | 0 | 1;
        /**
         * Timestamp, in Unix, that indicates until when the settlement of the transfer must be put on hold. 
         * If no value is passed, the settlement is put on hold indefinitely.
         */
        on_hold_until?: number;
    }

    interface RazorpayOrderCreateRequestBody extends RazorpayTransferBaseRequestBody, RazorpayTransferUpdateRequestBody {
        linked_account_notes?: string[];
    }

    interface RazorpayPaymentCreateRequestBody extends RazorpayOrderCreateRequestBody { }

    interface RazorpayTransfer extends Omit<RazorpayTransferBaseRequestBody, 'account'>, Omit<RazorpayPaymentCreateRequestBody, 'account'> {
        /**
         * Unique identifier of the transfer.
         */
        id: string;
        /**
         * The name of the entity.
         */
        entity: string;
        /**
         * The status of the transfer.
         */
        status: 'created' | 'pending' | 'processed' | 'failed' | 'reversed' | 'partially_reversed';
        /**
         * The status of the settlement.
         */
        settlement_status?: 'pending' | 'on_hold' | 'settled' | null;
        /**
         *  Unique identifier of the transfer source. The source can be a `payment` or an order.
         */
        source: string;
        /**
         * Unique identifier of the transfer destination, that is, the linked account.
         */
        recipient: string;
        /**
         * Amount reversed from this transfer for refunds.
         */
        amount_reversed: number;
        /**
         * Fee (including GST) charged by Razorpay
         */
        fees: number;
        /**
         * GST charged for the payment.
         */
        tax: number | null;
        /**
         * Unique identifier of the settlement.
         */
        recipient_settlement_id: string | null;
        recipient_settlement: string | null;
        /**
         * Timestamp, in Unix, at which the record was created.
         */
        created_at: number;
        processed_at: number;
        error: {
            code: string | null;
            description: string | null;
            reason: string | null;
            field: string | null;
            step: string | null;
            id: string | null;
            source: string | null;
            metadata: string | null;
        }
    }

    interface RazorpayReversal {
        /**
         * The unique identifier of the reversal.
         */
        id: string,
        /**
         * The name of the entity.
         */
        entity: string,
        /**
         * Unique identifier of the transfer that was reversed.
         */
        transfer_id: string,
        /**
         * The amount that was reversed, in paise. 
         */
        amount: number,
        /**
         * Fee (including GST) charged by Razorpay
         */
        fee: number | null,
        /**
         * GST charged for the payment.
         */
        tax: number | null,
        /**
         * ISO currency code. We support route reversals only in INR.
         */
        currency: string,
        /**
         * Timestamp in Unix. This indicates when the reversal was created.
         */
        notes: IMap<any>,
        initiator_id: string | null,
        customer_refund_id: string | null,
        /**
         * Description of the error that occurred during payment.
         */
        created_at: number
    }

    interface RazorpayTransferQuery extends RazorpayPaginationOptions {
        recipient_settlement_id?: string
    }
}

declare function transfers(api: any): {
    /**
     * Creates a transfer
     * 
     * @param params - Check [doc](https://razorpay.com/docs/api/payments/route/transfers/#direct-transfers) for required params
     * 
     */
    create(params: Transfers.RazorpayTransferCreateRequestBody): Promise<Transfers.RazorpayTransfer>
    create(params: Transfers.RazorpayTransferCreateRequestBody, callback: (err: INormalizeError | null, data: Transfers.RazorpayTransfer) => void): void
    /**
    * Fetch Transfers for a Settlement
    *
    * @param params - Unique identifier of a settlement obtained from the `settlement.processed` webhook payload.
    *
    */
    all(params?: Transfers.RazorpayTransferQuery): Promise<{
        entity: string;
        count: number;
        items: Array<Transfers.RazorpayTransfer>;
    }>
    all(params: Transfers.RazorpayTransferQuery, callback: (err: INormalizeError | null, data: {
        entity: string;
        count: number;
        items: Array<Transfers.RazorpayTransfer>;
    }) => void): void
    /**
    * Fetch a transfer
    *
    * @param transferId - The unique identifier of the transfer.
    *
    */
    fetch(transferId: string): Promise<Transfers.RazorpayTransfer>
    fetch(transferId: string, callback: (err: INormalizeError | null, data: Transfers.RazorpayTransfer) => void): void
    /**
    * Edit a payment given Transfer ID
    *
    * @param transferId - The unique identifier of the transfer.
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/route/transfers/#modify-settlement-hold-for-transfers) for required params
    * 
    */
    edit(transferId: string, params: Transfers.RazorpayTransferUpdateRequestBody): Promise<Transfers.RazorpayTransfer>
    edit(transferId: string, params: Transfers.RazorpayTransferUpdateRequestBody, callback: (err: INormalizeError | null, data: Transfers.RazorpayTransfer) => void): void
    /**
    * Reverse transfers from all linked accounts
    *
    * @param transferId - The unique identifier of the transfer.
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/route/transfers/#reverse-a-transfer) for required params
    * 
    */
    reverse(transferId: string, params?: { amount: number }): Promise<Transfers.RazorpayReversal>
    reverse(transferId: string, params: { amount?: number }, callback: (err: INormalizeError | null, data: Transfers.RazorpayReversal) => void): void
    /**
    * Fetch settlement details
    * 
    */
    fetchSettlements(): Promise<{
        entity: string;
        count: string;
        items: Array<Transfers.RazorpayTransfer>
    }>
    fetchSettlements(callback: (err: INormalizeError | null, data: {
        entity: string;
        count: string;
        items: Array<Transfers.RazorpayTransfer>
    }) => void): void
}

export default transfers