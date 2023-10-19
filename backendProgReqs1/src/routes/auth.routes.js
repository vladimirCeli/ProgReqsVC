const {Router} = require('express')
const { login, updateRefreshToken, getPersonUsername, requestPasswordReset, resetPassword } = require('../controllers/auth.controllers')
const router = Router()

router.get('/persons/username/:username', getPersonUsername )

router.post('/login', login )

router.put('/refresh-token/:username', updateRefreshToken )

router.post('/request-password-reset', requestPasswordReset )

router.post('/reset-password/:resetToken', resetPassword )

module.exports = router