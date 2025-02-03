const API = require('./api');
const pkg = require('../package.json')

class OAuthTokenClient extends API{
  
  constructor(options) {  
    super({
      hostUrl : 'https://auth.razorpay.com',
      ua: `razorpay-node@${pkg.version}`,
      ...options
    })
  }

  getEntityUrl(params){
    return params.url ;
  }

  generateAuthUrl(params) {
    const baseUrl = `${this.rq.defaults.baseURL}/authorize`;
    const queryString = Object.entries(params)
    .map(([key, value]) => key === "redirect_uri" 
    ? `${key}=${value}` 
    : `${key}=${encodeURIComponent(value)}`)
    .join("&");
    return `${baseUrl}?${queryString}`;
  }

  getAccessToken(param = {}, callback){
    return this.post({
        url: '/token',
        data: param
    }, callback)
  }

  refreshToken(param = {}, callback){
    return this.post({
        url: '/token',
        data: param
    }, callback)
  }

  revokeToken(param = {}, callback){
    return this.patch({
        url: '/token',
        data: param
    }, callback)
  }
}

module.exports = OAuthTokenClient
