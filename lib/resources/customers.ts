'use strict'

import { normalizeNotes } from '../utils/razorpay-utils';
import { ObjectWithNotes } from '../types';

export default function (api) {
  return {
    create(params: ObjectWithNotes, callback) {
      let { notes, ...rest } = params
      let data = Object.assign(rest, normalizeNotes(notes))

      return api.post({
        url: '/customers',
        data
      }, callback)
    },

    edit(customerId: string, params: ObjectWithNotes, callback) {
      let { notes, ...rest } = params
      let data = Object.assign(rest, normalizeNotes(notes))

      return api.put({
        url: `/customers/${customerId}`,
        data
      }, callback)
    },

    fetch(customerId: string, callback) {
      return api.get({
        url: `/customers/${customerId}`
      }, callback)
    },

    fetchTokens(customerId: string, callback) {
      return api.get({
        url: `/customers/${customerId}/tokens`,
      }, callback)
    },

    fetchToken(customerId: string, tokenId: string, callback) {
      return api.get({
        url: `/customers/${customerId}/tokens/${tokenId}`,
      }, callback)
    },

    deleteToken(customerId: string, tokenId: string, callback) {
      return api.delete({
        url: `/customers/${customerId}/tokens/${tokenId}`
      }, callback)
    }
  }
}
