"use strict";

import { TransferRequest, ObjectWithNotes, PaginatedRequestWithExtraKeys } from '../types';

import { normalizeDate, normalizeBoolean, normalizeNotes } from '../utils/razorpay-utils';

interface AllRequest extends PaginatedRequestWithExtraKeys {
  payment_id?: string;
  recipient_settlement_id?: string;
};

export default function (api) {
  return {
    all(params: AllRequest, callback) {
      let { from, to, count, skip, payment_id, recipient_settlement_id } = params || {};
      let url = '/transfers'

      if (payment_id) {
        url = `/payments/${payment_id}/transfers`
      }

      if (from) {
        from = normalizeDate(from)
      }

      if (to) {
        to = normalizeDate(to)
      }

      count = Number(count) || 10
      skip = Number(skip) || 0

      return api.get({
        url,
        data: {
          from,
          to,
          count,
          skip,
          recipient_settlement_id,
        }
      }, callback)
    },

    fetch(transferId: string, callback) {
      if (!transferId) {
        throw new Error('`transfer_id` is mandatory')
      }

      let url = `/transfers/${transferId}`

      return api.get({
        url
      }, callback)
    },

    create(params: TransferRequest, callback) {
      let { notes, ...rest } = params
      let data = Object.assign(rest, normalizeNotes(notes))

      if (typeof data.on_hold !== "undefined") {
        data.on_hold = normalizeBoolean(data.on_hold);
      }

      return api.post({
        url: '/transfers',
        data
      }, callback)
    },

    edit(transferId: string, params: TransferRequest, callback) {
      let { notes, ...rest } = params
      let data = Object.assign(rest, normalizeNotes(notes))

      if (typeof data.on_hold !== "undefined") {
        data.on_hold = normalizeBoolean(data.on_hold)
      }

      return api.patch({
        url: `/transfers/${transferId}`,
        data
      }, callback)
    },

    reverse(transferId: string, params: ObjectWithNotes, callback) {
      if (!transferId) {
        throw new Error('`transfer_id` is mandatory')
      }

      let { notes, ...rest } = params
      let data = Object.assign(rest, normalizeNotes(notes))
      let url = `/transfers/${transferId}/reversals`

      return api.post({
        url,
        data
      }, callback)
    },
  }
}

