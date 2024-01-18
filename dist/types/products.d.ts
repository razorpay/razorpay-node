import { Orders } from "../../dist/types/orders";
import { IMap, INormalizeError, PartialOptional, RazorpayPaginationOptions } from "./api";

export declare namespace Products {
    interface RazorpayProductBaseRequestBody {
        /**
         * The product(s) to be configured. Possible values: `payment_gateway` or `payment_links`
         */
        product_name: string;
        /**
         * Pass this parameter to accept terms and conditions. Send this parameter along with the ip parameter when the tnc is accepted.
         */
        tnc_accepted: boolean;
        /**
         * he IP address of the merchant while accepting the terms and conditions. Send this parameter along with the `tnc_accepted` parameter when the `tnc` is accepted.
         */
        ip: string;
    }

    interface RazorpayProductCreateRequestBody extends RazorpayProductBaseRequestBody { }

    interface RazorpayProductUpdateRequestBody extends PartialOptional<Omit<RazorpayProductBaseRequestBody, 'product_name'>, 'tnc_accepted' | 'ip'> {
        /**
         * This denotes the notifications settings
         */
        notifications?: Notifications;
        /**
         *  The checkout form of the payment capture
         */
        checkout?: Checkout;
        /**
         * This denotes the payment refund settings
         */
        refund?: {
            /**
             * Speed at which the refund is to be processed
             */
            default_refund_speed: string;
        }
        /**
         *  The Settlement settings object.
         */
        settlements?: Omit<Orders.RazorpayBankAccountBaseRequestBody, 'beneficiary_mobile' | 'account_type'>;
        /**
         * Details of the payment method you want to enable for the product.
         */
        payment_methods?: PaymentMethods;
    }

    interface PaymentMethods {
        /**
         * The payment method to be enabled.
         */
        netbanking: Netbanking;
        cards: Cards;
        wallet: Wallet;
        paylater: Paylater;
        upi: Upi;
        emi: Emi;
    }

    interface Netbanking {
        enabled: boolean;
        instrument: Instrument[];
    }

    interface Instrument {
        type: string;
        bank: string[];
    }

    interface Cards {
        enabled: boolean;
        instrument: InstrumentCard[];
    }

    interface InstrumentCard {
        issuer: string;
        type: string[];
    }

    interface Wallet {
        enabled: boolean;
        instrument: string[];
    }

    interface Paylater {
        enabled: boolean;
        instrument: string[];
    }

    interface Upi {
        enabled: boolean;
        instrument: string[];
    }

    interface Emi {
        enabled: boolean;
        instrument: InstrumentEmi[];
    }

    interface InstrumentEmi {
        type: string;
        partner: string[];
    }

    interface RazorpayProduct extends RazorpayProductBaseRequestBody {
        /**
         * The configuration of the product requested by the user that is yet to be set as active.
         */
        requested_configuration: {
            payment_methods: PaymentMethods[];
        }
        /**
         * The configuration of the product that has been set as active.
         */
        active_configuration: ActiveConfiguration;
        /**
         * The list of requirements to be enabled for this product or some of the configurations under this product.
         */
        requirements: Requirement[]
        tnc: Tnc;
        id: string;
        activation_status: string;
        account_id: string;
        /**
         * The Unix timestamp at which the product configuration is requested.
         */
        requested_at: number;
    }

    interface ActiveConfiguration {
        payment_capture: PaymentCapture;
        settlements: Settlements;
        checkout: Checkout;
        refund: {
            default_refund_speed: string;
        }
        notifications: Notifications;
        payment_methods: PaymentMethods;
    }

    interface PaymentCapture {
        mode: string;
        refund_speed: string;
        automatic_expiry_period: number;
    }

    interface Settlements {
        account_number: string;
        ifsc_code: string;
        beneficiary_name: string;
    }

    interface Checkout {
        theme_color?: string;
        flash_checkout?: boolean;
    }

    interface Notifications {
        /**
         * The WhatsApp notifications you receive regarding payments, settlements, daily payment reports, webhooks, etc.
         */
        whatsapp?: boolean;
        /**
         *  The SMS notifications you receive regarding payments, settlements, daily payment reports, webhooks,
         */
        sms?: boolean;
        /**
         * he email addresses that will receive notifications regarding 
         * payments, settlements, daily payment reports, webhooks, and so on.
         */
        email?: string[];
    }

    interface Requirement {
        /**
         *  The field which is in issue or missing. The JSON key path in resolution URL.
         */
        field_reference: string;
        /**
         * The URL to address the requirement. The API endpoint to be used for updating missing fields or documents.
         */
        resolution_url: string;
        /**
         * The status of the requirement.
         */
        status: string;
        /**
         * The reason code for showing in the requirement
         */
        reason_code: string;
    }

    interface Tnc {
        id: string;
        accepted: boolean;
        accepted_at: number;
    }

    interface RazorpayProductTnc {
        /**
         *  The name of the entity.
         */
        entity: string;
        /**
         *  Determines what business unit the terms and conditions belong to.
         */
        product_name: string;
        /**
         * Unique identifier of the terms and conditions belonging to a specific business unit.
         */
        id: string;
        /**
         * The terms and conditions content.
         */
        tnc: ProductsTnc;
        /**
         * The timestamp in Unix format, when the terms and conditions were created/last updated.
         */
        last_published_at: number;
    }

    interface ProductsTnc {
        terms: string;
        privacy: string;
        agreement: string;
    }
}

declare function products(api: any): {
    /**
     * Request a Product Configuration
     *
     * @param params - Check [doc](https://razorpay.com/docs/api/partners/product-configuration/#request-parameter) for required params
     * @param accountId - The unique identifier of the account. 
     */
    requestProductConfiguration(accountId: string, params: Products.RazorpayProductCreateRequestBody): Promise<Products.RazorpayProduct>
    requestProductConfiguration(accountId: string, params: Products.RazorpayProductCreateRequestBody, callback: (err: INormalizeError | null, data: Products.RazorpayProduct) => void): void;
    /**
    * Fetch a Product Configuration
    *
    * @param accountId - The unique identifier of the account.
    * @param productId - The unique identifier of a product.
    *
    */
    fetch(accountId: string, productId: string): Promise<Products.RazorpayProduct>
    fetch(accountId: string, productId: string, callback: (err: INormalizeError | null, data: Products.RazorpayProduct) => void): void;
    /**
    * Update a Product Configuration
    *
    * @param accountId - The unique identifier of the account.
    * @param productId - The unique identifier of a product.
    * @param params - Check [doc](https://razorpay.com/docs/api/partners/product-configuration/#update-a-product-configuration) for required params
    */
    edit(accountId: string, productId: string, params: Products.RazorpayProductUpdateRequestBody): Promise<Products.RazorpayProduct>
    edit(accountId: string, productId: string, params: Products.RazorpayProductUpdateRequestBody, callback: (err: INormalizeError | null, data: Products.RazorpayProduct) => void): void;
    /**
    * Fetch Terms and Conditions for a Sub-Merchant
    *
    * @param productName - The product family for which the relevant product to be requested for the sub-merchant. Possible value is `payments`.
    * 
    */
    fetchTnc(productName: string): Promise<Products.RazorpayProductTnc>
    fetchTnc(productName: string, callback: (err: INormalizeError | null, data: Products.RazorpayProductTnc) => void): void;
}

export default products