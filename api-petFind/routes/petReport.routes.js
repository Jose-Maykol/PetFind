const { Router } = require('express')
const router = Router()
const { createPetReport } = require('../controllers/petReport.controller')

router.post('/own', createPetReport)

module.exports = router
