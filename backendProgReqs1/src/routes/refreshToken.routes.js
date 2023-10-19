const {Router} = require('express')
const { handleRefreshToken } = require('../controllers/refreshToken.controllers')

const router = Router()

router.get('/refresh', handleRefreshToken )



module.exports = router