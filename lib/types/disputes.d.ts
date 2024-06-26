import { IMap, INormalizeError, PartialOptional, RazorpayPaginationOptions } from "./api";

export declare namespace Disputes {
    interface RazorpayDisputesBaseRequestBody {

    }

    interface RazorpayDisputesContestBaseRequestBody {
        /**
         * The contested amount in currency subunits
         */
        amount: number;
        /**
         * The explanation provided by you for contesting the dispute. max length 1000 char
         */
        summary: string;
        /**
         * List of document ids which serves as proof that the product was shipped to the 
         * customer at their provided address.
         */
        shipping_proof: string[];
        /**
         * List of document ids which serves as proof of order confirmation, such as a receipt.
         */
        billing_proof: string[];
        /**
         * List of document ids that serves as proof that this product/service was cancelled.
         */
        cancellation_proof: string[];
        /**
         * List of document ids listing any written/email communication from the customer 
         * confirming that the customer received the product/service or is satisfied with the 
         * product/service.
         */
        customer_communication: string[];
        /***
         * List of document ids showing proof of service provided to the customer.
         */
        proof_of_service: string[];
        explanation_letter: string[];
        /**
         * List of document ids showing proof that the refund had been provided to the customer.
         */
        refund_confirmation: string[];
        /**
         * List of document ids of any server or activity logs which prove that the customer accessed 
         * or downloaded the purchased digital product.
         */
        access_activity_log: string[];
        /**
         * List of document ids listing your refund and/or cancellation policy, as shown to the customer.
         */
        refund_cancellation_policy: string[];
        /**
         * List of document ids listing your sales terms and conditions, as shown to the customer.
         */
        term_and_conditions: string[];
        /**
         * Specifies the evidence documents to be uploaded as a part of contesting a dispute.
         */
        others: {
            /**
             * Describes the custom type of evidence document(s) provided.
             */
            type: string
            /**
             * List of document ids corresponding to the customer evidence type.
             */
            document_ids: string[]
        }[]
        /**
         * The action to be taken for this contest. Possible value is `draft` or `submit`.
         */
        action: string;
        /**
         * Unix timestamp when the dispute was last submitted by you to Razorpay. The default value is `null`.
         */
        submitted_at: any;
    }

    interface RazorpayDisputesContest {

    }

    interface RazorpayDisputeEvidence extends RazorpayDisputesContestBaseRequestBody{}

    interface RazorpayDispute {
        /**
         * The unique identifier of the dispute generated by Razorpay
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: string;
        /**
         * The unique identifier of the payment against which the dispute was created.
         */
        payment_id: string;
        /**
         * Amount, in currency subunits, for which the dispute was created.
         */
        amount: number;
        /**
         * 3-letter ISO currency code associated with the amount.
         */
        currency: string;
        /**
         * The amount, in currency subunits, deducted from your Razorpay current 
         * balance when the dispute is `lost`.
         */
        amount_deducted: number;
        /**
         * Code associated with the reason for the dispute.
         */
        reason_code: string;
        /**
         * Unix timestamp by which a response should be sent to the customer.
         */
        respond_by: number;
        /**
         * The status of the dispute.
         */
        status: string;
        /**
         * Phase associated with the dispute
         */
        phase: string;
        /**
         * Unix timestamp when the dispute was created.
         */
        created_at: number;
        /**
         * Provides details of the evidence submitted/saved for contesting a 
         * dispute.
         */
        evidence: RazorpayDisputeEvidence;
    }
}

declare function disputes(api: any): {
    /**
    * Fetches a dispute given Dispute ID
    *
    * @param disputeId - The unique identifier of the dispute.
    *
    */
    fetch(disputeId: string): Promise<Disputes.RazorpayDispute>
    fetch(disputeId: string, callback: (err: INormalizeError | null, data: Disputes.RazorpayDispute) => void): void;
    /**
    * Get all disputes
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/disputes/fetch-all) for required params
    *
    */
    all(params?: RazorpayPaginationOptions): Promise<{
        entity: string,
        count: number,
        items: Array<Disputes.RazorpayDispute>
    }>
    all(params: RazorpayPaginationOptions, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Disputes.RazorpayDispute>
    }) => void): void;
    /**
    * Update an account
    *
    * @param disputeId - The unique identifier of the dispute.
    * 
    */
    accept(disputeId: string): Promise<Disputes.RazorpayDispute>
    accept(disputeId: string, callback: (err: INormalizeError | null, data: Disputes.RazorpayDispute) => void): void;
    /**
    * Contest a dispute
    *
    * @param disputeId - The unique identifier of the dispute.
    * @param params - Check [doc](https://razorpay.com/docs/api/disputes/contest) for required params
    * 
    */
    contest(accountId: string, param: Partial<Disputes.RazorpayDisputesContestBaseRequestBody>): Promise<Disputes.RazorpayDispute>
    contest(accountId: string, param: Partial<Disputes.RazorpayDisputesContestBaseRequestBody>, callback: (err: INormalizeError | null, data: Promise<Disputes.RazorpayDispute>) => void): void;
}

export default disputes