const { Router } = require('express')
const router = Router()
const { createPetReport, listPetReports, getPetReport, listOwnPetReports } = require('../controllers/petReport.controller')
const requireAuth = require('../middlewares/auth.middleare')

router.get('/', listPetReports)
router.get('/own', requireAuth, listOwnPetReports)
router.get('/:id', getPetReport)
router.post('/own', requireAuth, createPetReport)

module.exports = router
