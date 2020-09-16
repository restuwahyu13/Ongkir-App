const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/auth/*',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
      secure: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-control-Allow-Methods': '*'
      }
    })
  )

  app.use(
    '/api/*',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL,
      secure: false,
      changeOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    })
  )
}
