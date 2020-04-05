'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var nodeify = function (promise, cb) {
    if (!cb) {
        return promise;
    }
    return promise.then(function (response) {
        cb(null, response);
    }).catch(function (error) {
        cb(error, null);
    });
};
exports.default = nodeify;
