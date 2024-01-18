"use strict";

import axios from "axios";
import nodeify from "./utils/nodeify.js";
import { isNonNullObject } from "./utils/razorpay-utils.js";

const allowedHeaders = {
  "X-Razorpay-Account": "",
  "Content-Type": "application/json",
};

function getValidHeaders(headers) {
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

function normalizeError(err) {
  throw {
    statusCode: err.statusCode,
    error: err.error.error,
  };
}

class API {
  constructor(options) {
    this.ax = axios.create({
      baseURL: options.hostUrl,
      auth: {
        username: options.key_id,
        password: options.key_secret,
      },
      headers: Object.assign(
        { "User-Agent": options.ua },
        getValidHeaders(options.headers)
      ),
    });
  }

  version = "v1";

  getEntityUrl(params) {
    return params.hasOwnProperty("version")
      ? `${params.version}${params.url}`
      : `${this.version}${params.url}`;
  }

  get(params, cb) {
    return nodeify(
      this.ax
        .get(this.getEntityUrl(params), {
          params: params.data,
        })
        .then((res) => res.data)
        .catch(normalizeError),
      cb
    );
  }

  post(params, cb) {
    let request = {
      url: this.getEntityUrl(params),
      body: params.data,
    };
    return nodeify(
      this.ax
        .post(request.url, request.body)
        .then((res) => res.data)
        .catch(normalizeError),
      cb
    );
  }

  // postFormData method for file uploads.
  postFormData(params, cb) {
    let request = {
      url: this.getEntityUrl(params),
      formData: params.formData,
    };
    return nodeify(
      this.ax
        .postForm(request.url, request.formData)
        .then((res) => res.data)
        .catch(normalizeError),
      cb
    );
  }

  put(params, cb) {
    return nodeify(
      this.ax
        .put(this.getEntityUrl(params), params.data)
        .then((res) => res.data)
        .catch(normalizeError),
      cb
    );
  }

  patch(params, cb) {
    let request = {
      url: this.getEntityUrl(params),
      body: params.data,
    };
    return nodeify(
      this.ax
        .patch(request.url, request.body)
        .then((res) => res.data)
        .catch(normalizeError),
      cb
    );
  }

  delete(params, cb) {
    return nodeify(
      this.ax
        .delete(this.getEntityUrl(params))
        .then((res) => res.data)
        .catch(normalizeError),
      cb
    );
  }
}

export default API;
