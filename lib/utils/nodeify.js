module.exports = (promise, cb) => {

  // What if the cb is null?
  // Create a function proxy.
  if (typeof cb === 'undefined' || !cb) {
    return promise;
  }

  return promise.then(response => {
    cb(null, response);
  }).catch(error => {
    cb(error, null);
  });

};
