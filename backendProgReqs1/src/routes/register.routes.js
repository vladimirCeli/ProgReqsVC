const {Router} = require('express')
const { confirmEmail, register } = require('../controllers/register.controllers')
const router = Router()

router.post('/register', register )
router.post('/confirm', confirmEmail )

module.exports = router