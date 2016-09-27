'use strict'

const chai = require('chai')
const assert = chai.assert

const nodeify = require('../../dist/utils/nodeify')

describe('Nodeify should invoke the callback', () => {
  it('Resolve', (done) => {
    let data = 'some success data'
    nodeify(Promise.resolve(data), (err, response) => {
      assert.equal(response, data, 'Passes the resolved data')
      assert.isNotOk(err, 'Error should be passed as null')
      done()
    })
  })

  it('Reject', (done) => {
    let errorMsg = 'some error'
    nodeify(Promise.reject(errorMsg), (err, response) => {
      assert.equal(err, errorMsg, 'Callback is invoked with error')
      assert.isNotOk(response, 'Response is null')
      done()
    })
  })
})
