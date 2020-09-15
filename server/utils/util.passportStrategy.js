const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GithubStrategy = require('passport-github').Strategy

/**
 * @description Passport Serialize User
 */
passport.serializeUser((user, done) => {
  if (!user) return done(null, false)
  return done(null, user)
})

/**
 * @description Passport Deserialize User
 */
passport.deserializeUser(async (user, done) => {
  if (!user) return done(null, false)
  return done(null, user)
})

/**
 * @description Passport Google Strategy
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile) return done(null, false)
        return done(null, profile)
      } catch (err) {
        return done(null, err)
      }
    }
  )
)

/**
 * @description Passport Facebook Strategy
 */
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: '/auth/facebook/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile) return done(null, false)
        return done(null, profile)
      } catch (err) {
        return done(null, err)
      }
    }
  )
)

/**
 * @description Passport GitHub Strategy
 */
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: '/auth/github/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile) return done(null, false)
        return done(null, profile)
      } catch (err) {
        return done(null, err)
      }
    }
  )
)
