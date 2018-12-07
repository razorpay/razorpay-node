#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const lockPath = path.join(__dirname, '../package-lock.json');

if (fs.existsSync(lockPath)) {
  fs.unlinkSync(lockPath);
}
