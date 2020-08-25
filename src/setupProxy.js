const { createProxyMiddleware } = require('http-proxy-middleware');

const API = 'http://49.233.185.168:3009'
const WY_API = 'http://49.233.185.168:3008'

module.exports = function(app) {
  app.use(createProxyMiddleware ('/api', {
    target: API,
    changeOrigin:true,
    pathRewrite: {
      "^/api": "/"
    }
  }))
  app.use(createProxyMiddleware ('/wyapi', {
    target: WY_API,
    changeOrigin:true,
    pathRewrite: {
      "^/wyapi": "/"
    }
  }))
}