import API from './api'

export interface IRazorpayAddonId {
    id: string,
    entity: string,
    item: {
        id: string,
        active: boolean,
        name: string,
        description: string,
        amount: number,
        unit_amount: number,
        currency: string,
        type: string,
        unit: string | null,
        tax_inclusive: false,
        hsn_code: string | null,
        sac_code: string | null,
        tax_rate: string | null,
        tax_id: string | null,
        tax_group_id: string | null,
        created_at: number,
        updated_at: number
    },
    quantity: number,
    created_at: number,
    subscription_id: string,
    invoice_id: string
}

export interface IRazorpayAddonsQuery {
    from?: number;
    to?: number;
    count?: number;
    skip?: number;
}

declare function addons(api: API): {
    /**
    * Fetches a addon given Addon ID
    *
    * @param {String} addonId
    *
    * @return {Promise}
    */
    fetch(addonId: string): Promise<IRazorpayAddonId>;
    /**
    * Delete a addon given Addon ID
    *
    * @param {String} addonId
    *
    * @return {Promise}
    */
    delete(addonId: string): Promise<[]>;
    /**
    * Get all addons
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    all(params?: IRazorpayAddonsQuery): Promise<{
        entity: string,
        count: number,
        items: Array<IRazorpayAddonId>
    }>;
};
export default addons;
