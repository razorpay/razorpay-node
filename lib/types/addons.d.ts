import API, { INormalizeError, IRazorpayQuery } from './api'
import { IRazorpayItemId } from './items';


export interface IRazorpayAddon {
    /**
     * A name for the add-on. For example, `Extra appala (papadum)`.
     */
    name?: string;
    /**
     * The amount you want to charge the customer for the add-on, in the currency subunit. For example, `30000`.
     */
    amount?: number;
    /**
     * The currency in which the customer should be charged for the add-on. For example, `INR`.
     */
    currency?: string;
    /**
     * Description for the add-on. For example, `1 extra oil fried appala with meals`
     */
    description?: string;
}

export interface IRazorpayAddonId {
    /**
     * The unique identifier of the created add-on.
     */
    id: string,
    /**
     * The unique identifier of the created add-on.
     */
    entity: string,
    /**
     * Details of the created add-on.
     */
    item: IRazorpayItemId,
    /**
     * This specifies the number of units of the add-on to be charged to the customer. For example, `2`. The total amount is calculated as `amount` * `quantity`.
     */
    quantity: number,
    /**
     * The Unix timestamp, indicates when the add-on was created. For example, `1581597318`.
     */
    created_at: number,
    /**
     * The unique identifier of the Subscription to which the add-on is being added.
     */
    subscription_id: string,
    /**
     * The add-on is added to the next invoice that is generated after it is created. This field is populated only after the invoice is generated. Until then, it is `null`. Once the add-on is linked to an invoice, it cannot be deleted.
     */
    invoice_id: string
}


declare function addons(api: API): {
    /**
    * Fetches an addon given Addon ID
    *
    * @param {string} addonId - addon id to be fetched 
    * @callback Function
    * 
    */
    fetch(addonId: string): Promise<IRazorpayAddonId>
    fetch(addonId: string, callback: (err: INormalizeError | null, data: IRazorpayAddonId) => void): void;
    /**
    * Delete a addon given Addon ID
    *
    * @param {string} addonId - addon id to be fetched 
    * @callback Function
    * 
    */
    delete(addonId: string): Promise<[]>
    delete(addonId: string, callback: (err: INormalizeError | null, data: []) => void): void;
    /**
    * Get all addons
    *
    * @param {Object} params
    * @callback Function
    * 
    */
    all(params?: IRazorpayQuery): Promise<{
        entity: string,
        count: number,
        items: Array<IRazorpayAddonId>
    }>;
    all(params: IRazorpayQuery, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<IRazorpayAddonId>
    }) => void): void
};
export default addons;
