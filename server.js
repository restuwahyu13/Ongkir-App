require('dotenv/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const MongoStore = require('connect-mongo')(session)
const fallback = require('express-history-api-fallback')
const { resolve } = require('path')
require('./server/utils/util.connection')

const authRoute = require('./server/routes/route.auth')
const ongkirRoute = require('./server/routes/route.ongkir')
const socialAuthRoute = require('./server/routes/route.authsc')
const profileRoute = require('./server/routes/route.profile')
require('./server/utils/util.passportStrategy')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
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
app.use((req, res, next) => {
  res.setHeader('Accept', 'application/json')
  res.setHeader('Content-Type', 'application/json')
  next()
})
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(process.cwd(), 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(resolve(process.cwd(), 'client/build/index.html'))
  })
}

app.use(socialAuthRoute)
app.use('/api/auth', authRoute)
app.use('/api/ongkir', ongkirRoute)
app.use('/api/profile', profileRoute)

app.listen(process.env.PORT, () => console.log(`server is running on ${process.env.PORT}`))
