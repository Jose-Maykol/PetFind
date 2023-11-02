const { Router } = require('express')
const router = Router()
const { getAll } = require('../controllers/petsType.controller')

router.get('/', getAll)

module.exports = router
