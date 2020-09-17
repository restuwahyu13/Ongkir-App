const express = require('express')
const app = express()
const { resolve } = require('path')
require('./utils/util.connection')
require('./utils/util.pluginMiddleware')(app)
require('./utils/util.routeMiddleware')(app)
require('./utils/util.passportStrategy')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(process.cwd(), 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(resolve(process.cwd(), 'client/build/index.html'))
  })
}

module.exports = app
