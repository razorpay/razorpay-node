import { IRazorpayQuery } from "./api";

export interface IRazorpayItem {
    name: string;
    description?: string;
    amount: number;
    currency: string;
    active?: boolean;
  }

  export interface IRazorpayItemId extends IRazorpayItem{
    id: string;
    unit_amount: number;
    type: string;
    unit: number | null;
    tax_inclusive: boolean;
    hsn_code: number | null;
    sac_code: number | null;
    tax_rate: number | null;
    tax_id: string | null;
    tax_group_id: string | null;
    created_at: number;
  }  

declare function items(api: any): {
    /**
    * Create an Item
    *
    * @param {Object} params
    * 
    * @return {Promise}
    */
    create(params: IRazorpayItem): Promise<IRazorpayItemId>
    /**
    * Get all payments
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    all(params?: IRazorpayQuery): Promise<{
        entity: string;
        count: 2;
        items: Array<IRazorpayItemId>;
    }>
    /**
    * Fetch a item given Item ID
    *
    * @param {String} itemId  
    *
    * @return {Promise}
    */
    fetch(itemId: string): Promise<IRazorpayItemId>
    /**
    * Edit a items given Item ID
    *
    * @param {String} itemId
    * 
    * @return {Promise}
    */
    edit(itemId: string, params: IRazorpayItem): Promise<IRazorpayItemId>
}

export default items