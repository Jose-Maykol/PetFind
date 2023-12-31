const { Router } = require('express')
const router = Router()
const { createPetReport, listPetReports, getPetReport, listOwnPetReports, getOwnPetReport, updatePetReportStatus, deleteOwnPetReport, updatePetReport, getReportsSightings } = require('../controllers/petReport.controller')
const requireAuth = require('../middlewares/auth.middleare')
const upload = require('../config/multer.config')

router.get('/', listPetReports)
router.get('/own', requireAuth, listOwnPetReports)
router.get('/:id', getPetReport)
router.get('/own/:id', requireAuth, getOwnPetReport)
router.post('/own', requireAuth, upload.single('photo'), createPetReport)
router.put('/own/:id', requireAuth, upload.single('photo'), updatePetReport)
router.put('/own/:id/status', requireAuth, updatePetReportStatus)
router.get('/own/:id/reports', requireAuth, getReportsSightings)
router.delete('/own/:id', requireAuth, deleteOwnPetReport)

module.exports = router
