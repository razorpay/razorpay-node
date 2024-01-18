import { Addons } from "./addons";
import { IMap, RazorpayPaginationOptions, PartialOptional, INormalizeError } from "./api";
import { Invoices } from "./invoices";
import { Orders } from "./orders";
import { Items } from "./items";
import { Tokens } from "./tokens";
import { FundAccounts } from "./fundAccount";

export declare namespace Subscriptions {

    interface RazorpaySubscriptionBaseRequestBody {
        /**
         * The unique identifier of a plan that should be linked to the Subscription. 
         * For example, `plan_00000000000001`.
         */
        plan_id: string;
        /**
         * The number of billing cycles for which the customer should be charged.
         */
        total_count: number;
        /**
         * Indicates whether the communication to the customer would be handled by you or us.
         * Possible values:
         * 
         * `0`: communication handled by you.
         * 
         * `1` (default): communication handled by Razorpay.
         */
        customer_notify?: boolean | 0 | 1;
        /**
         * The number of times the customer should be charged the plan 
         * amount per invoice.
         */
        quantity?: number;
        /**
         * The unique identifier of the offer that is linked to the Subscription. 
         * You can obtain this from the Dashboard. 
         */
        offer_id?: string;
        /**
         * Unix timestamp that indicates from when the Subscription should start. 
         * If not passed, the Subscription starts immediately after the authorisation 
         * payment.
         */
        start_at?: number;
        /**
         * Unix timestamp that indicates till when the customer can make the 
         * authorisation payment.
         */
        expire_by?: number;
        /**
         * This can be used to charge the customer a one-time fee before the 
         * start of the Subscription. This can include something like a one-time 
         * delivery charge or a security deposit. Know more about 
         * [Add-ons](https://razorpay.com/docs/payments/subscriptions/create-add-ons).
         */
        addons?: Pick<RazorpaySubscriptionAddonsBaseRequestBody, 'item'>[];
        /**
         * Notes you can enter for the contact for future reference. This is a 
         * key-value pair.
         */
        notes?: IMap<string | number>;
        /**
         * Represents when the Subscription should be updated. Possible values: 
         * 
         * `now` (default value): Updates the Subscription immediately.
         * 
         * `cycle_end`: Updates the Subscription at the end of the current billing cycle.
         */
        schedule_change_at?: 'now' | 'cycle_end';
    }

    interface RazorpaySubscriptionAddonsBaseRequestBody {
        /**
         * List of invoices generated for the Subscription.
         */
        item: Items.RazorpayItemBaseRequestBody;
        /**
         * The number of units of the item billed in the invoice. 
         * For example, `1`.
         */
        quantity?: number;
    }

    interface RazorpaySubscriptionCreateRequestBody extends RazorpaySubscriptionBaseRequestBody { }

    interface RazorpaySubscriptionUpdateRequestBody extends PartialOptional<RazorpaySubscriptionBaseRequestBody, 'plan_id' | 'total_count'> {
        /**
         * Indicates the number of billing cycles remaining on the Subscription.
         */
        remaining_count?: number;
    }

    interface RazorpaySubscriptionLinkCreateRequestBody extends RazorpaySubscriptionBaseRequestBody {
        /**
         * The customer's email and phone number to which notifications 
         * are to be sent.
         */
        notify_info?: RazorpaySubscriptionNotifyInfo;
    }

    interface RazorpaySubscriptionNotifyInfo {
        notify_phone?: string | number;
        notify_email?: string;
    }

    interface RazorpaySubscription extends RazorpaySubscriptionBaseRequestBody {
        /**
         * The unique identifier linked to a Subscription.
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: string;
        /**
         * Status of the Subscription.
         */
        status:
        | 'created'
        | 'authenticated'
        | 'active'
        | 'pending'
        | 'halted'
        | 'cancelled'
        | 'completed'
        | 'expired';
        /**
         * Indicates the start time of the current billing cycle of a Subscription.
         */
        current_start?: number | null;
        /**
         * Indicates the end time of the current billing cycle of a Subscription.
         */
        current_end?: number | null;
        /**
         * The Unix timestamp of when the Subscription has completed its period or 
         * has been cancelled midway.
         */
        ended_at?: number | null;
        /**
         * The Unix timestamp of when the next charge on the Subscription 
         * should be made.
         */
        charge_at: number;
        /**
         * The Unix timestamp, indicates from when the Subscription should start. 
         * If not passed, the Subscription starts immediately after the authorisation 
         * payment. 
         */
        start_at: number;
        end_at: number;
        /**
         * The number of times the charge for the current billing cycle has been 
         * attempted on the card.
         */
        auth_attempts: number;
        /**
         * Indicates the number of billing cycles the customer has already been charged.
         */
        paid_count: number;
        /**
         * The Unix timestamp at which the plan was created.
         */
        created_at: number;
        /**
         * URL that can be used to make the authorisation payment.
         * For example, `https://rzp.io/i/PWtAiEo`.
         */
        short_url: string;
        /**
         * Indicates if the Subscription has any scheduled changes.
         */
        has_scheduled_changes: boolean;
        change_scheduled_at?: number | null;
        source: string;
        /**
         * Indicates the number of billing cycles remaining on 
         * the Subscription. For example, `2`.
         */
        remaining_count: string;
        /**
         * he unique identifer of the customer who is subscribing to a plan. 
         * This is populated automatically after the customer completes the 
         * authorisation transaction.
         */
        customer_id: string | null;
        payment_method: string | null;
    }

