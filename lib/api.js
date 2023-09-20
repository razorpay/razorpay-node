"use strict";

const fetch = require("node-fetch");
const nodeify = require("./utils/nodeify");
const { isNonNullObject } = require("./utils/razorpay-utils");

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
    this.hostUrl = options.hostUrl;
    this.key_id = options.key_id;
    this.key_secret = options.key_secret;
    this.ua = options.ua;
    this.headers = options.headers;
    this.version = "v1";
  }

  //version = "v1";

  getEntityUrl(params) {
    return params.hasOwnProperty("version")
      ? `/${params.version}${params.url}`
      : `/${this.version}${params.url}`;
  }

  async request(method, params, cb) {
    try {
      const requestOptions = {
        method: method,
        headers: {
          "User-Agent": this.ua,
          ...getValidHeaders(this.headers),
        },
        auth: {
          user: this.key_id,
          pass: this.key_secret,
        },
      };

      if (method !== "GET" && params.data) {
        requestOptions.body = JSON.stringify(params.data);
      }

      const response = await fetch(
        `${this.hostUrl}${this.getEntityUrl(params)}`,
        { ...requestOptions }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: responseData.error,
        };
      }

      return responseData;
    } catch (err) {
      normalizeError(err);
    }
  }

  get(params, cb) {
    return nodeify(this.request("GET", params), cb);
  }

  post(params, cb) {
    let request = {
      url: this.getEntityUrl(params),
      body: params.data,
    };
    return nodeify(this.request("POST", params), cb);
  }

  // postFormData method for file uploads.
  postFormData(params, cb) {
    let request = {
      url: this.getEntityUrl(params),
      formData: params.formData,
    };
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "User-Agent": this.ua,
    //     ...getValidHeaders(params.headers),
    //   },
    //   auth: `${this.key_id}:${this.key_secret}`,
    //   body: params.formData,
    // };
    return nodeify(this.request("POST", params), cb);
  }

  put(params, cb) {
    let request = {
      url: this.getEntityUrl(params),
      body: params.data,
    };
    return nodeify(this.request("PUT", params), cb);
  }

  patch(params, cb) {
    let request = {
      url: this.getEntityUrl(params),
      body: params.data,
    };
    return nodeify(this.request("PATCH", params), cb);
  }

  delete(params, cb) {
    let request = {
      url: this.getEntityUrl(params),
    };
    return nodeify(this.request("DELETE", params), cb);
  }
}

module.exports = API;
