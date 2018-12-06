#! /usr/bin/env node
if (process.versions.node.split('.')[0] <= 7) {
  console.log('mocha --compilers js:babel-core/register');
} else {
  console.log('mocha');
}
