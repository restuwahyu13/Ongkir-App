const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const compression = require('compression');
// const slowDown = require('express-slow-down')
// const rateLimit = require('express-rate-limit')
const helmet = require('helmet');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const path = require('path');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: '*',
      methods: '*',
      allowedHeaders: '*',
      exposedHeaders: '*',
      credentials: true
    })
  );
  // app.use(
  //   rateLimit({
  //     windowMs: 60 * 1000 * 1,
  //     max: 20,
  //     message: 'Oops..You sent too many requests, please try again in 1 minutes'
  //   })
  // )
  // app.use(
  //   slowDown({
  //     windowMs: 60 * 1000 * 1,
  //     delayAfter: 15,
  //     delayMs: 1500
  //   })
  // )
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
  );
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(compression({ level: 9, strategy: 4 }));
  app.use(passport.initialize());
  app.use(passport.session());
  if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
  }
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.cwd(), 'client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'client/build/index.html'));
    });
  }
};
