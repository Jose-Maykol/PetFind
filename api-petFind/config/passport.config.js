require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const URL_CALLBACK = process.env.URL_CALLBACK

passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: URL_CALLBACK,
  scope: ['openid', 'email', 'profile'],
  accessType: 'offline'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile, { accessToken, refreshToken })
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})
