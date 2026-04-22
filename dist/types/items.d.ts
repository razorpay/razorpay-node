import { RazorpayPaginationOptions, INormalizeError } from "./api";

export declare namespace Items {
  interface RazorpayItemBaseRequestBody {
    /**
     * A name for the item. For example, `Extra appala (papadum)`.
     */
    name: string;
    /**
     * The amount you want to charge the customer for the item, in the currency subunit. For example, `30000`.
     */
    amount: number | string;
    /**
     * The currency in which the customer should be charged for the item. For example, `INR`.
     */
    currency: string;
    /**
     * Description for the item. For example, `1 extra oil fried appala with meals`
     */
    description?: string;
  }

  interface RazorpayItemCreateRequestBody extends RazorpayItemBaseRequestBody { }

  interface RazorpayItemUpdateRequestBody extends Partial<RazorpayItemBaseRequestBody> {
    /**
     * Indicates the status of the item. Possible values :
     * `true` - Item is in `active` state
     * `false` - Item is in `inactive` state. By
     * default, the item is in `active` state.
     */
    active?: boolean;
  }

  interface RazorpayItem extends RazorpayItemBaseRequestBody {
    /**
     * The unique identifier of the item.
     */
    id: string;
    /**
     * The per unit billing amount for each individual unit.
     */
    unit_amount: number;
    /**
     * Here, it must be `invoice`
     */
    type: string;
    /**
     * The number of units of the item billed in the invoice.
     */
    unit: number | null;
    /**
     * Indicates whether the base amount includes tax.
     * 
     * `true`: The base amount includes tax.
     * 
     * `false`: The base amount does not include tax. By default, the value is set to `false`.
     */
    tax_inclusive: boolean;
    /**
     * The 8-digit code used to classify the product as per the Harmonised System of Nomenclature.
     */
    hsn_code: number | null;
    /**
     * The 6-digit code used to classify the service as per the Services Accounting Code.
     */
    sac_code: number | null;
    /**
     * The percentage at which an individual or a corporation is taxed.
     */
    tax_rate: number | null;
    /**
     * The identification number that gets displayed on invoices issued to the customer.
     */
    tax_id: string | null;
    /**
     * The identification number for the tax group. A tax group is a collection of taxes 
     * that can be applied as a single set of rules.
     */
    tax_group_id: string | null;
    /**
     * Unix timestamp, at which the item was created. For example, `1649843796`.
     */
    created_at: number;
    /**
     * Unix timestamp, at which the item was updated.
     */
    updated_at: number;
    /**
     * Indicates the status of the item. Possible values :
     * `true` - Item is in `active` state
     * `false` - Item is in `inactive` state. By
     * default, the item is in `active` state.
     */
    active: boolean;
  }

  interface RazorpayItemQuery extends RazorpayPaginationOptions {
    active?: number;
  }
}

declare function items(api: any): {
  /**
  * Create an Item
  *
  * @param params - Check [doc](https://razorpay.com/docs/api/payments/items#create-an-item) for required params
  * 
  */
  create(params: Items.RazorpayItemCreateRequestBody): Promise<Items.RazorpayItem>
  create(params: Items.RazorpayItemCreateRequestBody, callback: (err: INormalizeError | null, data: Items.RazorpayItem) => void): void;
  /**
  * Get all Items
  *
  * @param params - Check [doc](https://razorpay.com/docs/api/payments/items#fetch-multiple-items) for required params
  *
  */
  all(params?: Items.RazorpayItemQuery): Promise<{
    entity: string,
    count: number,
    items: Array<Items.RazorpayItem>
  }>;
  all(params: Items.RazorpayItemQuery, callback: (err: INormalizeError | null, data: {
    entity: string,
    count: number,
    items: Array<Items.RazorpayItem>
  }) => void): void
  /**
  * Fetch a item given Item ID
  *
  * @param itemId - The unique identifier of the item.
  *
  */
  fetch(itemId: string): Promise<Items.RazorpayItem>
  fetch(itemId: string, callback: (err: INormalizeError | null, data: Items.RazorpayItem) => void): void;
  /**
  * Edit a items given Item ID
  *
  * @param itemId - The unique identifier of the item.
  * @param params - Check [doc](https://razorpay.com/docs/api/payments/items#update-an-item) for required params
  * 
  */
  edit(itemId: string, params: Items.RazorpayItemUpdateRequestBody): Promise<Items.RazorpayItem>
  edit(itemId: string, params: Items.RazorpayItemUpdateRequestBody, callback: (err: INormalizeError | null, data: Items.RazorpayItem) => void): void;
  /**
  * Delete a item given Item ID
  *
  * @param itemId - The unique identifier of the item.
  *
  */
   delete(itemId: string): Promise<[]>
   delete(itemId: string, callback: (err: INormalizeError | null, data: []) => void): void;
}

export default items