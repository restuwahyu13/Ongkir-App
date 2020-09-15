const express = require('express')
const router = express.Router()
const passport = require('passport')

/**
 * @description third party authentication
 */
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  return res.status(200).redirect(`${process.env.CLIENT_URL}`)
})

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))
router.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  return res.status(200).redirect(`${process.env.CLIENT_URL}`)
})

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email', 'read:user'] }))
router.get('/auth/github/callback', passport.authenticate('github'), (req, res) => {
  return res.status(200).redirect(`${process.env.CLIENT_URL}`)
})

module.exports = router
