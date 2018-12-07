#! /usr/bin/env node
if (process.versions.node.split('.')[0] <= 7) {
  console.log('mocha --require babel-register');
} else {
  console.log('mocha');
}
