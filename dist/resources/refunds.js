"use strict";

import { normalizeDate } from "../utils/razorpay-utils.js";
export default function (api) {
  return {
    all(params = {}, callback) {
      let {
        from,
        to,
        count,
        skip,
        payment_id
      } = params;
      let url = "/refunds";
      if (payment_id) {
        url = `/payments/${payment_id}/refunds`;
      }
      if (from) {
        from = normalizeDate(from);
      }
      if (to) {
        to = normalizeDate(to);
      }
      count = Number(count) || 10;
      skip = Number(skip) || 0;
      return api.get({
        url,
        data: {
          from,
          to,
          count,
          skip
        }
      }, callback);
    },
    edit(refundId, params, callback) {
      if (!refundId) {
        throw new Error("refund Id is mandatory");
      }
      return api.patch({
        url: `/refunds/${refundId}`,
        data: params
      }, callback);
    },
    fetch(refundId, params = {}, callback) {
      let {
        payment_id
      } = params;
      if (!refundId) {
        throw new Error("`refund_id` is mandatory");
      }
      let url = `/refunds/${refundId}`;
      if (payment_id) {
        url = `/payments/${payment_id}${url}`;
      }
      return api.get({
        url
      }, callback);
    }
  };
}