const jwt = require('jsonwebtoken')
const { resultsValidator } = require('../middlewares/middleware.validator')
const { AuthSchema } = require('../models/model.auth')
const { tempMailRegister } = require('../templates/template.register')
const { tempMailReset } = require('../templates/template.reset')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SG_SECRET)

/**
 * @method POST
 * @description this method function for login user account after registered
 */
exports.loginController = async (req, res, next) => {
  const errors = resultsValidator(req)
  if (errors.length > 0) {
    return res.status(400).json({
      method: req.method,
      status: res.statusCode,
      error: errors
    })
  }

  const { username, password } = req.body
  const user = await AuthSchema.find({ $or: [{ username }, { email: username }] })

  if (user.length < 1) {
    return res.status(404).json({
      method: req.method,
      status: res.statusCode,
      error: 'Oops..user account is not exists, please register now'
    })
  }

  if (!user[0].isActive) {
    return res.status(401).json({
      method: req.method,
      status: res.statusCode,
      error: 'Oops..user account is not active, please check your email activation or resend token'
    })
  }

  const verify = AuthSchema.verifyPassword(password, user[0].password)
  if (!verify) {
    return res.status(400).json({
      method: req.method,
      status: res.statusCode,
      error: 'Oops..username or password is wrong'
    })
  }

  const { _id } = user[0]
  const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, { expiresIn: '1d' })
  return res.status(200).json({
    method: req.method,
    status: res.statusCode,
    success: 'Yeah..login successfully',
    token: token
  })
}

/**
 * @method POST
 * @description this method function for registered new user account
 */
exports.registerController = async (req, res, next) => {
  const errors = resultsValidator(req)
  if (errors.length > 0) {
    return res.status(400).json({
      method: req.method,
      status: res.statusCode,
      error: errors
    })
  }

  const { username, email } = req.body
  const user = await AuthSchema.find({ $or: [{ username }, { email }] }, { password: 0 }).lean()

  if (user.length > 0) {
    return res.status(409).json({
      method: req.method,
      status: res.statusCode,
      error: 'Oops..username or email already exists'
    })
  }

  const userData = await AuthSchema.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  const { _id } = userData
  const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, { expiresIn: '1m' })
  const message = tempMailRegister(username, email, token)
  const response = await sgMail.send(message)

  if (response[0].statusCode === 202) {
    return res.status(201).json({
      method: req.method,
      status: res.statusCode,
      success: `Yeah..registered successfully, please check your email ${email}`
    })
  }
}

/**
 * @method POST
 * @description  this method function for recovery user account if not login
 */
exports.forgotController = async (req, res, next) => {
  const errors = resultsValidator(req)
  if (errors.length > 0) {
    return res.status(400).json({
      method: req.method,
      status: res.statusCode,
      error: errors
    })
  }

  const user = await AuthSchema.findOne({ email: req.body.email }, { password: 0 }).lean()
  if (!user) {
    return res.status(404).json({
      method: req.method,
      status: res.statusCode,
      error: 'Oops..user account for this email is not exists or not registered'
    })
  }

  const { _id, username, email } = user
  const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, { expiresIn: '1m' })
  const message = tempMailReset(username, email, token)
  const response = await sgMail.send(message)

  if (response[0].statusCode === 202) {
    return res.status(200).json({
      method: req.method,
      status: res.statusCode,
      success: `Yeah..Successfully link reset password has been sent to your email ${email}`
    })
  }
}

/**
 * @method POST
 * @description  this method function for recovery user account if not login
 */
exports.resendController = async (req, res, next) => {
  const errors = resultsValidator(req)
  if (errors.length > 0) {
    return res.status(400).json({
      method: req.method,
      status: res.statusCode,
      error: errors
    })
  }

  const user = await AuthSchema.findOne({ email: req.body.email }, { password: 0 }).lean()
  if (!user) {
    return res.status(404).json({
      method: req.method,
      status: res.statusCode,
      error: 'Oops..user account for this email is not exists or not registered'
    })
  }

  const { _id, username, email } = user
  const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, { expiresIn: '1m' })

  if (user.isActive) {
    return res.status(400).json({
      method: req.method,
      status: res.statusCode,
      error: 'Oops..user account has been active, please sign in now'
    })
  }

  const message = tempMailRegister(username, email, token)
  const response = await sgMail.send(message)
  if (response[0].statusCode === 202) {
    return res.status(200).json({
      method: req.method,
      status: res.statusCode,
      success: `Yeah..Successfully link activation has been sent to your email ${email}`
    })
  }
}

/**
 * @method GET
 * @description this method function for reset password before change old password to new password
 */
