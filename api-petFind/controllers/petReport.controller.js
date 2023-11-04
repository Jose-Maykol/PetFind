const Pet = require('../models/pet.repository')

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

module.exports = {
  createPetReport
}
