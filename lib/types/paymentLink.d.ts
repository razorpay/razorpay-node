import { IMap, INormalizeError, INotify, RazorpayPaginationOptions, PartialOptional } from "./api";
import { Customers } from "./customers";
import { Transfers } from "./transfers";

export declare namespace PaymentLinks {

    interface RazorpayPaymentLinkBaseRequestBody {
        /**
         * Must be set to `true` for creating UPI Payment Link.
         */
        upi_link?: boolean;
        /**
         * Amount to be paid using the Payment Link. Must be in the smallest unit of the currency. 
         * For example, if you want to receive a payment of ₹299.95, you must enter the value 29995.
         */
        amount: number | string;
        /**
         * A three-letter ISO code for the currency in which you want to accept the payment. 
         * For example, `INR`.
         */
        currency?: string;
        /**
         * Indicates whether customers can make partial payments using the Payment Link.
         * 
         * `true`: Customer can make partial payments.
         * 
         * `false` (default): Customer cannot make partial payments.
         */
        accept_partial?: boolean;
        expire_by?: number;
        reference_id?: string;
        /**
         * Minimum amount, in currency subunits, that must be paid by the customer as the first partial payment. 
         * Default value is `100`. Default currency is `INR`. For example, if an amount of ₹7,000 is to be received 
         * from the customer in two installments of #1 - ₹5,000, #2 - ₹2,000, then you can set this value as `500000`. 
         * Must be passed along with accept_partial parameter.
         */
        first_min_partial_amount?: number;
        /**
         * A brief description of the Payment Link. The maximum character limit supported is 2048.
         */
        description?: string;
        /**
         * Customer details
         */
        customer: Pick<Customers.RazorpayCustomerCreateRequestBody, 'name' | 'email' | 'contact'>;
        /**
         * Defines who handles Payment Link notification.
         */
        notify?: {
            /**
             * Defines who handles the email notification.
             */
            email?: boolean;
            /**
             * Defines who handles the SMS notification.
             */
            sms?: boolean;
            whatsapp?: boolean;
        },
        /**
         * Used to send remindersfor the Payment Link.
         */
        reminder_enable?: boolean;
        /**
         * Key-value pair that can be used to store additional information about the entity.
         */
        notes?: IMap<string | number>;
        /**
         * If specified, adds a redirect URL to the Payment Link. Once customers completes the payment, 
         * they are redirected to the specified URL.
         */
        callback_url?: string;
        /**
         * If callback_url parameter is passed, callback_method must be passed with the value `get`.
         */
        callback_method?: string;
    }

    interface RazorpayPaymentLinkCreateRequestBody extends RazorpayPaymentLinkBaseRequestBody { }

    interface RazorpayPaymentLinkUpdateRequestBody extends Pick<RazorpayPaymentLinkBaseRequestBody, 'accept_partial' | 'reference_id' | 'expire_by' | 'notes' | 'reminder_enable'> { }

    interface RazorpayPaymentLink extends RazorpayPaymentLinkBaseRequestBody {
        /**
         * Amount paid by the customer.
         */
        amount_paid: number;
        /**
         * Timestamp, in Unix, at which the Payment Link was cancelled by you.
         */
        cancelled_at: number;
        /**
         * Timestamp, in Unix, at which the Payment Link expired.
         */
        expired_at: number;
        /**
         * The unique identifier of the Payment Link
         */
        id: string;
        /**
         * Payment details such as amount, payment ID, Payment Link ID and more. 
         * This array gets populated only after the customer makes a payment. 
         * Until then, the value is `null`.
         */
        payments: RazorpayPaymentBaseRequestBody | null;
        reminders: {
            status: string;
        };
        /**
         * The unique short URL generated for the Payment Link.
         */
        short_url: string;

        source?: string;
        source_id?: string;
        /**
         * Displays the current state of the Payment Link
         */
        status: 'created' | 'partially_paid' | 'expired' | 'cancelled' | 'paid';
        /**
         * Timestamp, in Unix, indicating when the Payment Link was updated.
         */
        updated_at: number;
        /**
         * A unique identifier for the user role through which the Payment Link was created.
         * For example, `HD1JAKCCPGDfRx`.
         */
        user_id: string;
        created_at: string;
    }

    interface RazorpayPaymentBaseRequestBody {
        /**
         * The amount paid by the customer using the Payment Link.
         */
        amount: string;
        /**
         * Timestamp, in Unix, indicating when the payment was made.
         */
        created_at: string;
        /**
         * The payment method used to make the payment.
         */
        method: 'card' | 'netbanking' | 'wallet' | 'emi' | 'upi' | 'bank_transfer';
        /**
         * Unique identifier of the payment made against the Payment Link.
         */
        payment_id: string;
        /**
         * Unique identifier of the Payment Link. For example, `plink_ERgihyaAAC0VNW`
         */
        plink_id: string;
        /**
         * The payment state.
         */
        status: 'captured' | 'failed';
        /**
         * Timestamp, in Unix, indicating when the payment was updated.
         */
        updated_at: number;
    }

