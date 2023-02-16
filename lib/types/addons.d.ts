import API, { INormalizeError, RazorpayPaginationOptions } from './api'
import { Items } from './items';

export declare namespace Addons {
    interface RazorpayAddon {
        /**
         * The unique identifier of the created add-on.
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: string;
        /**
         * Details of the created add-on.
         */
        item: Items.RazorpayItem;
        /**
         * This specifies the number of units of the add-on to be charged to the customer. For example, `2`. The total amount is calculated as `amount` * `quantity`.
         */
        quantity: number;
        /**
         * The Unix timestamp, indicates when the add-on was created. For example, `1581597318`.
         */
        created_at: number;
        /**
         * The unique identifier of the Subscription to which the add-on is being added.
         */
        subscription_id: string;
        /**
         * The add-on is added to the next invoice that is generated after it is created. This field is populated only after the invoice is generated. Until then, it is `null`. Once the add-on is linked to an invoice, it cannot be deleted.
         */
        invoice_id: string;
    }
}


declare function addons(api: API): {
    /**
    * Fetches an addon given Addon ID
    *
    * @param addonId - addon id to be fetched 
    * 
    */
    fetch(addonId: string): Promise<Addons.RazorpayAddon>
    fetch(addonId: string, callback: (err: INormalizeError | null, data: Addons.RazorpayAddon) => void): void;
    /**
    * Delete a addon given Addon ID
    *
    * @param addonId - addon id to be fetched 
    * 
    */
    delete(addonId: string): Promise<[]>
    delete(addonId: string, callback: (err: INormalizeError | null, data: []) => void): void;
    /**
    * Get all addons
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/subscriptions/#fetch-all-add-ons) for required params
    * 
    */
    all(params?: RazorpayPaginationOptions): Promise<{
        entity: string,
        count: number,
        items: Array<Addons.RazorpayAddon>
    }>;
    all(params: RazorpayPaginationOptions, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Addons.RazorpayAddon>
    }) => void): void
};
export default addons;
