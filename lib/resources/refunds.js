
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
        url: '/refunds',
        data: {
          from,
          to,
          count,
          skip
        }
      }, callback)
    },

    fetch(refundId, callback) {
      if (!refundId) {
        throw new Error('`refund_id` is mandatory')
      }

      return api.get({
        url: `/refunds/${refundId}`
      }, callback)
    }
  }
}
