var optionalDependencies = require('../package.json').optionalDependencies;

if (process.versions.node.split('.')[0] <= 7) {

  var keys = Object.keys(optionalDependencies);
  var notPresent = [];

  for(var i = 0; i < keys.length; i++) {
    var key = keys[i];
    try {
      require.resolve(key);
    } catch (error) { notPresent.push(key); }
  }

  if (notPresent.length === 0) {
    module.exports = require('./bootstrap');
  } else {
    throw new Error(
      'You are running Node v' + process.versions.node + 'which does not support ' +
      'some of ES6 features. For that reason, you need to use Babel to transpile ' +
      'the library on-the-fly. You can do this by installing the following packages ' +
      notPresent.join(', ') + '.'
    );
  }

} else {
  module.exports = require('./razorpay');
}
