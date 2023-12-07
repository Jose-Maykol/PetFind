const userRepository = require('../models/user.repository')

const userInfo = async (req, res, next) => {
  const userId = req.cookies.userId

  if (!userId) {
    res.status(401).json({
      status: 0,
      message: 'Unauthorized'
    })
  }

  try {
    const userInfo = await userRepository.findById(userId)
    const response = {
      status: 1,
      data: {
        userInfo
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  userInfo
}
