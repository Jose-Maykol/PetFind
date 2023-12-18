const { Router } = require('express')
const router = Router()
const { autenticateWithGoogle, handleGoogleCallback, logout } = require('../controllers/auth.controller')
const requireAuth = require('../middlewares/auth.middleare')

router.get('/google', autenticateWithGoogle)
router.get('/google/callback', handleGoogleCallback)
router.post('/logout', requireAuth, logout)

module.exports = router
