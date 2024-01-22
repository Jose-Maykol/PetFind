require('dotenv').config()
require('../config/passport.config')
const passport = require('passport')
const User = require('../models/user.repository')
const { createToken } = require('../config/jwt.config')
const autenticateWithGoogle = passport.authenticate('google', { scope: ['openid', 'email', 'profile'] })

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN
const CLIENT_URL = process.env.CLIENT_URL
const ENV = process.env.NODE_ENV

const handleGoogleCallback = async (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/' }, async (err, user, info) => {
    if (err) {
      return next(err)
    }

    const existingUser = await User.findByEmail(user.emails[0].value)

    if (existingUser) {
      const accessToken = info.accessToken
      const userData = {
        id: existingUser.id,
        name: user.name.givenName,
        surname: user.name.familyName,
        email: user.emails[0].value,
        profile_picture: user.photos[0].value
      }
      const jwtToken = createToken({ userId: userData.id })

      if (ENV === 'production') {
        res.cookie('accessToken', accessToken, {
          // httpOnly: true,
          path: '/',
          maxAge: 86400000,
          sameSite: 'None',
          // domain: CLIENT_DOMAIN,
          secure: true
        })
        res.cookie('jwtToken', jwtToken, {
          // httpOnly: true,
          path: '/',
          maxAge: 86400000,
          // domain: CLIENT_DOMAIN,
          sameSite: 'None',
          secure: true
        })
      } else if (ENV === 'development') {
        res.cookie('accessToken', accessToken, {
          httpOnly: false,
          maxAge: 86400000,
          domain: CLIENT_DOMAIN,
          secure: false,
          sameSite: 'strict'
        })
        res.cookie('jwtToken', jwtToken, {
          httpOnly: false,
          maxAge: 86400000,
          domain: CLIENT_DOMAIN,
          secure: false,
          sameSite: 'strict'
        })
      }
    } else {
      const newUser = {
        name: user.name.givenName,
        surname: user.name.familyName,
        email: user.emails[0].value,
        profile_picture: user.photos[0].value
      }
      const createdUser = await User.create(newUser)
      const accessToken = info.accessToken
      const userData = {
        id: createdUser.id,
        name: user.name.givenName,
        surname: user.name.familyName,
        email: user.emails[0].value,
        profile_picture: user.photos[0].value
      }
      const jwtToken = createToken({ userId: userData.id })
      if (ENV === 'production') {
        res.cookie('accessToken', accessToken, {
          // httpOnly: true,
          path: '/',
          maxAge: 86400000,
          sameSite: 'None',
          // domain: CLIENT_DOMAIN,
          secure: true
        })
        res.cookie('jwtToken', jwtToken, {
          // httpOnly: true,
          path: '/',
          maxAge: 86400000,
          sameSite: 'None',
          // domain: CLIENT_DOMAIN,
          secure: true
        })
      } else if (ENV === 'development') {
        res.cookie('accessToken', accessToken, {
          httpOnly: false,
          maxAge: 86400000,
          domain: CLIENT_DOMAIN,
          secure: false,
          sameSite: 'strict'
        })
        res.cookie('jwtToken', jwtToken, {
          httpOnly: false,
          maxAge: 86400000,
          domain: CLIENT_DOMAIN,
          secure: false,
          sameSite: 'strict'
        })
      }
    }
    res.redirect(CLIENT_URL)
  })(req, res, next)
}

const logout = (req, res) => {
  if (ENV === 'production') {
    res.clearCookie('accessToken', {
      // httpOnly: true,
      path: '/',
      maxAge: 86400000,
      sameSite: 'None',
      // domain: CLIENT_DOMAIN,
      secure: true
    })
    res.clearCookie('jwtToken', {
      // httpOnly: true,
      path: '/',
      maxAge: 86400000,
      sameSite: 'None',
      // domain: CLIENT_DOMAIN,
      secure: true
    })
  } else if (ENV === 'development') {
    res.clearCookie('accessToken', {
      httpOnly: false,
      maxAge: 86400000,
      domain: CLIENT_DOMAIN,
      secure: false,
      sameSite: 'strict'
    })
    res.clearCookie('jwtToken', {
      httpOnly: false,
      maxAge: 86400000,
      domain: CLIENT_DOMAIN,
      secure: false,
      sameSite: 'strict'
    })
  }
  res.status(200).json({ message: 'Se ha cerrado la sesión' })
}

module.exports = {
  autenticateWithGoogle,
  handleGoogleCallback,
  logout
}
