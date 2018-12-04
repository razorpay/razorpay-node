module.exports = function supportsNativePromises() {
  return (process.versions.node.split('.')[0] >= 4);
};
