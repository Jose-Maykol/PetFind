const { Router } = require('express')
const { listOwnReports, createReport, updateReport, getOwnReport, deleteOwnReport } = require('../controllers/report.controller')
const router = Router()

router.get('/own', listOwnReports)
router.get('/own/:id', getOwnReport)
router.post('/pet_reports/:pet_id', createReport)
router.put('/:id/pet_reports/:pet_id', updateReport)
router.delete('/:id', deleteOwnReport)
