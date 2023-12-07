require('dotenv').config()
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.SECRET_KEY

const createToken = (userId) => {
  return jwt.sign(userId, jwtSecret, { expiresIn: '24h' })
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret)
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = {
  createToken,
  verifyToken
}
