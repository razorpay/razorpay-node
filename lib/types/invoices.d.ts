import { IMap, INormalizeError, INotify, RazorpayPaginationOptions } from './api'
import { Items } from './items';
import { Tokens } from './tokens';

export declare namespace Invoices {

    interface RazorpayInvoiceBaseRequestBody {
        /**
         * Indicates the type of entity. Here, it is `invoice`.
         */
        type: 'invoice' | 'link';
        /**
         * A brief description of the invoice.
         */
        description?: string | null;
        /**
         * Invoice is created in `draft` state when value is set to `1`.
         */
        draft?: string;
        date?: number | null;
        /**
         * You can pass the customer_id in this field, if you are using the 
         * [Customers API](https://razorpay.com/docs/api/customers/). 
         * If not, you can pass the customer object described in the below fields.
         */
        customer_id?: string;
        /**
         * The currency associated with the invoice. 
         */
        currency?: string;
        /**
         * Customer details.
         */
        customer?: RazorpayCustomerDetailsBaseRequestBody;
        /**
         * The unique identifier of the order associated with the invoice.
         */
        order_id?: string;
        /**
         * Details of the line item that is billed in the invoice. 
         * Maximum of 50 line items.
         */
        line_items: RazorpayLineItemsBaseRequestBody[];
        /**
         * Timestamp, in Unix format, at which the invoice will expire.
         */
        expire_by?: number | null;
        /**
         * Defines who handles the SMS notification. `1` (default)
         */
        sms_notify?: boolean | 0 | 1;
        /**
         * Defines who handles the email notification. `1` (default)
         */
        email_notify?: boolean | 0 | 1;
        /**
         * Indicates whether the customer can make a partial payment on the invoice. `false` (default)
         */
        partial_payment?: boolean | 0 | 1;
        /**
         * Any custom notes added to the invoice. Maximum of 2048 characters.
         */
        notes?: IMap<string | number>;
        /**
         * The unique receipt number that you entered for internal purposes.
         */
        receipt?: string | null;
        /**
         * Amount to be paid using the invoice
         */
        amount?: number | string;
    }

    interface RazorpayInvoiceAddressBaseRequestBody {
        /**
         * The first line of the customer's address.
         */
        line1: string;
        /**
         * The second line of the customer's address.
         */
        line2?: string;
        /**
         * The zipcode
         */
        zipcode: string | number;
        /**
         * The city
         */
        city: string;
        /**
         * The state
         */
        state?: string;
        /**
         * The country
         */
        country: string;
    }

    interface RazorpayInvoiceAddress extends RazorpayInvoiceAddressBaseRequestBody {
        id: string;
        type: string;
        primary: boolean;
        contact: string | null;
        name: string | null;
        tag: string | null;
        landmark: string | null;
    }

    interface RazorpayCustomerDetailsBaseRequestBody {
        /**
         * Customer's name. Alphanumeric, with period (.),apostrophe (') and 
         * parentheses allowed. The name must be between 3-50 characters in 
         * length. For example, Gaurav Kumar.
         */
        name?: string | null;
        /**
         * The customer's email address. A maximum length of 64 characters. 
         * For example, `gaurav.kumar@example.com`.
         */
        email?: string | null;
        /**
         * The customer's phone number. A maximum length of 
         * 15 characters including country code. 
         */
        contact?: string | number | null;
        /**
         * Details of the customer's billing address.
         */
        billing_address?: RazorpayInvoiceAddressBaseRequestBody;
        /**
         * Details of the customer's shipping address.
         */
        shipping_address?: RazorpayInvoiceAddressBaseRequestBody;
    }

