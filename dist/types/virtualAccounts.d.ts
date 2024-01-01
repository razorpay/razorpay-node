import { IMap, INormalizeError, RazorpayPaginationOptions } from "./api";
import { Orders } from "./orders";
import { Payments } from "./payments";

export declare namespace VirtualAccounts {
    interface RazorpayVirtualAccountBaseRequestBody {
        /**
         * The `merchant billing label ` as it 
         * appears on the Razorpay Dashboard.
         */
        name?: string;
        /**
         * A brief description about the Customer Identifier.
         */
        description?: string;
        amount_expected?: string | number | null;
        /**
         * he amount paid by the customer into the Customer Identifier.
         */
        amount_paid?: string | number;
        /**
         * Unique identifier of the customer the Customer Identifier 
         * is linked with.
         */
        customer_id?: string;
        /**
         * Configuration of desired receivers for the Customer Identifier.
         */
        receivers: RazorVirtualAccountReceiverBaseRequestBody;
        /**
         * UNIX timestamp at which the Customer Identifier is scheduled to 
         * be automatically closed
         */
        close_by?: number;
        /**
         * Any custom notes you might want to add to the Customer Identifier 
         * can be entered here.
         */
        notes?: IMap<string | number>;
    }

    interface RazorpayVirtualAccountCreateRequestBody extends RazorpayVirtualAccountBaseRequestBody { }

    interface RazorpayVirtualAccountTPVCreateRequestBody extends RazorpayVirtualAccountBaseRequestBody {
        /**
         * Details of customer bank accounts which will be allowed to make 
         * payments to your Customer Identifier.
         */
        allowed_payers: RazorpayAllowedPayerBaseRequestBody[];
    }

    interface RazorpayVirtualAccount extends Omit<RazorpayVirtualAccountCreateRequestBody, 'receivers' | 'allowed_payers'> {
        /**
         * The unique identifier linked to an virtual account
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: 'virtual_account';
        /**
         * Indicates whether the Customer Identifier is in active or closed state.
         */
        status: 'active' | 'closed';
        /**
         * UNIX timestamp at which the Customer Identifier is scheduled to be 
         * automatically closed. 
         */
        closed_at?: number;
        /**
         * UNIX timestamp at which the Customer Identifier was created.
         */
        created_at?: number;
        /**
         * Configuration of desired receivers for the Customer Identifier.
         */
        receivers: RazorpayVirtualAccountReceiver[];
        /**
         * Details of customer bank accounts which will be allowed to make 
         * payments to your Customer Identifier. 
         */
        allowed_payers: RazorpayAllowedPayer[];
    }

    interface RazorpayAllowedPayerBaseRequestBody {
        /**
         * The type of account. Possible value is `bank_account`.
         */
        type: 'bank_account';
        /**
         * Indicates the bank account details such as 
         * `ifsc` and `account_number`.
         */
        bank_account: Orders.RazorpayOrderBankDetailsBaseRequestBody;
    }

    interface RazorpayAllowedPayer extends RazorpayAllowedPayerBaseRequestBody {
        /**
         * The unique identifier of the virtual bank account or virtual UPI ID. 
         * Sample IDs for:
         * 
         * virtual bank account: `ba_Di5gbQsGn0QSz3`
         * 
         * virtual UPI ID: `vpa_CkTmLXqVYPkbxx`
         */
        id: string,
        /**
         * Name of the entity. Possible values are: `bank_account`, `vpa`
         */
        entity: string,
    }

    interface RazorVirtualAccountReceiverBaseRequestBody {
        /**
         * The receiver type to be added to the Customer Identifier.
         */
        types?: ['bank_account' | 'vpa' | 'qr_code'];
        /**
         * Descriptor details for the virtual UPI ID. This is to be passed 
         * only when `vpa` is passed as the receiver `types`.
         */
        vpa?: {
            descriptor: string
        };
    }

    interface RazorpayVirtualAccountReceiver {
        id: string;
        entity: string;
        /**
         * The IFSC for the virtual bank account created.
         */
        ifsc: string;
        /**
         * The bank associated with the virtual bank account.
         */
        bank_name: string;
        /**
         * The unique account number provided by the bank
         */
        account_number: string;
        /**
         * The `merchant billing label ` as it 
         * appears on the Razorpay Dashboard.
         */
        name: string;
        /**
         * Any custom notes you might want to add to the virtual bank account 
         * or virtual UPI ID can be entered here. 
         */
        notes: IMap<string | number>;
        /**
         * The UPI ID consists of the username and the bank handle.
         */
        username?: string;
        /**
         * The bank name that forms the second half of the virtual 
         * UPI ID. For example, icici
         */
        handle?: string;
        /**
         * The UPI ID that combines the `username` and the `handle` with the `@` symbol.
         */
        address?: string;
        /**
         * The URL of the QR code.
         */
        short_url?: string;
        /**
         * A 14-digit reference number or a receipt for the payment. 
         * It will be the same as the value of id without the prefix `qr_`.
         * A sample `reference` value will look like this: `4lsdkfldlteskf`.
         */
        reference?: string | null;
        updated_at:number;
        /**
         * The status of the payment. It can have two values, 
         * `active` and `closed`.
         */
        status?: string;
    }
}

