import { IMap, INormalizeError, PartialOptional, RazorpayPaginationOptions } from "./api";
import * as fs from 'fs';

export declare namespace Accounts {
    interface RazorpayAccountBaseRequestBody {
        /**
         *  The sub-merchant's business email address.
         */
        email: string;
        /**
         * The business details of the sub-merchant's account
         */
        profile: Profile;
        /**
         *  The sub-merchant's business phone number. The minimum length is 8 characters and the maximum length is 15.
         */
        phone: string | number;
        /**
         * The account type. Possible value is standard
         */
        type?: string;
        /**
         * The type of business operated by the sub-merchant.
         */
        business_type: string;
        /**
         * Partner's external account reference id. The minimum length is 1 character and the maximum length is 512.
         */
        reference_id?: string;
        /**
         * The name of the sub-merchant's business. For example, Acme Corp. The minimum length is 4 characters and the maximum length is 200.
         */
        legal_business_name: string;
        /**
         * The sub-merchant billing label as it appears on the Razorpay Dashboard. The minimum length is 1 character and the maximum length is 255.
         */
        customer_facing_business_name?: string;
        /**
         * The legal details about the sub-merchant's business.
         */
        legal_info?: {
            /**
             * Valid PAN number details of the sub-merchant's business.
             */
            pan?: string;
            /**
             * Valid GSTIN number details of the sub-merchant.
             */
            gst?: string;
            /**
             * CIN is for Private Limited and Public Limited, whereas LLPIN is for LLP business type.
             */
            cin?: string;
        }
        /**
         * The website/app details of the sub-merchant's business.
         */
        apps?: {
            /**
             * The websites for the sub-merchant's business. A minimum of 1 website is required.
             */
            websites: string[];
            /**
             * Android app details
             */
            android: AppDetails[];
            /**
             * iOS app details
             */
            ios: AppDetails[];
        }
        /**
         * The branding details of the sub-merchant's business.
         */
        brand?: {
            /**
             * The color code of sub-merchant's business brand. This is a 6-character hex code (Regex: [a-fA-F0-9]{6}).
             */
            color?: string;
        }
        /**
         *  The name of the contact. The minimum length is 4 and the maximum length is 255 characters.
         */
        contact_name: string;
        /**
         * Options available for contact support
         */
        contact_info?: ContactInfoSupport;
        /**
         * Contains user-defined fields stored by the partner for reference purposes.
         */
        notes?: IMap<string | number>;
    }

    type AppDetails = {
        url: string;
        name: string;
    }

    interface Profile {
        /**
         * The business category of the sub-merchant.
         */
        category?: string;
        /**
         * The business sub-category of the sub-merchant.
         */
        subcategory?: string;
        /**
         * This parameter has been deprecated. Pass the description using the `business_model` parameter.
         */
        description?: string;
        /**
         * Details of sub-merchant's address.
         */
        addresses?: {
            /**
             * Details of the sub-merchant's registered address.
             */
            registered?: ProfileAddresses;
            /**
             * Details of the sub-merchant's operational address.
             */
            operation?: ProfileAddresses;
        }
        /**
         * The business description. The character limit between 1-255 characters.
         */
        business_model?: string;
    }

    interface ProfileAddresses {
        /**
         * Address, line 1. The maximum length is 100 characters.
         */
        street1: string;
        /**
         *  Address, line 2. The maximum length is 100 characters.
         */
        street2: string;
        /**
         * The city. The maximum length is 100 characters.
         */
        city: string;
        /**
         * The state. The minimum length is 2 and the maximum length is 32.
         */
        state: string;
        /**
         * The postal code. This should be exactly 6 characters.
         */
        postal_code: number | string;
        /**
         * he country. The minimum length is 2 and the maximum length is 64. This can either be a country 
         * code in capital letters or the full name of the country in lower case letters.
         */
        country: string;
    }

    interface ContactInfoSupport {
        /**
         * The type of contact support.
         */
        chargeback?: SupportType;
        /**
         * The type of contact support.
         */
        refund?: SupportType;
        /**
         * The type of contact support.
         */
        support?: SupportType;
    }

