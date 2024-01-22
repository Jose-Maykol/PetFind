require('dotenv').config()
require('../config/passport.config')
const passport = require('passport')
const User = require('../models/user.repository')
const { createToken } = require('../config/jwt.config')
const autenticateWithGoogle = passport.authenticate('google', { scope: ['openid', 'email', 'profile'] })

const CLIENT_URL = process.env.CLIENT_URL

const handleGoogleCallback = async (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/' }, async (err, user, info) => {
    if (err) {
      return next(err)
    }

    const existingUser = await User.findByEmail(user.emails[0].value)

    if (existingUser) {
      // const accessToken = info.accessToken
      const userData = {
        id: existingUser.id,
        name: user.name.givenName,
        surname: user.name.familyName,
        email: user.emails[0].value,
        profile_picture: user.photos[0].value
      }
      const jwtToken = createToken({ userId: userData.id })
      res.redirect(`${CLIENT_URL}/?code=${jwtToken}`)
    } else {
      const newUser = {
        name: user.name.givenName,
        surname: user.name.familyName,
        email: user.emails[0].value,
        profile_picture: user.photos[0].value
      }
      const createdUser = await User.create(newUser)
      const userData = {
        id: createdUser.id,
        name: user.name.givenName,
        surname: user.name.familyName,
        email: user.emails[0].value,
        profile_picture: user.photos[0].value
      }
      const jwtToken = createToken({ userId: userData.id })
      res.redirect(`${CLIENT_URL}/?code=${jwtToken}`)
    }
  })(req, res, next)
}

const logout = (req, res) => {
  res.status(200).json({
    status: 1,
    message: 'Se ha cerrado la sesión'
  })
}

module.exports = {
  autenticateWithGoogle,
  handleGoogleCallback,
  logout
}
