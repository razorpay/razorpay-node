import { Accounts } from "./accounts";
import { IMap, INormalizeError, PartialOptional, RazorpayPaginationOptions } from "./api";
import * as fs from "fs";

export declare namespace Stakeholders {
    interface RazorpayStakeholderBaseRequestBody {
        /**
         *  The stakeholder's relationship with the account’s business.
         */
        relationship?: RelationShip;
        /**
         * The stakeholder's phone number.
         */
        phone: Phone;
        /**
         * The type of document required to establish the stakeholder's identity.
         */
        kyc: {
            /**
             * The PAN number of the stakeholder.
             */
            pan: string;
        }
        /**
         * The stakeholder's name as per the PAN card.
         */
        name: string;
        /**
         * The stakeholder's email address.
         */
        email: string;
        /**
         * The stakeholder's ownership of the business in percentage.
         */
        percentage_ownership?: number;
        /**
         * Details of stakeholder's address.
         */
        addresses?: {
            residential: Partial<Address>;
        }
        /**
         * Contains user-defined fields stored by the partner for reference purposes.
         */
        notes?: IMap<string | number>;
    }


    interface RazorpayStakeholderCreateRequestBody extends RazorpayStakeholderBaseRequestBody { }

    interface RazorpayStakeholderUpdateRequestBody extends Partial<Omit<RazorpayStakeholderBaseRequestBody, 'email'>> { }

    interface RazorpayStakeholder extends RazorpayStakeholderBaseRequestBody {
        /**
         *  The unique identifier of the stakeholder whose details are created.
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: string;
    }

    interface Address extends Omit<Accounts.ProfileAddresses, 'street1' | 'street2'> {
        street: string;
    }

    type Phone = {
        /**
         * The primary contact number of the stakeholder. The minimum length is 8 characters and the maximum length is 11.
         */
        primary?: string;
        /**
         * The secondary contact number of the stakeholder. The minimum length is 8 characters and the maximum length is 11.
         */
        secondary?: string;
    }

    type RelationShip = {
        /**
         * This attribute is set to `true` if the stakeholder is a director of the account's legal entity
         */
        executive?: boolean;
        /**
         * This attribute is set to `true` if the stakeholder is an executive of the account's legal entity.
         */
        director?: boolean;
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

    interface RazorpayStakeholderDocuments {
        individual_proof_of_address: [
            {
                type: string;
                url: string;
            }
        ]
    }
}

declare function stakeholders(api: any): {
    /**
     * Creates a stakeholder
     *
     * @param accountId - The unique identifier of the account. 
     * @param params - Check [doc](https://razorpay.com/docs/api/partners/stakeholder#create-a-stakeholder) for required params
     * 
     */
    create(accountId: string, params: Stakeholders.RazorpayStakeholderCreateRequestBody): Promise<Stakeholders.RazorpayStakeholder>
    create(accountId: string, params: Stakeholders.RazorpayStakeholderCreateRequestBody, callback: (err: INormalizeError | null, data: Stakeholders.RazorpayStakeholder) => void): void;
    /**
    * Fetches a account given Account ID
    *
    * @param accountId - The unique identifier of the account.
    * @param stakeholderId - The unique identifier of the stakeholder id.
    *
    */
    fetch(accountId: string, stakeholderId: string): Promise<Stakeholders.RazorpayStakeholder>
    fetch(accountId: string, stakeholderId: string, callback: (err: INormalizeError | null, data: Stakeholders.RazorpayStakeholder) => void): void;
    /**
    * Update an stakeholder
    *
    * @param accountId - The unique identifier of the account.
    * @param params - Check [doc](https://razorpay.com/docs/api/partners/stakeholder#update-a-stakeholder) for required params
    * 
    */
    edit(accountId: string, stakeholderId: string, params: Stakeholders.RazorpayStakeholderUpdateRequestBody): Promise<Stakeholders.RazorpayStakeholder>
    edit(accountId: string, stakeholderId: string, params: Stakeholders.RazorpayStakeholderUpdateRequestBody, callback: (err: INormalizeError | null, data: Stakeholders.RazorpayStakeholder) => void): void;
    /**
    * Fetch all Stakeholders
    *
    * @param accountId - The unique identifier of the account.
    * 
    */
    all(accountId: string): Promise<{
        entity: string,
        items: Array<Stakeholders.RazorpayStakeholder>
    }>
    all(accountId: string, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Stakeholders.RazorpayStakeholder>
    }) => void): void;
    /**
    * Upload stakeholder documents
    *
    * @param accountId - The unique identifier of the account.
    * @param stakeholderId - The unique identifier of the stakeholder id.
    *
    */
    uploadStakeholderDoc(accountId: string, stakeholderId: string, params: Stakeholders.FileCreateParams): Promise<Stakeholders.RazorpayStakeholderDocuments>
    uploadStakeholderDoc(accountId: string, stakeholderId: string, params: Stakeholders.FileCreateParams, callback: (err: INormalizeError | null, data: Stakeholders.RazorpayStakeholderDocuments) => void): void;
    /**
    * Fetches stakeholder documents
    *
    * @param accountId - The unique identifier of the account.
    * @param stakeholderId - The unique identifier of the stakeholder id.
    *
    */
    fetchStakeholderDoc(accountId: string, stakeholderId: string): Promise<Stakeholders.RazorpayStakeholderDocuments>
    fetchStakeholderDoc(accountId: string, stakeholderId: string, callback: (err: INormalizeError | null, data: Stakeholders.RazorpayStakeholderDocuments) => void): void;
}

export default stakeholders