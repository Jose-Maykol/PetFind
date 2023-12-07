const { Router } = require('express')
const router = Router()
const { getAll } = require('../controllers/petsType.controller')

router.get('/info', getAll)

module.exports = router
