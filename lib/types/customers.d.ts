import { IMap, INormalizeError, RazorpayPaginationOptions } from "./api";
import { Invoices } from "./invoices";
import { Tokens } from "./tokens";
import { VirtualAccounts } from "./virtualAccounts"

export declare namespace Customers {
    interface RazorpayCustomerBaseRequestBody {
        /**
         * Customer's name. Alphanumeric value with period (.), apostrophe (') 
         * and parentheses are allowed. The name must be between 3-50 characters 
         * in length. For example, `Gaurav Kumar`.
         */
        name?: string;
        /**
         * The customer's email address. A maximum length of 64 characters. 
         * For example, `gaurav.kumar@example.com`.
         */
        email?: string;
        /**
         * The customer's phone number. A maximum length of 15 characters including country code
         */
        contact?: string | number;
        /**
         * `0`: If a customer with the same details already exists, fetches details of the existing customer.
         *
         * `1` (default): If a customer with the same details already exists, throws an error.
         */
        fail_existing?: boolean | 0 | 1;
        /**
         * Customer's GST number, if available
         */
        gstin?: string | null;
        /**
         * This is a key-value pair that can be used to store additional information about the entity
         */
        notes?: IMap<string | number>;
    }

    interface RazorpayCustomerCreateRequestBody extends RazorpayCustomerBaseRequestBody { }

    interface RazorpayCustomerUpdateRequestBody extends Partial<Omit<RazorpayCustomerBaseRequestBody, 'notes' | 'gstin' | 'fail_existing'>> { }

    interface RazorpayCustomer extends RazorpayCustomerBaseRequestBody {
        /**
         * The unique identifier of the customer.
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: string;
        /**
         * Unix timestamp, when the customer was created.
         */
        created_at: number;
        /**
         * Details of the customer's shipping address.
         */
        shipping_address?: Invoices.RazorpayInvoiceAddress[];
    }

    interface RazorpayCustomerBankAccountRequestBody {
        /**
         * The IFSC code of the bank branch associated with the account.
         */
        ifsc_code: string;
        /**
         * Customer's bank account number.
         */
        account_number: string;
        /**
         * The name of the beneficiary associated with the bank account.
         */
        beneficiary_name?: string;
        /**
         * The virtual payment address.
         */
        beneficiary_address1?: string;
        beneficiary_address2?: string;
        beneficiary_address3?: string;
        beneficiary_address4?: string;
        /**
         * Email address of the beneficiary. For example, `gaurav.kumar@example.com`.
         */
        beneficiary_email?: string;
        /**
         * Mobile number of the beneficiary.
         */
        beneficiary_mobile?: string;
        /**
         * The name of the city of the beneficiary.
         */
        beneficiary_city?: string;
        /**
         * The state of the beneficiary.
         */
        beneficiary_state?: string;
        /**
         * The country of the beneficiary.
         */
        beneficiary_country?: string;
        /**
         * The pin code of the beneficiary's address.
         */
        beneficiary_pin?: string;     
    }

    interface RazorpayCustomerBankAccount extends Partial<VirtualAccounts.RazorpayVirtualAccountReceiver>{
        success?: string; 
    }

    interface CustomersEligibility {        
        id: string;
        contact: string;
        ip: string;
        referrer: string;
        user_agent: string;   
    }

    interface RazorpayCustomerEligibilityRequestBody {
        inquiry?: string;
        amount: number | string;
        currency: string;
        customer: Partial<CustomersEligibility>;
    }
    
    interface Instruments {        
        method: string;
        issuer: string;
        type: string;
        provider: string;
        eligibility_req_id: string;
        eligibility: {
            status: string;
            error: Omit<INormalizeError,'statusCode'> 
        }          
    }

    interface RazorpayCustomerEligibility extends RazorpayCustomerEligibilityRequestBody {
        instruments? : Array<Instruments>
    }
}

