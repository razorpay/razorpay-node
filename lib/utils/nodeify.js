'use strict'

const nodeify = (promise, cb) => {
  
  if (!cb) {
    return promise.then((response)=> response.data)
  }
  
  return promise.then((response) => { 
    cb(null, response.data)
  }).catch((error) => {
    cb(error, null)
  })
}

module.exports = nodeify
