import { IMap, IRazorpayQuery, INormalizeError } from "./api";
import { Items } from "./items";

export declare namespace Plans {
    interface IRazorpayPlanBaseRequestBody {
        /**
         * Details of the plan.
         */
        item: Items.IRazorpayItem;
        /**
         * This, combined with interval, defines the frequency. Possible values:
         * `daily`, `weekly`, `monthly`, `yearly`
         * 
         * If the billing cycle is 2 months, the value should be monthly.
         */
        period: "daily" | "weekly" | "monthly" | "yearly";
        /**
         * This, combined with `period`, defines the frequency. 
         * If the billing cycle is 2 months, the value should be `2`.
         */
        interval: number;
        /**
         * Notes you can enter for the contact for future reference. 
         * This is a key-value pair. You can enter a maximum of 15 key-value pairs. 
         * For example, `note_key`: `Beam me up Scotty`
         */
        notes?: IMap<string | number>;
    }

    interface IRazorpayPlanCreateRequestBody extends IRazorpayPlanBaseRequestBody { }

    interface IRazorPayPlans extends IRazorpayPlanBaseRequestBody {
        /**
         * The unique identifier linked to a plan
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: string;
        /**
         * The Unix timestamp at which the plan was created.
         */
        created_at: number;
    }
}

declare function plans(api: any): {
    /**
     * Creates a plan
     * 
     * @param {Object} params
     * 
     */
    create(params: Plans.IRazorpayPlanCreateRequestBody): Promise<Plans.IRazorPayPlans>
    create(params: Plans.IRazorpayPlanCreateRequestBody, callback: (err: INormalizeError | null, data: Plans.IRazorPayPlans) => void): void;
    /**
    * Get all plans
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    all(params?: IRazorpayQuery): Promise<{
        entity: string;
        count: string;
        items: Array<Plans.IRazorPayPlans>
    }>
    all(params: IRazorpayQuery, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Plans.IRazorPayPlans>
    }) => void): void
    /**
    * Fetch a plans given Plan ID
    *
    * @param {string} planId
    *
    */
    fetch(planId: string): Promise<Plans.IRazorPayPlans>
    fetch(planId: string, callback: (err: INormalizeError | null, data: Plans.IRazorPayPlans) => void): void;
}

export default plans