    interface RazorpaySubscriptionRegistrationBaseRequestBody {
        /**
         * The authorization method
         */
        method?: 'card' | 'emandate' | 'nach' | 'upi';
        /**
         * Use to set the maximum amount (in paise) per debit request. 
         * The value can range from `500` - `9999900`. The default value is ₹99,000.
         */
        max_amount?: number;
        /**
         * The Unix timestamp till when you can use the token (authorization on the payment method) 
         * to charge the customer subsequent payments.
         */
        expire_at?: number;
    }
    
    interface RazorpaySubscriptionRegistrationUpi extends RazorpaySubscriptionRegistrationBaseRequestBody {}

    interface RazorpaySubscriptionRegistrationUpiTpv extends RazorpaySubscriptionRegistrationBaseRequestBody { 
        /**
         * The frequency at which you can charge your customer.
         */
        frequency: string;
        bank_account?: Pick<Orders.RazorpayBankAccount, 'account_number' | 'name' | 'ifsc'>;
    }
    
    interface RazorpaySubscriptionRegistrationNach extends RazorpaySubscriptionRegistrationBaseRequestBody {
        bank_account?: Orders.RazorpayBankAccountBaseRequestBody;
        /**
         * Additional information to be printed on the NACH form your customer will sign.
         */
        nach?: {
            /**
             * A user entered reference that appears on the NACH form.
             */
            form_reference1?: string;
            /**
             * A user entered reference that appears on the NACH form.
             */
            form_reference2?: string;
            /**
             * A user entered description that appears on the hosted page.
             */
            description?: string;
        }
    }

    interface RazorpaySubscriptionRegistrationEmandate extends RazorpaySubscriptionRegistrationBaseRequestBody {
        first_payment_amount: number;
        /**
         * The payment method used to make the authorization transaction.
         */
        auth_type?: 'netbanking' | 'debitcard' | 'aadhaar' | 'physical';
        /**
         * The customer's bank account details.
         */
        bank_account?: Orders.RazorpayBankAccountBaseRequestBody;
    }

    interface RazorpayRegistrationLinkBaseRequestBody extends Omit<Invoices.RazorpayInvoiceBaseRequestBody,
        | 'line_items'
        | 'draft'
        | 'date'
        | 'order_id'
        | 'partial_payment'
    > {
        /**
         * Details of the authorization payment.
         */
        subscription_registration:
        | RazorpaySubscriptionRegistrationUpi
        | RazorpaySubscriptionRegistrationNach
        | RazorpaySubscriptionRegistrationEmandate
        | RazorpaySubscriptionRegistrationUpiTpv
    }

    interface RazorpayRegistrationLink extends Invoices.RazorpayInvoice {
        auth_link_status: string | null;
        token?: Tokens.RazorpayAuthorizationToken;
        nach_form_url?: string | null;
    }

    interface RazorpaySubscriptionQuery extends RazorpayPaginationOptions {
        plan_id?: string
    }
}

