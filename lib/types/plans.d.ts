import { IMap, RazorpayPaginationOptions, INormalizeError } from "./api";
import { Items } from "./items";

export declare namespace Plans {
    interface RazorpayPlanBaseRequestBody {
        /**
         * Details of the plan.
         */
        item: Items.RazorpayItemBaseRequestBody;
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

    interface RazorpayPlanCreateRequestBody extends RazorpayPlanBaseRequestBody { }

    interface RazorPayPlans extends RazorpayPlanBaseRequestBody {
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
        /**
         * Details of the plan.
         */
        item: Items.RazorpayItem;
    }
}

declare function plans(api: any): {
    /**
     * Creates a plan
     * 
     * @param params - Check [doc](https://razorpay.com/docs/api/payments/subscriptions/#create-a-plan) for required params
     * 
     */
    create(params: Plans.RazorpayPlanCreateRequestBody): Promise<Plans.RazorPayPlans>
    create(params: Plans.RazorpayPlanCreateRequestBody, callback: (err: INormalizeError | null, data: Plans.RazorPayPlans) => void): void;
    /**
    * Get all plans
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/subscriptions/#fetch-all-plans) for required params
    *
    */
    all(params?: RazorpayPaginationOptions): Promise<{
        entity: string;
        count: string;
        items: Array<Plans.RazorPayPlans>
    }>
    all(params: RazorpayPaginationOptions, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Plans.RazorPayPlans>
    }) => void): void
    /**
    * Fetch a plans given Plan ID
    *
    * @param planId - The unique identifier of the plan
    *
    */
    fetch(planId: string): Promise<Plans.RazorPayPlans>
    fetch(planId: string, callback: (err: INormalizeError | null, data: Plans.RazorPayPlans) => void): void;
}

export default plans