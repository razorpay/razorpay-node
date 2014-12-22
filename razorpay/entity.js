var request = require('request');
var constants = require('./constants');

var Entity = function(name) {
  this.entity_name = name;
}

Entity.prototype.fetch = function(id) {
  return request.get(constants.BASE_URI + this.entity_name + '/' + id);
}

Entity.prototype.all = function() {
  return request.get(constants.BASE_URI + this.entity_name);
};

module.exports = Entity;
