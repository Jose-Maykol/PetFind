const { verifyToken } = require('../config/jwt.config')

const requireAuth = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no encontrado' })
  }

  const jwtToken = token.split('Bearer ')[1]
  const userId = verifyToken(jwtToken)

  if (!userId) {
    return res.status(401).json({ message: 'Token inválido' })
  }

  req.user = userId
  next()
}

module.exports = requireAuth
