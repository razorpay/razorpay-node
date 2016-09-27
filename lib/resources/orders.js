'use strict'

module.exports = function (api) {
  return {
    all(params = {}, callback) {
      let { from, to, count, skip, authorized, receipt } = params

      if (!from) {
        throw new Error('`from` is mandatory')
      }

      if (!to) {
        throw new Error('`to` is mandatory')
      }

      from = +new Date(from)
      to = +new Date(to)
      count = Number(count) || 10
      skip = Number(skip) || 0
      authorized = Boolean(authorized) || false

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

    fetch(orderId, callback) {
      if (!orderId) {
        throw new Error('`order_id` is mandatory')
      }

      return api.get({
        url: `/orders/${orderId}`
      }, callback)
    }
  }
}
