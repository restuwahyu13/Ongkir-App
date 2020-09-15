const express = require('express')
const router = express.Router()
const { cityController, provController, kabController, constController } = require('../controllers/controller.ongkir')

router.get('/cekongkir/city', cityController)
router.get('/cekongkir/prov', provController)
router.get('/cekongkir/kab', kabController)
router.post('/cekongkir/cost', constController)

module.exports = router
