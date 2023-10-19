const {Router} = require('express')
const { logout, checkSession } = require('../controllers/logout.controllers')
const router = Router()

router.get('/logout', logout )

router.get('/checkSession', checkSession)

module.exports = router