const express = require('express')
const app = express()
require('./utils/util.connection')
require('./utils/util.pluginMiddleware')
require('./utils/util.passportStrategy')
require('./utils/util.routeMiddleware')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(process.cwd(), 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'client/build/index.html'))
  })
}

module.exports = app
