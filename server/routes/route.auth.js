const express = require('express')
const router = express.Router()
const {
  loginController,
  registerController,
  resendController,
  forgotController,
  resetControllerId,
  resetController,
  activationController,
  socialLoginController,
  socialRegisterController
} = require('../controllers/controller.auth')
const {
  registerValidator,
  loginValidator,
  forgotValidator,
  resetValidator
} = require('../middlewares/middleware.validator')

/**
 * @description not third party authentication
 */
router.post('/user/login', loginValidator(), loginController)
router.post('/user/register', registerValidator(), registerController)
router.post('/user/resend-token', forgotValidator(), resendController)
router.post('/user/forgot-password', forgotValidator(), forgotController)
router.get('/user/reset-password/verify/:id', resetControllerId)
router.post('/user/reset-password/:id', resetValidator(), resetController)
router.get('/user/activation/:id', activationController)
router.get('/user/social-login', socialLoginController)
router.get('/user/social-register', socialRegisterController)

module.exports = router
