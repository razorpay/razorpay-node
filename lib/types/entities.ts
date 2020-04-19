import { Notes, AnyObject } from '.';

export interface Order extends AnyObject {
  id: string;

  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;

  attempts: number;
  status: "created" | "attempted" | "paid";

  notes: [] | Notes;
  receipt: null | string;

  created_at: number;

  // method?: string;
  payment_capture?: boolean;
}
