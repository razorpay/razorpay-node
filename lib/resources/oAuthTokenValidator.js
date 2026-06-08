const { isValidUrl } = require("../utils/razorpay-utils");

const SCHEMAS = {
    generateAuthUrl: {
      client_id: "client_id is empty",
      response_type: "response_type is empty",
      redirect_uri: "redirect_uri is empty",
      scope: "scope is empty",
      state: "state is empty",
    },
    getAccessToken: {
      client_id: "client_id is empty",
      client_secret: "client_secret is empty",
      grant_type: "grant_type is empty",
      redirect_uri: "redirect_uri is empty",
      code: "code is empty",
    },
    refreshToken: {
      client_id: "client_id is empty",
      client_secret: "client_secret is empty",
      grant_type: "grant_type is empty",
      refresh_token: "refresh_token is empty",
    },
    revokeToken: {
      client_id: "client_id is empty",
      client_secret: "client_secret is empty",
      token_type_hint: "token_type_hint is empty",
      token: "token is empty",
    },
  };

  function validateInput(inputData, schema) {
    let errors = {};
    for (let field in schema) {
      if (!(field in inputData) || (typeof inputData[field] === "string" && inputData[field].trim() === "")) {
        errors[field] = schema[field];
      } else if (field === "redirect_uri" && ! isValidUrl(inputData[field])) {
        errors[field] = "redirect_uri is not a valid URL";
      } else if (field === "client_id" && !/^[A-Za-z0-9]{1,14}$/.test(inputData[field])) {
        errors[field] = "client_id is not a valid ID";
      } else if(field === "grant_type" && (inputData[field] !== "refresh_token" && inputData[field] !== "authorization_code")){
        errors[field] = "grant_type is not a valid";
      }
    }
    return errors;
  }
  
module.exports = {
  SCHEMAS,
  validateInput
}