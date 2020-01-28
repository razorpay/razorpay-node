# Changelog

## 2.0.6 - 2020-01-28
- fix: receipt is an optional param when creating orders (#118).
- Updated dependencies.

## 2.0.5 - 2019-08-12
- Added support for Order creation amount=0 + method=emandate.
- Dependency updates.

## 2.0.4 - 2019-03-06
- Added `recipient_settlement_id` parameter for Transfers.
- Renamed "X-Razorpay-Header" to "X-Razorpay-Signature header" in the error message in `validateWebhookSignature`.
- Added support for `currency` in `capture` method for Payments.

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
