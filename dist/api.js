'use strict';
var request = require('request-promise');
var nodeify = require('./utils/nodeify');
var isNonNullObject = require('./utils/razorpay-utils').isNonNullObject;
var allowedHeaders = {
    "X-Razorpay-Account": ""
};
function getValidHeaders(headers) {
    var result = {};
    if (!isNonNullObject(headers)) {
        return result;
    }
    return Object.keys(headers).reduce(function (result, headerName) {
        if (allowedHeaders.hasOwnProperty(headerName)) {
            result[headerName] = headers[headerName];
        }
        return result;
    }, result);
}
function normalizeError(err) {
    throw {
        statusCode: err.statusCode,
        error: err.error.error
    };
}
var API = /** @class */ (function () {
    function API(options) {
        this.rq = request.defaults({
            baseUrl: options.hostUrl,
            json: true,
            auth: {
                user: options.key_id,
                pass: options.key_secret
            },
            headers: Object.assign({ 'User-Agent': options.ua }, getValidHeaders(options.headers))
        });
    }
    API.prototype.get = function (params, cb) {
        return nodeify(this.rq.get({
            url: params.url,
            qs: params.data,
        }).catch(normalizeError), cb);
    };
    API.prototype.post = function (params, cb) {
        return nodeify(this.rq.post({
            url: params.url,
            form: params.data
        }).catch(normalizeError), cb);
    };
    API.prototype.put = function (params, cb) {
        return nodeify(this.rq.put({
            url: params.url,
            form: params.data
        }).catch(normalizeError), cb);
    };
    API.prototype.patch = function (params, cb) {
        return nodeify(this.rq.patch({
            url: params.url,
            form: params.data
        }).catch(normalizeError), cb);
    };
    API.prototype.delete = function (params, cb) {
        return nodeify(this.rq.delete({
            url: params.url
        }).catch(normalizeError), cb);
    };
    return API;
}());
module.exports = API;
