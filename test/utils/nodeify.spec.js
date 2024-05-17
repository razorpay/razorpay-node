'use strict'

const chai = require('chai')
const assert = chai.assert

const nodeify = require('../../dist/utils/nodeify')

function fakeCall(data, hasResolve){
  return new Promise((resolve, reject)=>{
    if(hasResolve){
      resolve({
        data
      })
    }else{
      reject(data)
    }
  })
}

describe('Nodeify should invoke the callback', () => {
  it('Resolve', (done) => {
    let data = 'some success data'
    nodeify(fakeCall(data,true), (err, response) => {
      assert.equal(response, data, 'Passes the resolved data')
      assert.isNotOk(err, 'Error should be passed as null')
      done()
    })
  })

  it('Reject', (done) => {
    let errorMsg = 'some error'
    nodeify(fakeCall(errorMsg,false), (err, response) => {
      assert.equal(err, errorMsg, 'Callback is invoked with error')
      assert.isNotOk(response, 'Response is null')
      done()
    })
  })
})
