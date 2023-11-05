const Pet = require('../models/petReport.repository')

const createPetReport = async (req, res) => {
  try {
    console.log(req.body)
    const userId = req.user.id
    const reportPetData = {
      ...req.body,
      user_id: userId
    }
    const newReportPet = await Pet.create(reportPetData)
    const response = {
      status: 1,
      message: 'Reporte creado con éxito',
      data: newReportPet
    }
    res.status(201).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const listPetReports = async (req, res) => {
  try {
    const pets = await Pet.list()
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

const editPetReport = async (req, res) => {
  try {
    const pet = await Pet.edit(req.body)
    const response = {
      status: 1,
      data: {
        pet
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createPetReport,
  listPetReports,
  editPetReport,
  getPetReport
}
