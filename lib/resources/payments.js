
module.exports = function (api) {
  return {
    fetchAll({ from, to, count, skip }, callback) {
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

      return api.get({
        url: '/payments',
        data: {
          from,
          to,
          count,
          skip
        }
      }, callback)
    },

    fetch(paymentId, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory')
      }

      return api.get({
        url: `/${resourceURL}/${paymentId}`
      }, callback)
    },

    capture(paymentId, amount, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory')
      }

      if (!amount) {
        throw new Error('`amount` is mandatory')
      }

      return api.post({
        url: `/payments/${paymentId}/capture`,
        data: {
          amount
        }
      }, callback)
    },

    refund(paymentId, params = {}, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory')
      }

      return api.post({
        url: `/payments/${paymentId}/refund`,
        data: params
      }, callback)
    }
  }
}
