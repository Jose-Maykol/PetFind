const { Router } = require('express')
const router = Router()
const { createPetReport, listPetReports, getPetReport } = require('../controllers/petReport.controller')
const requireAuth = require('../middlewares/auth.middleare')

router.get('/', listPetReports)
router.get('/:id', getPetReport)
router.post('/own', requireAuth, createPetReport)

module.exports = router