var request = require('request')
var constants = require('./constants')

var Collection = function(entity, body){
  this.key_id = entity.key_id
  this.key_secret = entity.key_secret
}

Collection.prototype = {

}

module.exports = Collection