declare function subscriptions(api: any): {
    /**
     * Creates a Subscription
     * 
     * @param params - Check [doc](https://razorpay.com/docs/api/payments/subscriptions/#create-a-subscription) for required params
     * 
     */
    create(params: Subscriptions.RazorpaySubscriptionCreateRequestBody | Subscriptions.RazorpaySubscriptionLinkCreateRequestBody): Promise<Subscriptions.RazorpaySubscription>
    create(params: Subscriptions.RazorpaySubscriptionCreateRequestBody | Subscriptions.RazorpaySubscriptionLinkCreateRequestBody, callback: (err: INormalizeError | null, data: Subscriptions.RazorpaySubscription) => void): void;
    /**
    * Get all Subscriptions
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/subscriptions/#fetch-all-subscriptions) for required params
    *
    */
    all(params?: Subscriptions.RazorpaySubscriptionQuery ): Promise<{
        entity: string;
        count: number;
        items: Array<Subscriptions.RazorpaySubscription>;
    }>
    all(params: Subscriptions.RazorpaySubscriptionQuery , callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Subscriptions.RazorpaySubscription>
    }) => void): void
    /**
    * Fetch a Subscription given Subcription ID
    *
    * @param subscriptionId - The unique identifier of the Subscription.
    *
    */
    fetch(subscriptionId: string): Promise<Subscriptions.RazorpaySubscription>
    fetch(subscriptionId: string, callback: (err: INormalizeError | null, data: Subscriptions.RazorpaySubscription) => void): void;
    /**
    * Edit a subscription given Subcription ID
    *
    * @param subscriptionId - The unique identifier of the Subscription.
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/subscriptions/#update-a-subscription) for required params
    * 
    */
    update(subscriptionId: string, params: Subscriptions.RazorpaySubscriptionUpdateRequestBody): Promise<Subscriptions.RazorpaySubscription>
    update(subscriptionId: string, params: Subscriptions.RazorpaySubscriptionUpdateRequestBody, callback: (err: INormalizeError | null, data: Subscriptions.RazorpaySubscription) => void): void;
    /**
    * Fetch details of pending update
    *
    * @param subscriptionId - The unique identifier of the Subscription.
    *
    */
    pendingUpdate(subscriptionId: string): Promise<Subscriptions.RazorpaySubscription>
    pendingUpdate(subscriptionId: string, callback: (err: INormalizeError | null, data: Subscriptions.RazorpaySubscription) => void): void;
    /**
    * Cancel a update
    *
    * @param subscriptionId - The unique identifier of the Subscription.
    *
    */
    cancelScheduledChanges(subscriptionId: string): Promise<Subscriptions.RazorpaySubscription>
    cancelScheduledChanges(subscriptionId: string, callback: (err: INormalizeError | null, data: Subscriptions.RazorpaySubscription) => void): void;
    /**
    * Pause a subscription
    *
    * @param subscriptionId - The unique identifier of the Subscription.
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/subscriptions/#pause-a-subscription) for required params
    * 
    */
    pause(subscriptionId: string, params?: { 'pause_at': 'now' }): Promise<Subscriptions.RazorpaySubscription>
    pause(subscriptionId: string, params: { 'pause_at': 'now' }, callback: (err: INormalizeError | null, data: Subscriptions.RazorpaySubscription) => void): void;
    /**
    * Resume a subscription
    *
    * @param subscriptionId - The unique identifier of the Subscription.
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/subscriptions/#resume-a-subscription) for required params
    * 
    */
    resume(subscriptionId: string, params?: { 'resume_at': 'now' }): Promise<Subscriptions.RazorpaySubscription>
    resume(subscriptionId: string, params: { 'resume_at': 'now' }, callback: (err: INormalizeError | null, data: Subscriptions.RazorpaySubscription) => void): void;
    /**
    * Cancel a subscription given id and optional cancelAtCycleEnd
    *
    * @param subscriptionId - The unique identifier of the Subscription.
    * @param cancelAtCycleEnd - `false` (default): Cancel the subscription immediately.
    * 
    */
    cancel(subscriptionId: string, cancelAtCycleEnd?: boolean): Promise<Subscriptions.RazorpaySubscription>
    cancel(subscriptionId: string, cancelAtCycleEnd: boolean, callback: (err: INormalizeError | null, data: Subscriptions.RazorpaySubscription) => void): void;
    /**
    * Delete offer linked to a subscription
    *
    * @param subscriptionId - The unique identifier of the Subscription.
    * @param offerId - The unique identifier of the offer you want remove from the Subscription.
    * 
    */
    deleteOffer(subscriptionId: string, offerId: string): Promise<Subscriptions.RazorpaySubscription>
    deleteOffer(subscriptionId: string, offerId: string, callback: (err: INormalizeError | null, data: Subscriptions.RazorpaySubscription) => void): void;
    /**
    * Creates addon for a given subscription
    *
    * @param subscriptionId - The unique identifier of the Subscription.
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/subscriptions/#create-an-add-on) for required params
    *
    */
    createAddon(subscriptionId: string, params: Subscriptions.RazorpaySubscriptionAddonsBaseRequestBody): Promise<Addons.RazorpayAddon>
    createAddon(subscriptionId: string, params: Subscriptions.RazorpaySubscriptionAddonsBaseRequestBody, callback: (err: INormalizeError | null, data: Addons.RazorpayAddon) => void): void;
    /**
    * Creates a Registration Link
    *
    * @param params
    * @link https://razorpay.com/docs/api/payments/recurring-payments/emandate/create-authorization-transaction#121-create-a-registration-link
    * @link https://razorpay.com/docs/api/payments/recurring-payments/cards/create-authorization-transaction#121-create-a-registration-link
    * @link https://razorpay.com/docs/api/payments/recurring-payments/paper-nach/create-authorization-transaction#121-create-a-registration-link
    * @link https://razorpay.com/docs/api/payments/recurring-payments/upi/create-authorization-transaction#121-create-a-registration-link
    * @link https://razorpay.com/docs/api/payments/recurring-payments/upi-tpv/create-authorization-transaction#121-create-a-registration-link
    *
    */
    createRegistrationLink(params: Subscriptions.RazorpayRegistrationLinkBaseRequestBody): Promise<Subscriptions.RazorpayRegistrationLink>
    createRegistrationLink(params: Subscriptions.RazorpayRegistrationLinkBaseRequestBody, callback: (err: INormalizeError | null, data: Subscriptions.RazorpayRegistrationLink) => void): void;
}

export default subscriptions