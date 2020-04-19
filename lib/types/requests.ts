import { Order } from './entities';
import { OnlyMandatory, MakeAnyObject } from './utilities';

export type OrderRequest = MakeAnyObject<
  OnlyMandatory<
    Pick<
      Order,
      "amount" | "currency" | "receipt" | "payment_capture" | "notes"
    >,
    "amount" | "currency"
  >
>;
