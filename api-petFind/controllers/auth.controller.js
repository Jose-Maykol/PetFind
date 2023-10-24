require('../configs/passport.config')
const passport = require('passport')
const autenticateWithGoogle = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
const handleGoogleCallback = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
    if (err) {
      return next(err) // Manejar errores si los hubiera
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
