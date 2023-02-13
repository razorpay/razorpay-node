import { IMap, INormalizeError } from "./api";

export declare namespace FundAccounts {
    interface RazorpayFundAccountBaseRequestBody {
        /**
         * This is the unique ID linked to a customer. 
         * For example, `cust_Aa000000000001`.
         */
        customer_id: string;
        /**
         * Data type `string`. The type of account to be linked to the customer ID. 
         * In this case it will be `bank_account`.
         */
        account_type: string;
        /**
         * Customer bank account details.
         */
        bank_account: RazorpayBankAccountBaseRequestBody;
    }

    interface RazorpayFundAccountCreateRequestBody extends RazorpayFundAccountBaseRequestBody { }

    interface RazorpayBankAccountBaseRequestBody {
        /**
         * Data type string. Name of account holder as per bank records. 
         * For example, `Gaurav Kumar`.
         */
        name: string;
        /**
         * Data type string. Beneficiary account number. 
         * For example, `11214311215411`.
         */
        account_number: string | number;
        /**
         * Data type string. Customer's bank IFSC. 
         * For example, `HDFC0000053`.
         */
        ifsc: string;
    }

    interface RazorpayBankAccount extends RazorpayBankAccountBaseRequestBody {
        /**
         * Customer's bank name
         */
        bank_name: string;
        /**
         * Key-value pair that can be used to store additional information about the entity.
         * Maximum 15 key-value pairs, 256 characters (maximum) each.
         */
        notes: IMap<string | number> | [];
    }

    interface RazorpayFundAccount extends Omit<RazorpayFundAccountBaseRequestBody, 'bank_account'> {
        /**
         * The unique ID linked to the fund account.
         */
        id: string,
        /**
         * Indicates the type of entity.
         */
        entity: string,
        batch_id: string | null,
        /**
         * Customer bank account details.
         */
        bank_account: RazorpayBankAccount;
        /**
         * Data type string. Status of the fund account
         */
        active: boolean,
        /**
         * The time at which the account was created at Razorpay. 
         * The output for this parameter is date and time in the Unix format
         */
        created_at: number
    }
}


declare function fundAccount(api: any): {
    /**
     * Create a Fund Account
     * 
     * @param params - Check [doc](https://razorpay.com/docs/payments/customers/customer-fund-account-api/#create-a-fund-account) for required params
     * 
     */
    create(params: FundAccounts.RazorpayFundAccountCreateRequestBody): Promise<FundAccounts.RazorpayFundAccount>
    create(params: FundAccounts.RazorpayFundAccountCreateRequestBody, callback: (err: INormalizeError | null, data: FundAccounts.RazorpayFundAccount) => void): void;
    /**
    * Fetch all Fund Accounts
    *
    * @param customerId - The unique identifier of the customer  
    *
    */
    fetch(customerId: string): Promise<{
        entity: string;
        count: number;
        items: Array<FundAccounts.RazorpayFundAccount>;
    }>
    fetch(customerId: string, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<FundAccounts.RazorpayFundAccount>;
    }) => void): void

}

export default fundAccount