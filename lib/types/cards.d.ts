import { Payments } from "./payments";
import { INormalizeError } from "./api";

declare function cards(api: any): {
    /**
    * Fetch a card given a Card ID
    *
    * @param cardId - The unique identifier of the card
    *
    */
    fetch(cardId: string): Promise<Payments.RazorpayCard>
    fetch(cardId: string, callback: (err: INormalizeError | null, data: Payments.RazorpayCard) => void): void

}

export default cards