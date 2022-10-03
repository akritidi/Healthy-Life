const express = require('express')
const router  = express.Router()

const LostpassController  = require('../controllers/LostpassController')

router.post('/store',  LostpassController.store)

module.exports = router