    interface RazorpayCustomerDetails extends Omit<RazorpayCustomerDetailsBaseRequestBody, 'billing_address' | 'shipping_address'> {
        /**
         * Unique identifier of the customer
         */
        id?: string;
        /**
         * GST number linked to the customer.
         */
        gstin?: string | null;
        /**
         * The customer's name.
         */
        customer_name?: string | null;
        /**
         * The customer's email address.
         */
        customer_email?: string | null;
        /**
         *  The customer's contact number.
         */
        customer_contact?: string | null;
        /**
         * Details of the customer's billing address.
         */
        billing_address?: RazorpayInvoiceAddress;
        /**
         * Details of the customer's shipping address.
         */
        shipping_address?: RazorpayInvoiceAddress;
    }

    interface RazorpayInvoiceCreateRequestBody extends RazorpayInvoiceBaseRequestBody { }

    interface RazorpayInvoiceUpdateRequestBody extends Partial<RazorpayInvoiceBaseRequestBody> { }

    interface RazorpayLineItemsBaseRequestBody extends Partial<Items.RazorpayItemCreateRequestBody> {
        /**
         * Unique identifier that is generated if a new item has been created while creating the invoice.
         */
        id?: string;
        /**
         *  Unique identifier of the item generated using Items API that has been billed in the invoice.
         */
        item_id?: string;
        /**
         * The quantity of the item billed in the invoice. Defaults to `1`.
         */
        quantity?: number;
    }

    interface RazorpayLineItems extends Items.RazorpayItem {
        item_id?: string;
        ref_id: string | null;
        ref_type: string | null;
        gross_amount: number | null;
        tax_amount: number | null;
        taxable_amount: number | null;
        net_amount: number | null;
        taxes: any[];
        quantity: number;
    }

    interface RazorpayInvoice extends RazorpayInvoiceBaseRequestBody {
        /**
         * The unique identifier of the invoice.
         */
        id: string;
        /**
         * Indicates the type of entity.
         */
        entity: string;
        /**
         * Unique number you added for internal reference. 
         * The minimum character length is 1 and maximum is 40.
         */
        invoice_number: string;
        /**
         * Details of the customer.
         */
        customer_details: RazorpayCustomerDetails;
        /**
         * Details of the line item that is billed in the invoice. 
         * Maximum of 50 line items.
         */
        line_items: RazorpayLineItems[];
        /**
         * Unique identifier of a payment made against this invoice.
         */
        payment_id?: string | null;
        /**
         * Timestamp, in Unix format, at which the invoice was issued to the customer.
         */
        issued_at?: number | null;
        /**
         * Timestamp, in Unix format, at which the payment was made.
         */
        paid_at?: number | null;
        /**
         * Timestamp, in Unix format, at which the invoice was cancelled.
         */
        cancelled_at?: number | null;
        /**
         * Timestamp, in Unix format, at which the invoice expired.
         */
        expired_at?: number | null;
        /**
         * The delivery status of the SMS notification for the invoice 
         * sent to the customer.
         */
        sms_status?: 'pending' | 'sent' | null;
        /**
         * The delivery status of the email notification for the invoice 
         * sent to the customer.
         */
        email_status?: 'pending' | 'sent' | null;
        gross_amount?: number;
        tax_amount?: number;
        taxable_amount?: number;
        /**
         * The status of the invoice. Know more about 
         * [Invoice States](https://razorpay.com/docs/payments/invoices/states)
. 
         */
        status?:
        | 'draft'
        | 'issued'
        | 'partially_paid'
        | 'paid'
        | 'cancelled'
        | 'cancelled'
        | 'expired'
        | 'deleted';
        /**
         * Amount paid by the customer against the invoice.
         */
        amount_paid?: number;
        /**
         * The remaining amount to be paid by the customer for the issued invoice.
         */
        amount_due?: number;
        /**
         * The short URL that is generated. Share this link with customers to accept payments.
         */
        short_url?: string | null;
        currency_symbol?: string | null;
        billing_start?: number | null;
        billing_end?: number | null;
        group_taxes_discounts?: boolean;
        terms?: number | null;
        comment?: number | null;
        /**
         * Timestamp, in Unix format, at which the invoice was cancelled.
         */
        created_at: number;
        view_less?: boolean;
        idempotency_key?: any
        ref_num?: any;
        /**
         * Details related to the authorization transaction such as max amount and bank 
         * account information. Pass a value in the `first_payment_amount` parameter 
         * if you want to auto-charge the customer the first payment immediately 
         * after authorization.
         */
        token?: Tokens.RazorpayAuthorizationToken;
    }

