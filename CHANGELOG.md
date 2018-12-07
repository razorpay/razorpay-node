# Changelog

## 3.0.0 - 2018-12-07
This release marks a total refractor of the entire code base; from the tests to the actual library.
Further, some inconsistencies in the API have been fixed such as:

- some API paths were returning a Promise rejection whilst some were throwing an error; this has been
standardized to make sure that an error is thrown (\*).
- the entire library was bootstrapped by Babel; this works, however, it adds a redundant overhead for applications written in NodeJS 8 or above.  The bootstrapping is now done only for NodeJS versions <= 7.
- the logic to convert string types to number were inconsistent; this has been resolved.
- the coding style of the library was all over the place: semicolons, no semicolons; object destructing,
object callbacks, etc. These inconsistencies have been standardized.
- inconsistent casings like `key_id` have been to changed to `keyId`, etc. However, there are some
which remain and they will be fixed in an upcoming release (\*).
- some parts of the library were not tested; tests have been added to cover them. However, it is in
no way complete or absolute and more will be added in the future.
- some tests were using a `try`/`catch` block to test for errors; this has been changed to `assert.throw()`
- some functions have been rewritten to conform to ES6 and above.

Apart from that, some new testing beds have been added:
- NodeJS v4-11;
- specific LTS releases.

Dependencies have been pruned:

**`devDependencies`**
- `babel-cli` -- on-the-fly transpilation is more than enough;
- `babel-preset-es2015` -- moved to `optionalDependencies`; this will be updated to `preset-env` in the future;
- `babel-preset-stage-0` -- moved to `optionalDependencies`;
- `deep-equal` -- `chai`'s `assert` provides a `.deepEqual()` implementation.

**`dependencies`**
- `promise` -- NodeJS provides native promise support;
- `request-promise` -- changed to `request-native-promise`.

And finally, some redundant build scripts have been removed.

(\*) -- possible breaking changes in existing code bases

## 2.0.3 - 2018-11-13
- Added support for Partner Auth.

## 2.0.2 - 2018-11-08
- Added support for TypeScript.

## 2.0.1 - 2018-6-26
### Fixed
- Security Fixes

## 2.0.0 - 2018-6-14
### Removed
- Removed sending only specific parameters to orders api, every parameter will be sent as it is , validation is done on API.

### Deprecated
- Removing validations on SDK, all parameters will be sent as it is to all apis respectively

## 1.7.0 - 2018-2-20
### Added
- Static method to validate webhook signature (https://github.com/razorpay/razorpay-node/wiki#webhooks)

### Deprecated
- Deprecated sending only specific parameters to orders api , rest being ignored

## 1.6.0 - 2017-9-2017
### Added
- More api methods for Virtual Accounts
- Plans API
- Subscriptions API
- Addons API

## 1.5.1 - 2017-9-12
### Added
- Added Invoices api
- Invoices unit tests
- Updated readme and wiki
- Bumped the version to 1.5.0

## 1.4.0 - 2017-8-18
### Added
- Added virtual accounts api
- Virtual Accounts unit tests
- Added promise polyfill
- Updated readme and wiki
- Bumped the version to 1.4.0

## 1.3.0
  - [Feature] Support for Marketplace accounts transfers

## 1.2.1
  - [Bugfix] Don't assume `undefined` values as 0 in the requests

## 1.2.0
  - [Feature] Support for fetching order's payments

## 1.1.0
  - [Feature] Adds Customer & tokens support
  - [Tests] Adds test coverage

## 1.0.0
  - [Docs] Update readme.md
  - [Docs] Adds Changelog

## 0.0.1
  - Initial Release
