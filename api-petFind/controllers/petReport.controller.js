const Pet = require('../models/petReport.repository')

const createPetReport = async (req, res) => {
  try {
    console.log(req.body)
    const pet = await Pet.create(req.body)
    const response = {
      status: 1,
      data: {
        pet
      }
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
        pets
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getPetReport = async (req, res) => {
  try {
    const pet = await Pet.get(req.params.id)
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
  getPetReport
}
