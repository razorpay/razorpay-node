'use strict'

const nodeify = (promise, cb) => {
  if (!cb) {
    return promise
  }

  return promise.then((response) => {
    cb(null, response)
  }).catch((error) => {
    cb(error, null)
  })
}

export default nodeify;