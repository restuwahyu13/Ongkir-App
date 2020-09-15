const app = require('express')()

require('dotenv/config')
require('./utils/util.connection')
require('./utils/util.passportStrategy')
require('./utils/util.pluginMiddleware')(app)
require('./utils/util.routeMiddleware')(app)

module.exports = app
