const { Router } = require('express')
const { listOwnReports, createReport, updateReport, getOwnReport, deleteOwnReport } = require('../controllers/report.controller')
const requireAuth = require('../middlewares/auth.middleare')
const multer = require('multer')
const router = Router()
const upload = multer()

router.get('/own', listOwnReports)
router.get('/own/:id', getOwnReport)
router.post('/pet-reports/:pet_id', upload.any(), requireAuth, createReport)
router.put('/:id/pet-reports/:pet_id', updateReport)
router.delete('/:id', deleteOwnReport)

module.exports = router
