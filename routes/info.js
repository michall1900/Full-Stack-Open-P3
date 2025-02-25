const express = require('express')
const router = express.Router()
const info = require('../controllers/info')


router.get('/', info.getInfo)

module.exports = router