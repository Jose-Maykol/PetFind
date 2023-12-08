const { Router } = require('express')
const router = Router()
const { getUserInfo } = require('../controllers/user.controller')
const requireAuth = require('../middlewares/auth.middleare')

router.get('/info', requireAuth, getUserInfo)

module.exports = router
