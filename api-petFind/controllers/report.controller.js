const ReportRepository = require('../models/report.repository')

const createReport = async (req, res) => {
  try {
    const { userId } = req.user
    const petId = req.params.pet_id
    const date = req.body.date
    const partsDate = date.split('/')

    const petReport = {
      user_id: userId,
      pet_id: petId,
      comment: req.body.comment,
      datetime: new Date(parseInt(partsDate[2]), parseInt(partsDate[1]) - 1, parseInt(partsDate[0])),
      coordinates: `(${parseFloat(req.body.lat)}, ${parseFloat(req.body.lng)})`
    }
    const reportCreated = await ReportRepository.create(petReport)
    const response = {
      status: 1,
      data: {
        report: reportCreated
      }
    }
    res.status(201).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const listOwnReports = async (req, res) => {
  try {
    const { userId } = req.user
    const reports = await ReportRepository.listOwn(userId)
    const response = {
      status: 1,
      data: {
        reports
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getOwnReport = async (req, res) => {
  try {
    const { userId } = req.user
    const report = await ReportRepository.getOwn(userId, req.params.id)

    if (!report) {
      const response = {
        status: 0,
        message: 'No se encontró el reporte'
      }
      return res.status(404).json(response)
    }

    const response = {
      status: 1,
      data: {
        report
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateReport = async (req, res) => {
  try {
    const { userId } = req.user
    const petId = req.params.pet_id
    const report = req.body
    report.pet_id = petId
    report.user_id = userId
    const reportUpdated = await ReportRepository.update(report)
    const response = {
      status: 1,
      data: {
        report: reportUpdated
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteOwnReport = async (req, res) => {
  try {
    const { userId } = req.user
    await ReportRepository.delete(userId, req.params.id)
    const response = {
      status: 1,
      message: 'Reporte eliminado'
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createReport,
  listOwnReports,
  getOwnReport,
  updateReport,
  deleteOwnReport
}