declare function virtualAccounts(api: any): {
    /**
     * Create a virtual account
     * 
     * @param params
     * @link https://razorpay.com/docs/api/payments/smart-collect/#create-a-customer-identifier
     * @link https://razorpay.com/docs/api/payments/smart-collect-tpv#create-a-customer-identifier
     * @link https://razorpay.com/docs/payments/payment-methods/bharatqr/api/#create
     * 
     */
    create(params: VirtualAccounts.RazorpayVirtualAccountCreateRequestBody | VirtualAccounts.RazorpayVirtualAccountTPVCreateRequestBody): Promise<VirtualAccounts.RazorpayVirtualAccount>
    create(params: VirtualAccounts.RazorpayVirtualAccountCreateRequestBody | VirtualAccounts.RazorpayVirtualAccountTPVCreateRequestBody, callback: (err: INormalizeError | null, data: VirtualAccounts.RazorpayVirtualAccount) => void): void
    /**
    * Fetch all virtual account
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/smart-collect#fetch-all-customer-identifiers) for required params
    * 
    */
    all(params?: RazorpayPaginationOptions): Promise<{
        entity: string;
        count: number;
        items: Array<VirtualAccounts.RazorpayVirtualAccount>;
    }>
    all(params: RazorpayPaginationOptions, callback: (err: INormalizeError | null, data: {
        entity: string;
        count: number;
        items: Array<VirtualAccounts.RazorpayVirtualAccount>;
    }) => void): void
    /**
    * Fetch virtual account by id
    *
    * @param virtualId - The unique identifier of the virtual account
    *
    */
    fetch(virtualId: string): Promise<VirtualAccounts.RazorpayVirtualAccount>
    fetch(virtualId: string, callback: (err: INormalizeError | null, data: VirtualAccounts.RazorpayVirtualAccount) => void): void
    /**
    * Close virtual account
    *
    * @param virtualId - The unique identifier of the virtual account
    *
    */
    close(virtualId: string): Promise<any>
    close(virtualId: string, callback: (err: INormalizeError | null, data: any) => void): void
    /**
    * Fetch payments for a virtual account
    *
    * @param virtualId - The unique identifier of the virtual account
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/smart-collect-tpv#fetch-payments-for-a-customer-identifier) for required params
    * 
    */
    fetchPayments(virtualId: string, params?: RazorpayPaginationOptions): Promise<{
        entity: string;
        count: number;
        items: Array<Payments.RazorpayPayment>;
    }>
    fetchPayments(virtualId: string, params: RazorpayPaginationOptions, callback: (err: INormalizeError | null, data: {
        entity: string;
        count: number;
        items: Array<Payments.RazorpayPayment>;
    }) => void): void
    /**
    * Add receiver to an existing virtual account
    *
    * @param virtualId - The unique identifier of the virtual account
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/smart-collect-tpv#add-receiver-to-an-existing-customer-identifier) for required params
    *
    */
    addReceiver(virtualId: string, params: VirtualAccounts.RazorVirtualAccountReceiverBaseRequestBody): Promise<VirtualAccounts.RazorpayVirtualAccount>
    addReceiver(virtualId: string, params: VirtualAccounts.RazorVirtualAccountReceiverBaseRequestBody, callback: (err: INormalizeError | null, data: VirtualAccounts.RazorpayVirtualAccount) => void): void
    /**
    * Add an Allowed Payer Account
    *
    * @param virtualId - The unique identifier of the virtual account
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/smart-collect-tpv#add-an-allowed-payer-account) for required params
    *
    */
    allowedPayer(virtualId: string, params: VirtualAccounts.RazorpayAllowedPayerBaseRequestBody): Promise<VirtualAccounts.RazorpayVirtualAccount>
    allowedPayer(virtualId: string, params: VirtualAccounts.RazorpayAllowedPayerBaseRequestBody, callback: (err: INormalizeError | null, data: VirtualAccounts.RazorpayVirtualAccount) => void): void
    /**
    * Delete an Allowed Payer Account
    *
    * @param virtualId - The unique identifier of the virtual account
    * @param allowedPayerId
    *
    */
    deleteAllowedPayer(virtualId: string, allowedPayerId: string): Promise<null>
    deleteAllowedPayer(virtualId: string, allowedPayerId: string, callback: (err: INormalizeError | null, data: null) => void): void
}

export default virtualAccounts