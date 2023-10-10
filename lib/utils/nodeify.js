'use strict'

const nodeify = (promise, cb) => {
  if (!cb) {
    return promise
  }

  promise.then((response) => {
    cb(null, response)
  }).catch((error) => {
    cb(error, null)
  })
}

module.exports = nodeify
