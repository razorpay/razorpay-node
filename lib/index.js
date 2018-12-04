const supportsNativePromises = require('./utils/supports-promises');

if (!supportsNativePromises()) {
  throw new Error(
    `You are running Node v${process.versions.node} which is not currently supported.`
  );
}

module.exports = require('./razorpay');
