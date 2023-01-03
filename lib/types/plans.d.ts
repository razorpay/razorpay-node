export interface IRazorPayPlan {
    id:string;
    entity: "plan";
    interval: number;
    period: "daily" | "weekly" | "monthly" | "yearly";
    item: {
        id: string;
        active: boolean;
        name: string;
        description: string;
        amount: number;
        unit_amount: number;
        currency: string;
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
    };
    notes: { [key: string]: string };
    created_at: number;
}

export interface IRazorpayAddPlan {
    item: {
        name: string;
        description?: string;
        amount: number;
        currency: string;
    };
    period: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    notes?: { [key: string]: string };
}

export interface IRazorpayPlanQuery {
    from?: number;
    to?: number;
    count?: number;
    skip?: number;
}

declare function plans(api: any): {
    /**
     * Creates a plan
     * 
     * @param {Object} params
     * 
     * @return {Promise}
     */
    create(params: IRazorpayAddPlan): Promise<IRazorPayPlan>
    /**
    * Get all plans
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    all(params?: IRazorpayPlanQuery): Promise<string>
    /**
    * Fetches a order given Plan ID
    *
    * @param {String} planId
    *
    * @return {Promise}
    */
    fetch(planId: string): Promise<IRazorPayPlan>
}

export default plans