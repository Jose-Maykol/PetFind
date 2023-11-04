const { Router } = require('express')
const router = Router()
const { createPetReport, listPetReports, getPetReport } = require('../controllers/petReport.controller')

router.get('/', listPetReports)
router.get('/:id', getPetReport)
router.post('/own', createPetReport)

module.exports = router
