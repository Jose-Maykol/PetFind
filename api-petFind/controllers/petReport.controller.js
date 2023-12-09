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
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12

    const pets = await Pet.list(page, limit)
    const totalPets = await Pet.getTotal()

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const response = {
      status: 1,
      data: {
        pet_reports: pets,
        total_pets: totalPets
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const listOwnPetReports = async (req, res) => {
  try {
    const userId = req.user.id
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
    const userId = req.user.id
    const petReport = await Pet.getOwn(req.params.id, userId)
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
    const pet = await Pet.update(req.body)
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
  listOwnPetReports,
  getPetReport,
  getOwnPetReport,
  updatePetReport
}
