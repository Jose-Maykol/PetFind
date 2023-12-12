const { Router } = require('express')
const router = Router()
const { createPetReport, listPetReports, getPetReport, listOwnPetReports, getOwnPetReport } = require('../controllers/petReport.controller')
const requireAuth = require('../middlewares/auth.middleare')
const upload = require('../config/multer.config')

router.get('/', listPetReports)
router.get('/own', requireAuth, listOwnPetReports)
router.get('/:id', getPetReport)
router.get('/own/:id', requireAuth, getOwnPetReport)
router.post('/own', requireAuth, upload.single('photo'), createPetReport)

module.exports = router
