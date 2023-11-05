const { verifyToken } = require('../config/jwt.config')

const requireAuth = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no encontrado' })
  }

  const jwtToken = token.split('Bearer ')[1]
  const userData = verifyToken(jwtToken)

  if (!userData) {
    return res.status(401).json({ message: 'Token inválido' })
  }
  console.log('userData', userData)
  req.user = userData
  next()
}

module.exports = requireAuth