    interface RazorpayPaymentLinkAdvanceOption extends RazorpayPaymentLinkBaseRequestBody {
        options:
        | RazorpayTransferPayment
        | RazorpayOffer
        | RazorpayCustomizeCheckout
        | RazorpayBankAccount
        | RazorpayNetBankingPayment
    }

    interface RazorpayBankAccount {
        method?: string;
        bank_account: {
            account_number: string;
            name: string;
            ifsc: string;
        }
        /**
         * Details of the products.
         * Check [doc](https://razorpay.com/docs/api/orders/products/create-pl-with-details/)
         */
        products: Products;
    }

    interface Products {
        type: string;
        plan: string;
        folio: string;
        amount: string;
        option: string;
        scheme: string;
        receipt: string;
        mf_member_id: string;
        mf_user_id: string;
        mf_partner: string;
        mf_investment_type: string;
        mf_amc_code: string;
    }

    interface RazorpayNetBankingPayment {
        order: RazorpayBankAccount
    }

    interface RazorpayTransferPayment {
        /**
         * Options to configure the transfer in the Payment Link. 
         * Parent parameter under which the order child parameter must be passed.
         */
        order: {
            /**
             * Pass transfer details such as amount, account, linked account information and more
             */
            transfers?: PartialOptional<Transfers.RazorpayOrderCreateRequestBody, 'on_hold'>[];
        }
    }

    interface RazorpayOffer {
        /**
          * Options to associate the offer_id with the Payment Link. 
          * Parent parameter under which the `order` child parameter must be passed.
          */
        order: {
            /**
             * Unique identifier of the offer
             */
            offers: string[];
        }
    }

    interface RazorpayCustomizeCheckout {
        checkout:
        | RazorpayCheckoutDisplayPayment
        | RazorpayCheckoutRenameLabels
        | RazorpayCheckoutChangeBusinessName
        | RazorpayCheckoutPrefillCard
        | RazorpayCheckoutPrefillNetBanking
        | RazorpayCheckoutPrefillWallet
        | RazorpayCheckoutPrefillVpa
        | RazorpayCheckoutPaymentMethod
        | RazorpayCheckoutReadonly
        | RazorpayCheckoutThematicChange
    }

    interface RazorpayCheckoutDisplayPayment {
        config: {
          display: {
            blocks: {
              banks: {
                name: string;
                instruments: [
                  {
                    method: string,
                    banks: string[]
                  }
                ];
              };
            };
            sequence: string[];
            preferences: {
              show_default_blocks: boolean;
            };
          };
        };
      }

    interface RazorpayCheckoutRenameLabels {
        /**
         * Options to rename the labels for partial payment fields in the checkout form. 
         * Parent parameter under which the `checkout` and `partial_payment` child parameters 
         * must be passed.
         */
        partial_payment: {
            /**
             * Changes the label for the `Minimum first amount` field.
             */
            min_amount_label: string;
            /**
             * Changes the label for the `Make payment in parts` field.
             */
            partial_amount_label: string;
            /**
             * Changes the label for the `Pay some now and the remaining later` field.
             */
            partial_amount_description: string;
            /**
             * Changes the label for the `Pay in full` field.
             */
            full_amount_label: string;
        }
    }

    interface RazorpayCheckoutChangeBusinessName {
        /**
         * Used to change the business name that appears on the Checkout section 
         * of the Payment Link's payment request page.
         */
        name?: string;
        description?: string;
    }

    interface RazorpayCheckoutPrefillCard {
        /**
         * Prefills the payment method and related details on Checkout.
         */
        prefill: {
            /**
             * Pre-selection of the payment method for the customer. 
             * Will only work if contact and email are also pre-filled
             */
            method?: 'card' | 'netbanking' | 'wallet' | 'upi';
            /**
             * The name of the owner, who owns the card. 
             * This is usually found printed in front of the card.
             */
            'card[name]': string;
            /**
             * Unformatted card number. This should be 16 digits in total.
             */
            'card[number]': string;
            /**
            * Expiry month and year for card. This should be in MM/YY format.
            */
            'card[expiry]': string;
            'card[cvv]': string;
        }
    }

    interface RazorpayCheckoutPrefillNetBanking {
        /**
         * Prefills the payment method and related details on Checkout.
         */
        prefill: {
            /**
             * Pre-selection of the payment method for the customer. 
             * Will only work if contact and email are also pre-filled
             */
            method?: 'card' | 'netbanking' | 'wallet' | 'upi';
            /**
             * Prefills the customer's bank code. The value must be entered in upper case. 
             * For example, for HDFC bank, it should be "HDFC".
             */
            bank: string;
        }
    }

