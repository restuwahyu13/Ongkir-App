const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      secure: false,
      changeOrigin: true,
      toProxy: true,
      xfwd: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-control-Allow-Methods': '*'
      }
    })
  )

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      secure: false,
      changeOrigin: true,
      toProxy: true,
      xfwd: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
      }
    })
  )
}
