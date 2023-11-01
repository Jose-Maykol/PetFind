require('dotenv').config()
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.SECRET_KEY

const createToken = (accessToken) => {
  const payload = {
    accessToken
  }
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' })
}

const verifyToken = (token) => {
  try {
    const accessToken = jwt.verify(token, jwtSecret)
    return accessToken
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = {
  createToken,
  verifyToken
}
