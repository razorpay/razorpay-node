'use strict'

module.exports = function (api) {
  return {
    fetchAll(params = {}, callback) {
      let { from, to, count, skip, payment_id } = params
      let url = '/refunds'

      if (!from) {
        throw new Error('`from` is mandatory')
      }

      if (!to) {
        throw new Error('`to` is mandatory')
      }

      if (payment_id) {
        url = `/payments/${payment_id}/refunds`
      }

      from = +new Date(from)
      to = +new Date(to)
      count = Number(count) || 10
      skip = Number(skip) || 0

      return api.get({
        url,
        data: {
          from,
          to,
          count,
          skip
        }
      }, callback)
    },

    fetch(refundId, params = {}, callback) {
      if (!refundId) {
        throw new Error('`refund_id` is mandatory')
      }

      let url = `/refunds/${refundId}`

      if (params.payment_id) {
        url = `/payments/${payment_id}/${url}`
      }

      return api.get({
        url
      }, callback)
    }
  }
}
