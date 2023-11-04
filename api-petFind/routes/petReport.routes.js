const { Router } = require('express')
const router = Router()
const { createPetReport, listPetReports } = require('../controllers/petReport.controller')

router.get('/', listPetReports)
router.post('/own', createPetReport)

module.exports = router
