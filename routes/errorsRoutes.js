const express = require('express')
const router = express.Router()
const {unknownEndpoint} = require('../controllers/errorsController')

router.use(unknownEndpoint)


module.exports = router


