const supportsNativePromises = require('./utils/supports-promises');

if (!supportsNativePromises()) {
  throw new Error(
    `You are running Node v${process.versions.node} which is not currently supported.`
  );
}

if (process.versions.node.split('.')[0] <= 7) {
  try {
    require.resolve('babel-core');
    require.resolve('babel-register');
    require.resolve('babel-preset-es2015');
    require.resolve('babel-preset-stage-0');
    require.resolve('babel-polyfill');

    module.exports = require('./bootstrap');
  } catch (error) {
    throw new Error(
      `You are running Node v${process.versions.node} which does not support ` +
      'some of ES6 features. For that reason, you need to use Babel to transpile ' +
      'the library on-the-fly. You can do this by installing the following packages ' +
      'babel-core, babel-register, babel-preset-es2015, babel-preset-stage-0 and babel-polyfill.'
    );
  }
} else {
  module.exports = require('./razorpay');
}
