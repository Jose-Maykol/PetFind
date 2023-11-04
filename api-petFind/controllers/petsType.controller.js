const PetType = require('../models/petType.repository')

const getAll = async (req, res) => {
  try {
    const petTypes = await PetType.getAll()
    const response = {
      status: 1,
      data: {
        petTypes
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAll
}
