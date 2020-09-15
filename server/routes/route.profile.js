const express = require('express')
const router = express.Router()
const { idValidator, registerValidator } = require('../middlewares/middleware.validator')
const { profileEditController, profileUpdateController } = require('../controllers/controller.profile')

router.get('/user/profile/:id', idValidator(), profileEditController)
router.put('/user/profile/:id', idValidator(), registerValidator(), profileUpdateController)

module.exports = router
