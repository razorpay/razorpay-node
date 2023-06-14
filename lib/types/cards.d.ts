import { Payments } from "./payments";
import { INormalizeError } from "./api";

export declare namespace Cards {
  interface RazorpayCardReferenceNumberBaseRequest {
    /**
     *  The tokenised card number whose PAR or network reference id should be retrieved.
     */
    number: string;
    /**
     * Determines if the card is saved as a token. possible value is `true` or `false`
     */
    tokenised?: boolean;
  }

  interface RazorpayCardReferenceTokenBaseRequest {
    /**
     * The token whose PAR or network reference id should be retrieved.
     */
    token: string;
  }

  interface RazorpayCardReference {
    /**
     *  The card network.
     */
    network?: Network;
    payment_account_reference: string | null;
    network_reference_id: string | null;
    card_reference_number?: string | null;
    provider: string;
  }

  type Network = 
  | 'Mastercard'
  | 'RuPay'
  | 'Visa'
}

declare function cards(api: any): {
    /**
    * Fetch a card given a Card ID
    *
    * @param cardId - The unique identifier of the card
    *
    */
    fetch(cardId: string): Promise<Payments.RazorpayCard>
    fetch(cardId: string, callback: (err: INormalizeError | null, data: Payments.RazorpayCard) => void): void
    /**
    * Retrieve the card reference number for a specific card:
    *
    * @param params - The card/token number whose PAR or network reference id should be retrieved.
    *
    */
    requestCardReference(params: Cards.RazorpayCardReferenceNumberBaseRequest | Cards.RazorpayCardReferenceTokenBaseRequest): Promise<Cards.RazorpayCardReference>
    requestCardReference(params: Cards.RazorpayCardReferenceNumberBaseRequest | Cards.RazorpayCardReferenceTokenBaseRequest, callback: (err: INormalizeError | null, data: Cards.RazorpayCardReference) => void): void

}

export default cards