    type SupportType = {
        /**
         * The email id of chargeback POC.
         */
        email?: string;
        /**
         * The phone number of chargeback POC
         */
        phone?: string;
        /**
         * The URL of chargeback policy.
         */
        policy_url?: string;
    }

    interface RazorpayAccountCreateRequestBody extends RazorpayAccountBaseRequestBody { }

    interface RazorpayAccountUpdateRequestBody extends Partial<Omit<RazorpayAccountBaseRequestBody, 'email' | 'business_type'>> { }

    interface RazorpayAccount extends RazorpayAccountBaseRequestBody {
        /**
         * The unique identifier of the account.
         */
        id: string;
        /**
         * Unix timestamp that indicates when the merchant account was activated. This parameter has null value till the account is activated.
         */
        activated_at: number;
        /**
         * Indicates the payments acceptance status of the merchant account.
         */
        live: boolean;
        /**
         * Indicates the settlements status of the merchant account.
         */
        hold_funds: boolean;
        /**
         * The status of the account.
         */
        status: string;
        /**
         * Unix timestamp, when the account was created.
         */
        created_at: number;
    }

    interface FileCreateParams {
        file: {
            value: fs.ReadStream;
            options: {
                filename: string;
                contentType: string | null;
            };
        };
        document_type: string;
    }

    interface RazorpayAccountDocuments {
        business_proof_of_identification: [
            {
                type: string;
                url: string;
            }
        ]
    }
}

declare function accounts(api: any): {
    /**
     * Creates a account
     * 
     * @param params - Check [doc](https://razorpay.com/docs/api/partners/account-onboarding#create-an-account) for required params
     * 
     */
    create(params: Accounts.RazorpayAccountCreateRequestBody): Promise<Accounts.RazorpayAccount>
    create(params: Accounts.RazorpayAccountCreateRequestBody, callback: (err: INormalizeError | null, data: Accounts.RazorpayAccount) => void): void;
    /**
    * Fetches a account given Account ID
    *
    * @param accountId - The unique identifier of the account.
    *
    */
    fetch(accountId: string): Promise<Accounts.RazorpayAccount>
    fetch(accountId: string, callback: (err: INormalizeError | null, data: Accounts.RazorpayAccount) => void): void;
    /**
    * Update an account
    *
    * @param accountId - The unique identifier of the account.
    * @param params - Check [doc](https://razorpay.com/docs/api/partners/account-onboarding#update-an-account) for required params
    * 
    */
    edit(accountId: string, params: Accounts.RazorpayAccountUpdateRequestBody): Promise<Accounts.RazorpayAccount>
    edit(accountId: string, params: Accounts.RazorpayAccountUpdateRequestBody, callback: (err: INormalizeError | null, data: Accounts.RazorpayAccount) => void): void;
    /**
    * Delete an account
    *
    * @param accountId - The unique identifier of the account.
    * 
    */
    delete(accountId: string): Promise<Accounts.RazorpayAccount>
    delete(accountId: string, callback: (err: INormalizeError | null, data: Promise<Accounts.RazorpayAccount>) => void): void;
    /**
    * Upload account documents
    *
    * @param accountId - The unique identifier of the account.
    * @param params - Check [doc](https://razorpay.com/docs/api/partners/upload-document#request-parameters) for required params
    *
    */
     uploadAccountDoc(accountId: string, params: Accounts.FileCreateParams): Promise<Accounts.RazorpayAccountDocuments>
     uploadAccountDoc(accountId: string, params: Accounts.FileCreateParams, callback: (err: INormalizeError | null, data: Accounts.RazorpayAccountDocuments) => void): void;
     /**
     * Fetches account documents
     *
     * @param accountId - The unique identifier of the account.
     *
     */
     fetchAccountDoc(accountId: string): Promise<Accounts.RazorpayAccountDocuments>
     fetchAccountDoc(accountId: string, callback: (err: INormalizeError | null, data: Accounts.RazorpayAccountDocuments) => void): void;
}

export default accounts