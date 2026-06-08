const API = require('./api');
const pkg = require('../package.json');
const { validateInput, SCHEMAS } = require('./resources/oAuthTokenValidator');

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
    const errors = validateInput(params, SCHEMAS.generateAuthUrl);
    if (Object.keys(errors).length > 0) return errors;
    const baseUrl = `${this.rq.defaults.baseURL}/authorize`;
    const queryString = Object.entries(params)
    .flatMap(([key, value]) => 
      Array.isArray(value) 
        ? value.map(item => `${key}[]=${encodeURIComponent(item)}`) 
        : key === "redirect_uri" 
          ? `${key}=${value}` 
          : `${key}=${encodeURIComponent(value)}`
    )
    .join("&");
    return `${baseUrl}?${queryString}`;
  }

  getAccessToken(params = {}, callback){
    const errors = validateInput(params, SCHEMAS.getAccessToken); 
    if (Object.keys(errors).length > 0) return Promise.reject(errors);
    return this.post({
        url: '/token',
        data: params
    }, callback)
  }

  refreshToken(params = {}, callback){
    const errors = validateInput(params, SCHEMAS.refreshToken); 
    if (Object.keys(errors).length > 0) return Promise.reject(errors);
    return this.post({
        url: '/token',
        data: params
    }, callback)
  }

  revokeToken(params = {}, callback){ 
    const errors = validateInput(params, SCHEMAS.revokeToken);
    if (Object.keys(errors).length > 0) return Promise.reject(errors);
    return this.post({
        url: '/revoke',
        data: params
    }, callback)
  }
}

module.exports = OAuthTokenClient
