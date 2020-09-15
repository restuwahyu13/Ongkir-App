const jwt = require('jsonwebtoken')
const { authSchema } = require('../models/model.auth')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)
    const roleAuth = await authSchema.findById(_id).lean()

    if (roleAuth.role !== 'admin') {
      return res.status(403).json({
        method: req.method,
        status: res.statusCode,
        error: 'Oops..forbidden cannot acccess this feature, admin area'
      })
    }
  } catch (err) {
    return res.status(401).json({
      method: req.method,
      status: res.statusCode,
      error: 'Oops..unauthorized token is not valid or expired'
    })
  }
}
