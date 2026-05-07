import { IMap, INormalizeError, RazorpayPaginationOptions } from "./api";

export declare namespace Refunds {
    interface RazorpayRefundBaseRequestBody {
        /**
         * The amount to be refunded (in the smallest unit of currency).
         */
        amount?: number;
        /**
         * Speed at which the refund is to be processed.
         */
        speed?: 'normal' | 'optimum';
        /**
         * Key-value store for storing your reference data.
         */
        notes?: IMap<string | number>;
        /**
         * A unique identifier provided by you for your internal reference.
         */
        receipt?: string | null;
    }

    interface RazorpayRefundCreateRequestBody extends RazorpayRefundBaseRequestBody {}

    interface RazorpayRefundUpdateRequestBody extends RazorpayRefundBaseRequestBody {
        notes: IMap<string | number>
    }

    interface RazorpayRefund extends Omit<RazorpayRefundBaseRequestBody, 'speed'> {
        /**
         * The unique identifier of the refund.
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: string;
        /**
         * The currency of payment amount for which the refund is initiated.
         */
        currency: string;
        /**
         * The unique identifier of the payment for which a refund is initiated. 
         * For example, `pay_FgR9UMzgmKDJRi`.
         */
        payment_id: string,
        /**
         * A dynamic array consisting of a unique reference number (either RRN, ARN or UTR) 
         * that is provided by the banking partner when a refund is processed. 
         * This reference number can be used by the customer to track the status of the 
         * refund with the bank.
         */
        acquirer_data?: IMap<any>;
        /**
         * Unix timestamp at which the refund was created.
         */
        created_at: number,
        /**
         * This parameter is populated if the refund was created as part of a batch upload. 
         * For example, `batch_00000000000001`
         */
        batch_id?: string | null,
        /**
         * Indicates the state of the refund. 
         */
        status: 'pending' | 'processed' | 'failed',
        /**
         * This is a parameter in the response which describes the mode used to process a refund.
         * This attribute is seen in the refund response only if the speed parameter is set in 
         * the refund request.
         */
        speed_processed: 'instant' | 'normal';
        /**
         * The processing mode of the refund seen in the refund response.
         * This attribute is seen in the refund response only if the `speed` 
         * parameter is set in the refund request.
         */
        speed_requested: 'normal' | 'optimum';
    }
}

declare function refunds(api: any): {
    /**
    * Get all refunds
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/refunds/#fetch-all-refunds) for required params
    *
    */
    all(params?: RazorpayPaginationOptions): Promise<{
        entity: string,
        count: number,
        items: Array<Refunds.RazorpayRefund>
    }>
    all(params: RazorpayPaginationOptions, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Refunds.RazorpayRefund>
    }) => void): void
    /**
    * Fetch a refund given Refund ID
    *
    * @param refundId - The unique identifier of the refund.
    * @param params - The unique identifier of the payment.
    *
    */
    fetch(refundId: string, params?: { payment_id: string }): Promise<Refunds.RazorpayRefund>
    fetch(refundId: string, params: { payment_id?: string }, callback: (err: INormalizeError | null, data: Refunds.RazorpayRefund) => void): void
    /**
    * Edit a payment given Refund ID
    *
    * @param paymentId - The unique identifier of the payment.
    * @param params - Check [doc](https://razorpay.com/docs/api/refunds/#update-refund) for required params
    * 
    */
    edit(refundId: string, params: Refunds.RazorpayRefundUpdateRequestBody): Promise<Refunds.RazorpayRefund>
    edit(refundId: string, params: Refunds.RazorpayRefundUpdateRequestBody, callback: (err: INormalizeError | null, data: Refunds.RazorpayRefund) => void): void
}

export default refunds