exports.resetControllerId = async (req, res, next) => {
  try {
    const { _id } = jwt.verify(req.params.id, process.env.JWT_SECRET)
    const user = await AuthSchema.findOne({ id: _id }).lean()
    if (user) return next()
  } catch (err) {
    return res.status(401).json({
      method: req.method,
      status: res.statusCode,
      error: 'Oops..Unauthorized reset password failed because token is expired, please try again',
      expired: true
    })
  }
}

/**
 * @method POST
 * @description this method function for reset password change old password to new password
 */
exports.resetController = async (req, res, next) => {
  try {
    const errors = resultsValidator(req)
    if (errors.length > 0) {
      return res.status(400).json({
        method: req.method,
        status: res.statusCode,
        error: errors
      })
    }

    const { _id } = jwt.verify(req.params.id, process.env.JWT_SECRET)
    const password = AuthSchema.hashPassword(req.body.password)
    await AuthSchema.findByIdAndUpdate(_id, { $set: { password } }).lean()

    return res.status(200).json({
      method: req.method,
      status: res.statusCode,
      success: 'Yeah..password hash been reset successfully, please login'
    })
  } catch (err) {
    return res.status(401).json({
      method: req.method,
      status: res.statusCode,
      error: 'Oops..Unauthorized reset password failed because token is expired, please try again',
      expired: true
    })
  }
}

/**
 * @method GET
 * @description this method function for activation account after register user account
 */
exports.activationController = async (req, res, next) => {
  try {
    const { _id } = jwt.verify(req.params.id, process.env.JWT_SECRET)
    await AuthSchema.findByIdAndUpdate(_id, { $set: { isActive: true } }).lean()

    return res.status(200).json({
      method: req.method,
      status: res.statusCode,
      success: 'Yeah..Activation account successfully, please login'
    })
  } catch (err) {
    return res.status(401).json({
      method: req.method,
      status: res.statusCode,
      error: 'Oops..Unauthorized activation account failed because token is expired, please resend token',
      expired: true
    })
  }
}

/**
 * @method GET
 * @description this method function for social login user account
 */
exports.socialLoginController = async (req, res, next) => {
  try {
    if (req.query.type !== 'register' && req.user !== 'undefined') {
      const email = req.user.provider !== 'github' ? req.user._json.email : `${req.user.username}@gmail.com`
      const user = await AuthSchema.find({
        $or: [{ email }, { 'authsc.idsocial': req.user.id }, { 'authsc.email': email }]
      }).lean()

      if (user.length < 1) {
        return res.status(404).json({
          method: req.method,
          status: res.statusCode,
          typeAuth: 'login',
          error: 'Oops..user account is not exists, please register now'
        })
      }

      const token = jwt.sign({ id: user[0]._id, name: user[0].authsc.username }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      })

      return res.status(200).json({
        method: req.method,
        status: res.statusCode,
        typeAuth: 'login',
        secret: token
      })
    }
  } catch (err) {
    return res.status(204).json({
      method: req.method,
      status: res.statusCode
    })
  }
}

/**
 * @method GET
 * @description this method function for social register user account
 */
exports.socialRegisterController = async (req, res, next) => {
  try {
    if (req.query.type !== 'login' && req.user !== 'undefined') {
      const email = req.user.provider !== 'github' ? req.user._json.email : `${req.user.username}@gmail.com`
      const user = await AuthSchema.find({
        $or: [{ email }, { 'authsc.idsocial': req.user.id }, { 'authsc.email': email }]
      }).lean()

      if (user.length > 0) {
        return res.status(409).json({
          method: req.method,
          status: res.statusCode,
          error: 'Oops..username or email already exists'
        })
      }

      const username = req.user.provider !== 'github' ? req.user.displayName : req.user.username
      const emailSocial = req.user.provider !== 'github' ? req.user._json.email : `${req.user.username}@gmail.com`
      const saveData = await AuthSchema.create({
        username: username,
        email: emailSocial,
        password: username,
        isActive: true,
        authsc: {
          idsocial: req.user.id,
          username: username,
          fullname: req.user.displayName,
          email: emailSocial,
          gender: req.user.gender,
          avatar: req.user.photos[0].value,
          provider: req.user.provider
        }
      })

      const { _id, authsc } = saveData
      const token = jwt.sign({ id: _id, name: authsc.username }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      })

      return res.status(200).json({
        method: req.method,
        status: res.statusCode,
        typeAuth: 'register',
        secret: token
      })
    }
  } catch (err) {
    return res.status(204).json({
      method: req.method,
      status: res.statusCode
    })
  }
}
