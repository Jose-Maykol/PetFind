const { verifyToken } = require('../config/jwt.config')

const requireAuth = (req, res, next) => {
  const token = req.cookies.accessToken

  if (!token) {
    return res.status(401).json({ message: 'Token not found' })
  }

  const userData = verifyToken(token)

  if (!userData) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  req.user = userData

  next()
}

module.exports = requireAuth
