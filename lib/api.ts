'use strict';

const axios = require('axios');
const QS = require('qs');
import nodeify from './utils/nodeify';
import {
  isNonNullObject
} from './utils/razorpay-utils';

const allowedHeaders = {
  "X-Razorpay-Account": ""
};

function getValidHeaders (headers) {

  const result = {};

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

function normalizeError(error) {
  const {
    status,
    data,
  } = error.response;

  return {
    statusCode: status,
    error: typeof data.error !== "undefined" ? data.error : data,
  };
}

export default class API {
  rq: any;

  constructor(options) {
    this.rq = axios.create({
      baseURL: options.hostUrl,
      auth: {
        username: options.key_id,
        password: options.key_secret
      },
      headers: {
        'User-Agent': options.ua,
        ...(getValidHeaders(options.headers))
      },
    });
  }

  get(params, cb) {
    return nodeify(
      this.rq
        .get(params.url, {
          params: params.data
        })
        .then((response) => {
          return response.data;
        })
        .catch(error => normalizeError(error)),
      cb
    );
  }

  post(params, cb) {
    return nodeify(
      this.rq
        .post(params.url, QS.stringify(params.data))
        .then((response) => response.data)
        .catch(error => normalizeError(error)),
      cb
    );
  }

  put(params, cb) {
    return nodeify(
      this.rq
        .put(params.url, QS.stringify(params.data))
        .then((response) => response.data)
        .catch((error) => normalizeError(error)),
      cb
    );
  }

  patch(params, cb) {
    return nodeify(
      this.rq
        .patch(params.url, QS.stringify(params.data))
        .then((response) => response.data)
        .catch((error) => normalizeError(error)),
      cb
    );
  }

  delete(params, cb) {
    return nodeify(
      this.rq
        .delete(params.url)
        .then((response) => response.data)
        .catch(error => normalizeError(error)),
      cb
    );
  }
}
