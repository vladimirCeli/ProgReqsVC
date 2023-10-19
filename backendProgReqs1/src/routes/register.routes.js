const {Router} = require('express')
const { confirmEmail, register } = require('../controllers/register.controllers')
const router = Router()

router.post('/register', register )
router.get('/confirm/:confirmationToken', confirmEmail )

module.exports = router