'use strict'


import { ObjectWithNotes, PaginatedRequestWithExtraKeys } from "../types";

import { normalizeDate, normalizeBoolean, normalizeNotes } from '../utils/razorpay-utils';

const ID_REQUIRED_MSG = '`payment_id` is mandatory';

export default function (api) {
  return {
    all(params: PaginatedRequestWithExtraKeys, callback) {
      let { from, to, count, skip } = params || {};

      if (from) {
        from = normalizeDate(from);
      }

      if (to) {
        to = normalizeDate(to);
      }

      count = Number(count) || 10;
      skip = Number(skip) || 0;

      return api.get(
        {
          url: "/payments",
          data: {
            from,
            to,
            count,
            skip,
          },
        },
        callback
      );
    },

    fetch(paymentId: string, callback) {
      if (!paymentId) {
        throw new Error("`payment_id` is mandatory");
      }

      return api.get(
        {
          url: `/payments/${paymentId}`,
        },
        callback
      );
    },

    capture(paymentId: string, amount: number, currency: string, callback) {
      if (!paymentId) {
        throw new Error("`payment_id` is mandatory");
      }

      if (!amount) {
        throw new Error("`amount` is mandatory");
      }

      const payload = {
        amount,
        currency,
      };

      return api.post(
        {
          url: `/payments/${paymentId}/capture`,
          data: payload,
        },
        callback
      );
    },

    refund(paymentId: string, params: ObjectWithNotes, callback) {
      let { notes, ...otherParams } = params || {};

      if (!paymentId) {
        throw new Error("`payment_id` is mandatory");
      }

      let data = Object.assign(otherParams, normalizeNotes(notes));
      return api.post(
        {
          url: `/payments/${paymentId}/refund`,
          data,
        },
        callback
      );
    },

    transfer(paymentId: string, params: ObjectWithNotes, callback) {
      if (!paymentId) {
        throw new Error("`payment_id` is mandatory");
      }

      let { notes, ...otherParams } = params || {};

      let data = Object.assign(otherParams, normalizeNotes(notes));

      if (data.transfers) {
        let transfers = data.transfers;
        transfers.forEach(function (transfer) {
          transfer.on_hold = normalizeBoolean(!!transfer.on_hold);
        });
      }
      return api.post(
        {
          url: `/payments/${paymentId}/transfers`,
          data,
        },
        callback
      );
    },

    bankTransfer(paymentId: string, callback) {
      if (!paymentId) {
        return Promise.reject(ID_REQUIRED_MSG);
      }

      return api.get(
        {
          url: `/payments/${paymentId}/bank_transfer`,
        },
        callback
      );
    },
  };
}