declare function customers(api: any): {
    /**
     * Creates a customer
     * 
     * @param params - Check [doc](https://razorpay.com/docs/api/customers/#create-a-customer) for required params
     * 
     */
    create(params: Customers.RazorpayCustomerCreateRequestBody): Promise<Customers.RazorpayCustomer>
    create(params: Customers.RazorpayCustomerCreateRequestBody, callback: (err: INormalizeError | null, data: Customers.RazorpayCustomer) => void): void;
    /**
    * Get all customers
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/customers/#fetch-all-customers) for required params
    *
    */
    all(params?: RazorpayPaginationOptions): Promise<{
        entity: string,
        count: number,
        items: Array<Customers.RazorpayCustomer>
    }>
    all(params: RazorpayPaginationOptions, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Customers.RazorpayCustomer>
    }) => void): void;
    /**
    * Fetches a customer given Customer ID
    *
    * @param customerId - The unique identifier of the customer.
    *
    */
    fetch(customerId: string): Promise<Customers.RazorpayCustomer>
    fetch(customerId: string, callback: (err: INormalizeError | null, data: Customers.RazorpayCustomer) => void): void;
    /**
    * Edit a customer given Customer ID
    *
    * @param customerId - The unique identifier of the customer.
    * @param params - Check [doc](https://razorpay.com/docs/api/customers/#edit-customer-details) for required params
    * 
    */
    edit(customerId: string, params: Customers.RazorpayCustomerUpdateRequestBody): Promise<Customers.RazorpayCustomer>
    edit(customerId: string, params: Customers.RazorpayCustomerUpdateRequestBody, callback: (err: INormalizeError | null, data: Customers.RazorpayCustomer) => void): void;
    /**
    * Fetch tokens by customerId
    *
    * @param customerId - The unique identifier of the customer.
    * 
    */
    fetchTokens(customerId: string): Promise<{
        entity: string,
        count: number;
        items: Array<Tokens.RazorpayToken>
    }>
    fetchTokens(customerId: string, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number;
        items: Array<Tokens.RazorpayToken>
    }) => void): void;
    /**
    * Fetch particular token
    *
    * @param customerId - The unique identifier of the customer.
    * @param tokenId - The unique identifier of the token.
    * 
    */
    fetchToken(customerId: string, tokenId: string): Promise<Tokens.RazorpayToken>
    fetchToken(customerId: string, tokenId: string, callback: (err: INormalizeError | null, data: Tokens.RazorpayToken) => void): void;
    /**
    * Delete a token
    *
    * @param customerId - The unique identifier of the customer.
    * @param tokenId - The unique identifier of the token.
    * 
    */
    deleteToken(customerId: string, tokenId: string): Promise<{ deleted: boolean }>
    deleteToken(customerId: string, tokenId: string, callback: (err: INormalizeError | null, data: { deleted: boolean }) => void): void;
    /**
     * Add Bank Account of Customer
     * 
     * @param customerId - The unique identifier of the customer.
     * @param param - Check [doc](https://razorpay.com/docs/api/customers/bank-accounts/#1-add-bank-account-of-customer) for required params 
     */
    addBankAccount(customerId: string, params: Customers.RazorpayCustomerBankAccountRequestBody): Promise<Customers.RazorpayCustomerBankAccount>
    /**
     * Delete Bank Account of Customer
     * 
     * @param customerId - The unique identifier of the customer. 
     * @param bankAccountId - The bank_id that needs to be deleted.
     */
     deleteBankAccount(customerId: string, bankAccountId: string): Promise<Customers.RazorpayCustomerBankAccount>
     /**
      * Eligibility Check API
      * 
      * @param param - Check [doc](https://razorpay.com/docs/payments/payment-gateway/affordability/eligibility-check/#eligibility-check-api) for required params
      */
     requestEligibilityCheck(param: Customers.RazorpayCustomerEligibilityRequestBody): Promise<Partial<Customers.RazorpayCustomerEligibility>>
     /**
      * Fetch Eligibility by id
      * 
      * @param eligibilityId - The unique identifier of the eligibility request to be retrieved. 
      */
     fetchEligibility(eligibilityId: string): Promise<Partial<Customers.RazorpayCustomerEligibility>>
}

export default customers