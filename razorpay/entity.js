var request = require('request')
var constants = require('./constants')
var Collection = require('./collection')

var Entity = function(attributes, key_id, key_secret){
  this.base_url = constants.BASE_URI + 'payments'
  this.attributes = attributes
  if(key_id)
    this.key_id = key_id
  if(key_secret)
    this.key_secret = key_secret
}

Entity.prototype.fetch = function(attributes, callback){
  var args = this.formatArgs(attributes, callback)

  request.get({
    url: this.base_url + '/' + args.attributes.id,
    auth: {
      user: args.key_id,
      pass: args.key_secret
    },
    json: true
  }, function(error, response, body){
    args.callback(new args.constructor(body, args.key_id, args.key_secret))
  });
}

Entity.prototype.fetchMany = function(callback, options){
  if(typeof attributes == 'function'){
    callback = attributes
    options = null
  }
  var entity = this
  request.get({
    url: this.base_url,
    auth: {
      user: this.key_id,
      pass: this.key_secret
    },
    json: true,
    body: options
  }, function(error, response, body){
    args.callback(new Collection(entity, body))
  });
}

Entity.prototype.formatArgs = function(attributes, callback){
  var returnArgs = {}
  if(typeof attributes == 'function'){
    returnArgs.callback = attributes
    returnArgs.attributes = this.attributes
  } else {
    returnArgs.callback = callback
    returnArgs.attributes = attributes
  }
  returnArgs.key_id = this.key_id
  returnArgs.key_secret = this.key_secret
  returnArgs.constructor = this.constructor
  return returnArgs
}

module.exports = Entity;