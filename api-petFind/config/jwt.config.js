require('dotenv').config()
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.SECRET_KEY

const createToken = (userData) => {
  return jwt.sign(userData, jwtSecret, { expiresIn: '24h' })
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
