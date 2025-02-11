const API = require('./api');
const pkg = require('../package.json')

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

class OAuthTokenClient extends API{
  
  constructor() {  
    super({
      hostUrl : 'https://auth.razorpay.com',
      ua: `razorpay-node@${pkg.version}`,
    })
  }

  getEntityUrl(params){
    return params.url ;
  }

  generateAuthUrl(params) {    
    const errors = this.validateInput(params, SCHEMAS.generateAuthUrl);
    if (Object.keys(errors).length > 0) return errors;
    const baseUrl = `${this.rq.defaults.baseURL}/authorize`;
    const queryString = Object.entries(params)
    .map(([key, value]) => key === "redirect_uri" 
    ? `${key}=${value}` 
    : `${key}=${encodeURIComponent(value)}`)
    .join("&");
    return `${baseUrl}?${queryString}`;
  }

  getAccessToken(params = {}, callback){
    const errors = this.validateInput(params, SCHEMAS.getAccessToken); 
    if (Object.keys(errors).length > 0) return Promise.reject(errors);
    return this.post({
        url: '/token',
        data: params
    }, callback)
  }

  refreshToken(params = {}, callback){
    const errors = this.validateInput(params, SCHEMAS.refreshToken); 
    if (Object.keys(errors).length > 0) return Promise.reject(errors);
    return this.post({
        url: '/token',
        data: params
    }, callback)
  }

  revokeToken(params = {}, callback){ 
    const errors = this.validateInput(params, SCHEMAS.revokeToken);
    if (Object.keys(errors).length > 0) return Promise.reject(errors);
    return this.post({
        url: '/revoke',
        data: params
    }, callback)
  }

  validateInput(inputData, schema) {
    let errors = {};
    for (let field in schema) {
      if (!(field in inputData) || inputData[field].trim() === "") {
        errors[field] = schema[field];
      }
    }
    return errors;
  }
}

module.exports = OAuthTokenClient
