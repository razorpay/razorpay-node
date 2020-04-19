'use strict'

import { PaginatedOrdersRequest, OrderCreateRequest } from "../types";

import { normalizeDate, normalizeBoolean, normalizeNotes } from '../utils/razorpay-utils';
import { OrderRequest } from "../types/requests";

export default function (api) {
  return {
    all(params: PaginatedOrdersRequest, callback) {
      let { from, to, count, skip, authorized, receipt } = params || {}

      if (from) {
        from = normalizeDate(from)
      }

      if (to) {
        to = normalizeDate(to)
      }

      count = Number(count) || 10
      skip = Number(skip) || 0
      authorized = normalizeBoolean(authorized)

      return api.get({
        url: '/orders',
        data: {
          from,
          to,
          count,
          skip,
          authorized,
          receipt
        }
      }, callback)
    },

    fetch(orderId: string, callback) {
      if (!orderId) {
        throw new Error('`order_id` is mandatory')
      }

      return api.get({
        url: `/orders/${orderId}`
      }, callback)
    },

    create(order: OrderRequest) {
      if (!order) {
        throw new Error('order is required');
      }

      const { amount, payment_capture, method } = order;

      if (!(amount || (method === 'emandate' && amount === 0))) {
        throw new Error('`amount` is mandatory')
      }

      const payload: OrderRequest = {
        ...order,
        ...normalizeNotes(order.notes),
        
        currency: order.currency || "INR",
        payment_capture: normalizeBoolean(payment_capture),
      };

      return api.postPromise({
        url: '/orders',
        data: payload
      });
    },

    fetchPayments(orderId: string, callback) {
      if (!orderId) {
        throw new Error('`order_id` is mandatory')
      }

      return api.get({
        url: `/orders/${orderId}/payments`
      }, callback)
    }
  }
}
