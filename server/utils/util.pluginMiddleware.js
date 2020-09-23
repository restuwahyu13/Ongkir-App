require('dotenv/config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const MongoStore = require('connect-mongo')(session)
const slowDown = require('express-slow-down')
const rateLimit = require('express-rate-limit')
// const logger = require('morgan')

module.exports = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(
    cors({
      origin: '*',
      methods: '*',
      allowedHeaders: '*',
      exposedHeaders: '*'
    })
  )
  app.use(
    session({
      name: 'express-session',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000
      },
      store: new MongoStore({
        secret: process.env.SESSION_SECRET,
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 * 1000
      })
    })
  )
  app.use(helmet({ contentSecurityPolicy: false }))
  app.use(compression({ level: 9, strategy: 4 }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(
    rateLimit({
      windowMs: 60 * 1000 * 1,
      max: 300,
      message: 'Oops..You sent too many requests, please try again in 1 minutes'
    })
  )
  app.use(
    slowDown({
      windowMs: 60 * 1000 * 1,
      delayAfter: 15,
      delayMs: 1500
    })
  )
  if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'))
  }
}
