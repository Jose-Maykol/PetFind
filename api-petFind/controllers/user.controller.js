const User = require('../models/user.repository')

const getUserInfo = async (req, res, next) => {
  const { userId } = req.user

  if (!userId) {
    res.status(401).json({
      status: 0,
      message: 'Unauthorized'
    })
  }

  try {
    const userInfo = await User.findById(userId)
    const response = {
      status: 1,
      data: {
        userInfo
      }
    }
    res.status(200).json(response)
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = {
  getUserInfo
}
