const express       =    require('express')
const router        =    express.Router()

const ContactUsController = require('../controllers/contactUsController')



router.post('/addContactUS', ContactUsController.addContactUs)


module.exports = router