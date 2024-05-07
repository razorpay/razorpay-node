import { INormalizeError } from "./api";

export declare namespace Iins {
    interface RazorpayIin {
        /**
         * The Issuer Identification Number (IIN). The starting 6 digits of credit or debit card number.
         */
        iin: string;
        /**
         * The name of the entity
         */
        entity: string;
        /**
         * The card network
         */
        network: Network | null;
        /**
         * The card type for the given IIN. The card payment pricing may differ based on the card type.
         */
        type: CardType | null;
        /**
         * The card sub-type for the given IIN. The card payment pricing may differ based on the card sub-type.
         */
        sub_type: subType | null;
        /**
         * The 4-character issuer code unique to each issuing bank in India. For example, `SBIN`.
         */
        issuer_code: string;
        /**
         * The name of the issuing bank. Available for cards issued in India only. For example, `State Bank of India`.
         */
        issuer_name: string;
        /**
         * Determines whether the card is international (issued outside India) or domestic.
         * 
         * `true`: Card issued outside India.
         * 
         * `false`: Card issued within India.
         */
        international: boolean;
        is_tokenized: boolean;
        card_iin: string | null;
        /**
         *  A JSON object which provides information about the applicability of EMI on the IIN.
         */
        emi: {
            /**
             * Determines whether the card is eligible for EMI payments or not. Possible values `true` or `false`
             */
            available: boolean;
        }
        /**
         * A JSON object which provides information about the applicability of recurring payments on the IIN.
         */
        recurring: {
            /**
             * Determines whether the card is eligible for recurring payments or not. Possible values `true` or `false`
             */
            available: boolean;
        }
        /**
         * Array which lists the possible authentication types for which the IIN is eligible
         * 
         * `type: 3ds`: Indicates that the card IIN supports normal 3ds payments.
         * 
         * `type: otp`: Indicates that the card IIN supports native OTP payments. Native OTP gives you flexibility to 
         *  accept the OTP entered by the cardholder on your screen.
         */
        authentication_types: {
            type: string;
        }[]
    }

    type Network = 
    | 'Visa'
    | 'RuPay'
    | 'MasterCard'
    | 'American Express'
    | 'Diners Club'
    | 'Bajaj Finserv'
    | 'Maestro'
    | 'JCB'
    | 'Union Pay'
    | 'Unknown'

    type CardType = 
    | 'credit'
    | 'debit'
    | 'prepaid'
    | 'unknown'

    type subType = 
    | 'consumer'
    | 'business'
    | 'unknown'

    type ListType = {flow: string;} | {sub_type: string;}

    interface RazorpayIinList {
        count: number; 
        iins : string[];
    }
}

declare function iins(api: any): {
    /**
    * Fetch the properties of the card using token IIN
    *
    * @param accountId -  The token IIN.
    *
    */
    fetch(tokenIin: string): Promise<Iins.RazorpayIin>
    fetch(tokenIin: string, callback: (err: INormalizeError | null, data: Iins.RazorpayIin) => void): void;
    /**
     * Fetch all IINs supporting `native otp` or `business sub-type`
     * 
     * @param params - Check [doc](https://razorpay.com/docs/api/payments/cards/iin-api/#fetch-all-iins-supporting-native-otp) for required params
     */
    all(params: Iins.ListType): Promise<Iins.RazorpayIinList>
    all(params: Iins.ListType, callback: (err: INormalizeError | null, data: Iins.RazorpayIinList) => void): void;
}

export default iins