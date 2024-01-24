const Pet = require('../models/petReport.repository')
const { uploadToCloudinary, deleteFromCloudinary } = require('./cloudinary.controller')
const fs = require('fs')

const createPetReport = async (req, res) => {
  try {
    const { userId } = req.user
    const imagePet = req.file
    const imagePetUrl = await uploadToCloudinary(imagePet)

    fs.unlinkSync(req.file.path)

    const petReportData = {
      user_id: userId,
      pet_type_id: req.body.pet_type_id,
      report_status_id: 1,
      name: req.body.name,
      age_years: parseInt(req.body.age_years),
      age_months: parseInt(req.body.age_months),
      description: req.body.description,
      loss_date: new Date().toISOString(),
      photo: imagePetUrl,
      phone: req.body.phone,
      reward: parseFloat(req.body.reward),
      coordinates: `(${parseFloat(req.body.lat)}, ${parseFloat(req.body.lng)})`
    }

    const newPetReport = await Pet.create(petReportData)
    console.log(newPetReport)
    const response = {
      status: 1,
      message: 'Reporte creado con éxito'
    }
    res.status(201).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const listPetReports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12

    const filters = {}

    if (req.query.name) {
      filters.name = req.query.name
    }

    if (req.query.loss_date_start && req.query.loss_date_end) {
      filters.loss_date_start = req.query.loss_date_start
      filters.loss_date_end = req.query.loss_date_end
    }

    if (req.query.pet_type_ids && req.query.pet_type_ids.length > 0) {
      filters.pet_type_ids = req.query.pet_type_ids.split(',')
    }

    const pets = await Pet.list(page, limit, filters)
    const totalPets = await Pet.getTotal(filters)

    if (pets.length === 0) {
      const response = {
        status: 0,
        message: 'No se encontraron reportes'
      }
      return res.status(404).json(response)
    }

    const response = {
      status: 1,
      data: {
        pet_reports: pets,
        total_pages: Math.ceil(totalPets / limit)
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const listOwnPetReports = async (req, res) => {
  try {
    const { userId } = req.user
    const pets = await Pet.listOwn(userId)
    const response = {
      status: 1,
      data: {
        pet_reports: pets
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getPetReport = async (req, res) => {
  try {
    const petReport = await Pet.get(req.params.id)

    if (!petReport) {
      const response = {
        status: 0,
        message: 'No se encontró el reporte'
      }
      return res.status(404).json(response)
    }

    const response = {
      status: 1,
      data: {
        pet_report: petReport
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getOwnPetReport = async (req, res) => {
  try {
    const { userId } = req.user
    const petReport = await Pet.getOwn(req.params.id, userId)

    if (!petReport) {
      const response = {
        status: 0,
        message: 'No se encontró el reporte'
      }
      return res.status(404).json(response)
    }

    const response = {
      status: 1,
      data: {
        pet_report: petReport
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updatePetReport = async (req, res) => {
  try {
    const { userId } = req.user
    const petId = req.params.id
    const imagePet = req.file
    let imagePetUrl = null
    const petReport = await Pet.getOwn(petId, userId)

    if (!petReport) {
      const response = {
        status: 0,
        message: 'No se encontró el reporte'
      }
      return res.status(404).json(response)
    }

    if (imagePet) {
      imagePetUrl = await uploadToCloudinary(imagePet)
      const oldImagePetUrl = petReport.photo
      if (oldImagePetUrl) {
        await deleteFromCloudinary(oldImagePetUrl)
      }
      fs.unlinkSync(req.file.path)
    }

    const petReportData = {
      id: req.params.id,
      user_id: userId,
      pet_type_id: req.body.pet_type_id,
      report_status_id: 1,
      name: req.body.name,
      age_years: parseInt(req.body.age_years),
      age_months: parseInt(req.body.age_months),
      description: req.body.description,
      loss_date: new Date().toISOString(),
      photo: imagePetUrl || petReport.photo,
      phone: req.body.phone,
      reward: parseFloat(req.body.reward),
      coordinates: `(${parseFloat(req.body.lat)}, ${parseFloat(req.body.lng)})`
    }
    await Pet.update(petReportData)
    const response = {
      status: 1,
      message: 'Reporte actualizado con éxito'
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updatePetReportStatus = async (req, res) => {
  try {
    const petId = req.params.id
    const statusId = req.body.status_id
    const petReport = await Pet.updateStatus(petId, statusId)

    if (!petReport) {
      const response = {
        status: 0,
        message: 'No se encontró el reporte'
      }
      return res.status(404).json(response)
    }

    const response = {
      status: 1,
      message: 'Estado actualizado con éxito'
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getReportsSightings = async (req, res) => {
  try {
    const { userId } = req.user
    const petReports = await Pet.getReportsSightings(req.params.id)
    const pet = await Pet.getOwn(req.params.id, userId)

    if (!petReports) {
      const response = {
        status: 0,
        message: 'No se encontró el reporte'
      }
      return res.status(404).json(response)
    }

    const response = {
      status: 1,
      data: {
        pet_reports: petReports,
        pet
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteOwnPetReport = async (req, res) => {
  try {
    const { userId } = req.user
    const petReport = await Pet.getOwn(req.params.id, userId)

    if (!petReport) {
      const response = {
        status: 0,
        message: 'No se encontró el reporte'
      }
      return res.status(404).json(response)
    }

    await Pet.deleteOwn(req.params.id, userId)
    const response = {
      status: 1,
      message: 'Reporte eliminado con éxito'
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createPetReport,
  listPetReports,
  listOwnPetReports,
  getPetReport,
  getOwnPetReport,
  updatePetReport,
  updatePetReportStatus,
  getReportsSightings,
  deleteOwnPetReport
}
