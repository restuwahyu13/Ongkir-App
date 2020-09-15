const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const validator = require('mongoose-validator')
const Schema = mongoose.Schema

const setAuthSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      default: null
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: [
        validator({
          validator: 'isEmail',
          message: 'Oops..please enter valid email'
        })
      ],
      default: null
    },
    password: {
      type: String,
      minlength: 5,
      trim: true,
      required: true
    },
    authsc: {
      idsocial: {
        type: String,
        trim: true,
        default: null
      },
      username: {
        type: String,
        trim: true,
        default: null
      },
      fullname: {
        type: String,
        trim: true,
        default: null
      },
      email: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
      },
      gender: {
        type: String,
        trim: true,
        default: null
      },
      avatar: {
        type: String,
        trim: true,
        default: null
      },
      provider: {
        type: String,
        trim: true,
        default: null
      }
    },
    role: {
      type: String,
      trim: true,
      default: 'user'
    },
    isActive: {
      type: Boolean,
      trim: true,
      default: false
    }
  },
  { timestamps: true }
)

setAuthSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const salt = bcryptjs.genSaltSync(10)
    this.password = bcryptjs.hashSync(this.password, salt)
    return next()
  }
})

setAuthSchema.static('hashPassword', (password) => {
  if (password) {
    const salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(password, salt)
  }
})

setAuthSchema.static('verifyPassword', (password, hash) => {
  if (password && hash) {
    return bcryptjs.compareSync(password, hash)
  }
})

const AuthSchema = mongoose.model('auth', setAuthSchema)
module.exports = { AuthSchema }
