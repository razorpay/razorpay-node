import { IMap, IRazorpayQuery } from "./api";

export interface IRazorpayPlan {
    item: IRazorpayItem;
    period: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    notes?: IMap<string | number>;
}

export interface IRazorPayPlanId extends IRazorpayPlan {
    id: string;
    entity: string;
    item: IRazorpayItemId;
    created_at: number;
}

export interface IRazorpayItem {
    name: string;
    description?: string;
    amount: number;
    currency: string;
}

export interface IRazorpayItemId extends IRazorpayItem{
    id: string;
    active: boolean;
    unit_amount: number;
    type: string;
    unit: string | null;
    tax_inclusive: boolean;
    hsn_code: string | null;
    sac_code: string | null;
    tax_rate: string | null;
    tax_id: string | null;
    tax_group_id: string | null;
    created_at: number;
    updated_at: number;
}

declare function plans(api: any): {
    /**
     * Creates a plan
     * 
     * @param {Object} params
     * 
     * @return {Promise}
     */
    create(params: IRazorpayPlan): Promise<IRazorPayPlanId>
    /**
    * Get all plans
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    all(params?: IRazorpayQuery): Promise<{
        entity:string;
        count:string;
        items: Array<IRazorPayPlanId>
    }>
    /**
    * Fetch a plans given Plan ID
    *
    * @param {String} planId
    *
    * @return {Promise}
    */
    fetch(planId: string): Promise<IRazorPayPlanId>
}

export default plans