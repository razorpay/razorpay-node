var request = require('request')
var constants = require('./constants')
var Entity = require('./entity')

var Payment = function(attributes, key_id, key_secret){
  Entity.call(this, attributes, key_id, key_secret)
}

Payment.prototype.fetch = Entity.prototype.fetch
Payment.prototype.fetchMany = Entity.prototype.fetchMany
Payment.prototype.formatArgs = Entity.prototype.formatArgs

Payment.prototype.capture = function(attributes, callback){
  var args = this.formatArgs(attributes, callback)
  // console.log(this.base_url + '/' + this.attributes.id + '/capture')
  request.post({
    url: this.base_url + '/' + args.attributes.id + '/capture',
    auth: {
      user: this.key_id,
      pass: this.key_secret
    },
    json: true,
    body: {
      amount: args.attributes.amount
    }
  }, function(error, response, body){
    args.callback(new args.constructor(body, args.key_id, args.key_secret))
  });
}

Payment.prototype.refund = function(attributes, callback){
  if(typeof attributes == 'function'){
    callback = attributes
    attributes = null
  }
  attributes = attributes || this.attributes
  var key_id = this.key_id
  var key_secret = this.key_secret

  request.post({
    url: this.base_url + '/' + attributes.id + '/refund',
    auth: {
      user: key_id,
      pass: key_secret
    },
    json: true,
    body: {
      amount: attributes.amount
    }
  }, function(error, response, body){
    callback(new this.constructor(body, key_id, key_secret))
  });
}

module.exports = Payment