    interface RazorpayCheckoutPrefillWallet {
        /**
         * Prefills the payment method and related details on Checkout.
         */
        prefill: {
            /**
             * Pre-selection of the payment method for the customer. 
             * Will only work if contact and email are also pre-filled
             */
            method?: 'card' | 'netbanking' | 'wallet' | 'upi';
            /**
             * Wallet code used to authorize the payment requested.
             */
            wallet: string;
        }
    }

    interface RazorpayCheckoutPrefillVpa {
        /**
         * Prefills the payment method and related details on Checkout.
         */
        prefill: {
            /**
             * Pre-selection of the payment method for the customer. 
             * Will only work if contact and email are also pre-filled
             */
            method?: 'card' | 'netbanking' | 'wallet' | 'upi';
            /**
             * UPI ID for making the payment on the UPI app.
             */
            vpa: string;
        }
    }

    interface RazorpayCheckoutPaymentMethod {
        /**
         * Options to display or hide payment methods on the Checkout section. 
         * Parent parameter under which the checkout and method child parameters must be passed.
         */
        method: {
            netbanking: boolean | 1 | 0 | string;
            card: boolean | 1 | 0 | string;
            upi: boolean | 1 | 0 | string;
            wallet: boolean | 1 | 0 | string;
        }
    }

    interface RazorpayCheckoutReadonly {
        readonly: {
            email?: boolean | 1 | 0;
            contact?: boolean | 1 | 0;
        }
    }

    interface RazorpayCheckoutThematicChange {
        theme: {
            hide_topbar: boolean;
        }
    }
}

declare function paymentLink(api: any): {
    /**
    * Create payment link
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/payment-links#create-payment-link) for required params.
    * 
    * @link https://razorpay.com/docs/api/payments/payment-links
    * @link https://razorpay.com/docs/api/payments/payment-links/customise
    * @link https://razorpay.com/docs/api/payments/payment-links/advanced-options
    */
    create(params: PaymentLinks.RazorpayPaymentLinkCreateRequestBody | PaymentLinks.RazorpayPaymentLinkAdvanceOption): Promise<PaymentLinks.RazorpayPaymentLink>
    create(params: PaymentLinks.RazorpayPaymentLinkCreateRequestBody | PaymentLinks.RazorpayPaymentLinkAdvanceOption, callback: (err: INormalizeError | null, data: PaymentLinks.RazorpayPaymentLink) => void): void
    /**
    * Get all paymentLinks
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/payments/payment-links#fetch-all-payment-links) for required params.
    *
    */
    all(params?: RazorpayPaginationOptions): Promise<{
        payment_links: Array<PaymentLinks.RazorpayPaymentLink>;
    }>
    all(params: RazorpayPaginationOptions, callback: (err: INormalizeError | null, data: {
        payment_links: Array<PaymentLinks.RazorpayPaymentLink>;
    }) => void): void
    /**
    * Fetch a paymentLink given paymentLink ID
    *
    * @param paymentLinkId - The unique identifier of the paymentlink.
    *
    */
    fetch(paymentLinkId: string): Promise<PaymentLinks.RazorpayPaymentLink>
    fetch(paymentLinkId: string, callback: (err: INormalizeError | null, data: PaymentLinks.RazorpayPaymentLink) => void): void
    /**
    * Edit a paymentLink given paymentLink ID
    *
    * @param paymentLinkId - The unique identifier of the paymentlink.
    * @param param - Check [doc](https://razorpay.com/docs/api/payments/payment-links#update-payment-link) for required params.
    */
    edit(paymentLinkId: string, params: PaymentLinks.RazorpayPaymentLinkUpdateRequestBody): Promise<PaymentLinks.RazorpayPaymentLink>
    edit(paymentLinkId: string, params: PaymentLinks.RazorpayPaymentLinkUpdateRequestBody, callback: (err: INormalizeError | null, data: PaymentLinks.RazorpayPaymentLink) => void): void
    /**
    * Cancel a payment link
    *
    * @param paymentLinkId - The unique identifier of the paymentlink.
    * 
    */
    cancel(paymentLinkId: string): Promise<PaymentLinks.RazorpayPaymentLink>
    cancel(paymentLinkId: string, callback: (err: INormalizeError | null, data: PaymentLinks.RazorpayPaymentLink) => void): void
    /**
    * Send notification
    *
    * @param paymentLinkId - The unique identifier of the paymentlink.
    * @param medium - Possible values: `sms`, `email`
    * 
    */
    notifyBy(paymentLinkId: string, medium: INotify): Promise<{ success: boolean }>
    notifyBy(paymentLinkId: string, medium: INotify, callback: (err: INormalizeError | null, data: { success: boolean }) => void): void
}

export default paymentLink