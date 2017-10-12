'use strict';

var nodeify = function nodeify(promise, cb) {
  if (!cb) {
    return promise;
  }

  return promise.then(function (response) {
    cb(null, response);
  }).catch(function (error) {
    cb(error, null);
  });
};

module.exports = nodeify;