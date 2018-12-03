module.exports = (promise, cb) => {

  if (typeof cb === 'undefined') {
    return promise;
  }

  return promise.then(response => {
    cb(null, response);
  }).catch(error => {
    cb(error, null);
  });

};
