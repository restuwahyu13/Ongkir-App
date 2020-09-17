const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/auth/*',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false
    })
  )

  app.use(
    '/api/auth',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      secure: false,
      changeOrigin: true
    })
  )

  app.use(
    '/api/ongkir',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      secure: false,
      changeOrigin: true
    })
  )

  app.use(
    '/api/profile',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      secure: false,
      changeOrigin: true
    })
  )
}
