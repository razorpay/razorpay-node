export interface Headers {
  "X-Razorpay-Account"?: string;
};

export type NormalizableDate = number|string;

export interface AnyObject {
  [key: string]: any;
  [key: number]: any;
}

export interface AnyPrimitiveObject {
  [key: string]: string | number | boolean;
  [key: number]: string | number | boolean;
}

export type Notes = AnyPrimitiveObject;

export interface ObjectWithNotes {
  notes?: Notes;

  [key: string]: any;
  [key: number]: any;
};

export interface TransferRequest extends ObjectWithNotes {
  on_hold?: boolean;
}

export interface PaginatedRequest {
  from?: NormalizableDate;
  to?: NormalizableDate;
  count?: number;
  skip?: number;
}

export interface PaginatedRequestWithExtraKeys extends PaginatedRequest, AnyPrimitiveObject {}

export interface PaginatedOrdersRequest extends PaginatedRequestWithExtraKeys {
  authorized: boolean;
  receipt?: string;
}

export interface OrderCreateRequest extends ObjectWithNotes {
  amount: number;
  currency: string;
  receipt?: string;
  payment_capture?: boolean;
  method?: string,
}
