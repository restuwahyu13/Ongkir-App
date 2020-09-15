const { AuthSchema } = require('../models/model.auth')
const { resultsValidator } = require('../middlewares/middleware.validator')

/**
 * @method GET
 * @description this method function for result profile by id
 */
exports.profileEditController = async (req, res, next) => {
  try {
    const errors = resultsValidator(req)
    if (errors.length > 0) {
      return res.status(400).json({
        method: req.method,
        status: res.statusCode,
        error: errors
      })
    }

    const { id } = req.params
    const user = await AuthSchema.findById(id, { authsc: 0, isActive: 0, role: 0 }).lean()
    return res.status(200).json({
      status: res.statusCode,
      method: req.method,
      profile: user
    })
  } catch (err) {
    return res.status(404).json({
      status: res.statusCode,
      method: req.method,
      error: 'Oops..user profile not found'
    })
  }
}

/**
 * @method GET
 * @description this method function for update profile by id
 */
exports.profileUpdateController = async (req, res, next) => {
  try {
    const errors = resultsValidator(req)
    if (errors.length > 0) {
      return res.status(400).json({
        method: req.method,
        status: res.statusCode,
        error: errors
      })
    }

    const { id } = req.params
    const password = AuthSchema.hashPassword(req.body.password)
    const { username, email } = req.body
    const user = await AuthSchema.findById(id).lean()
    const { _id } = user

    await AuthSchema.findByIdAndUpdate(_id, { $set: { username, email, password } }).lean()
    return res.status(200).json({
      status: res.statusCode,
      method: req.method,
      success: 'Yeah..profile successfuly to updated'
    })
  } catch (err) {
    return res.status(400).json({
      status: res.statusCode,
      method: req.method,
      error: 'Oops..profile failed to updated'
    })
  }
}
