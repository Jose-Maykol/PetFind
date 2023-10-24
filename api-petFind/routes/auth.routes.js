const { Router } = require('express')
const router = Router()
const { autenticateWithGoogle, handleGoogleCallback, logout } = require('../controllers/auth.controller')

router.get('/google', autenticateWithGoogle)
router.get('/google/callback', handleGoogleCallback)
router.get('/logout', logout)

module.exports = router