    interface RazorpayInvoiceQuery extends RazorpayPaginationOptions {
        type?: string;
        /**
         * The unique identifier of the payment made by the customer against the invoice.
         */
        payment_id?: string;
        /**
         * The unique receipt number that you entered for internal purposes.
         */
        receipt?: string;
        /**
         * The unique identifier of the customer. When used, 
         * fetches all invoices generated for a customer.
         */
        customer_id?: string;
        /**
         * The unique identifier linked to the Subscription. 
         */
        subscription_id?: string;
    }
}

declare function invoices(api: any): {
    /**
     * Creates a invoice
     * 
     * @param params - Check [doc](https://razorpay.com/docs/api/payments/invoices/#create-an-invoice) for required params
     * 
     */
    create(params: Invoices.RazorpayInvoiceCreateRequestBody): Promise<Invoices.RazorpayInvoice>
    create(params: Invoices.RazorpayInvoiceCreateRequestBody, callback: (err: INormalizeError | null, data: Invoices.RazorpayInvoice) => void): void;
    /**
    * Get all invoices
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/invoices/#fetch-multiple-invoices) for required params
    *
    */
    all(params?: Invoices.RazorpayInvoiceQuery): Promise<{
        entity: string;
        count: number;
        items: Array<Invoices.RazorpayInvoice>;
    }>
    all(params: Invoices.RazorpayInvoiceQuery, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Invoices.RazorpayInvoice>
    }) => void): void
    /**
    * Fetches a invoice given Invoice ID
    *
    * @param invoiceId - The unique identifier of the invoice
    *
    */
    fetch(invoiceId: string): Promise<Invoices.RazorpayInvoice>
    fetch(invoiceId: string, callback: (err: INormalizeError | null, data: Invoices.RazorpayInvoice) => void): void;
    /**
    * Edit a invoice given Invoice ID
    *
    * @param invoiceId - The unique identifier of the invoice
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/invoices/#update-an-invoice) for required params
    * 
    */
    edit(invoiceId: string, params: Invoices.RazorpayInvoiceUpdateRequestBody): Promise<Invoices.RazorpayInvoice>
    edit(invoiceId: string, params: Invoices.RazorpayInvoiceUpdateRequestBody, callback: (err: INormalizeError | null, data: Invoices.RazorpayInvoice) => void): void;

    /**
    * Issue an invoice
    *
    * @param invoiceId - The unique identifier of the invoice
    *  
    */
    issue(invoiceId: string): Promise<Invoices.RazorpayInvoice>
    issue(invoiceId: string, callback: (err: INormalizeError | null, data: Invoices.RazorpayInvoice) => void): void;
    /**
    * Delete an invoice
    *
    * @param invoiceId - The unique identifier of the invoice
    * 
    */
    delete(invoiceId: string): Promise<[]>
    delete(invoiceId: string, callback: (err: INormalizeError | null, data: []) => void): void;
    /**
    * Cancel an invoice
    *
    * @param invoiceId - The unique identifier of the invoice
    * 
    */
    cancel(invoiceId: string): Promise<Invoices.RazorpayInvoice>
    cancel(invoiceId: string, callback: (err: INormalizeError | null, data: Invoices.RazorpayInvoice) => void): void;
    /**
    * Send notification
    *
    * @param invoiceId - The unique identifier of the invoice
    * @param medium - Possible values: `sms`, `email`
    * 
    */
    notifyBy(invoiceId: string, medium: INotify): Promise<{ success: boolean }>
    notifyBy(invoiceId: string, medium: INotify, callback: (err: INormalizeError | null, data: { success: boolean }) => void): void;
}

export default invoices