"use strict";

import { NormalizableDate, Notes, AnyPrimitiveObject, PaginatedRequestWithExtraKeys, ObjectWithNotes } from "../types";

/*
 * DOCS: https://razorpay.com/docs/subscriptions/api/
 */

import { normalizeDate, normalizeNotes } from '../utils/razorpay-utils';

export default function plansApi (api) {

  const BASE_URL = "/plans",
        MISSING_ID_ERROR = "Plan ID is mandatory";

  return {
    create(params: ObjectWithNotes, callback) {
      /*
       * Creates a plan
       *
       * @param {Object} params
       * @param {Function} callback
       *
       * @return {Promise}
       */

      let url = BASE_URL,
        { notes, ...rest } = params || {},
        data = Object.assign(rest, normalizeNotes(notes));

      return api.post(
        {
          url,
          data,
        },
        callback
      );
    },

    fetch(planId: string, callback) {
      /*
       * Fetches a plan given Plan ID
       *
       * @param {String} planId
       * @param {Function} callback
       *
       * @return {Promise}
       */

      if (!planId) {
        return Promise.reject(MISSING_ID_ERROR);
      }

      let url = `${BASE_URL}/${planId}`;

      return api.get({ url }, callback);
    },

    all(params: PaginatedRequestWithExtraKeys, callback) {
      /*
       * Get all Plans
       *
       * @param {Object} params
       * @param {Funtion} callback
       *
       * @return {Promise}
       */

      let { from, to, count, skip } = params || {},
        url = BASE_URL;

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
          url,
          data: {
            ...params,
            from,
            to,
            count,
            skip,
          },
        },
        callback
      );
    },
  };
}
