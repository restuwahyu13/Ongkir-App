const { validationResult, param, body } = require('express-validator')

exports.resultsValidator = (req) => {
  const messages = []
  if (!validationResult(req).isEmpty()) {
    const errors = validationResult(req).array()
    for (const i of errors) {
      messages.push(i)
    }
  }
  return messages
}

exports.registerValidator = () => {
  return [
    body('username')
      .notEmpty()
      .withMessage('username is required')
      .not()
      .custom((val) => /[^A-za-z0-9\s]/g.test(val))
      .withMessage('Username not use unique character'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email is not valid'),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be 8 characters')
  ]
}

exports.loginValidator = () => {
  return [
    body('username').notEmpty().withMessage('username or email is required'),
    body('password').notEmpty().withMessage('password is required')
  ]
}

exports.forgotValidator = () => {
  return [body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('email is not valid')]
}

exports.resetValidator = () => {
  return [
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be 8 characters'),
    body('cpassword')
      .notEmpty()
      .withMessage('cpassword is required')
      .isLength({ min: 8 })
      .withMessage('cpassword must be 8 characters'),
    body('cpassword')
      .not()
      .custom((val, { req }) => val !== req.body.password)
      .withMessage('cpassword must be match with password')
  ]
}

exports.idValidator = () => {
  return [param('id').isMongoId().withMessage('MongoId is not valid')]
}
