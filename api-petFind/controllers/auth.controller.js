require('../configs/passport.config')
const passport = require('passport')
const User = require('../models/user.repository')
const autenticateWithGoogle = passport.authenticate('google', { scope: ['openid', 'email', 'profile'] })

const handleGoogleCallback = async (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/' }, async (err, user, info) => {
    if (err) {
      return next(err) // Manejar errores si los hubiera
    }

    console.log('user', user)
    console.log('info', info)

    const existingUser = await User.findByEmail(user.emails[0].value)

    console.log('existingUser', existingUser)

    if (existingUser) {
      console.log('Usuario ya existe')
    } else {
      console.log('Usuario no existe')
    }

    // Redirección en caso de autenticación exitosa
    res.redirect('http://localhost:5173')
  })(req, res, next)
}

const logout = (req, res) => {
  req.logout()
  res.redirect('http://localhost:5173')
}

module.exports = {
  autenticateWithGoogle,
  handleGoogleCallback,
  logout
}
