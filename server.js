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

const authRoute = require('./server/routes/route.auth')
const ongkirRoute = require('./server/routes/route.ongkir')
const socialAuthRoute = require('./server/routes/route.authsc')
const profileRoute = require('./server/routes/route.profile')

// setup global promise
mongoose.Promise = global.Promise

// set mongodb cloud ur
const DB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.eac74.mongodb.net/merncsaauth?retryWrites=true&w=majority`

// init database connection
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Database Connected')
  })
  .catch((err) => {
    console.log(`Database not connected ${err}`)
  })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
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
app.use(socialAuthRoute)
app.use('/api/auth', authRoute)
app.use('/api/ongkir', ongkirRoute)
app.use('/api/profile', profileRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(process.cwd(), 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(resolve(process.cwd(), 'client/build/index.html'))
  })
}

app.listen(process.env.PORT, () => console.log(`server is running on ${process.env.PORT}`))
