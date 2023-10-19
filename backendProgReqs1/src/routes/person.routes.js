const {Router} = require('express')
const { getAllPersons,getPerson,createPerson,deletePerson,updatePerson } = require('../controllers/person.controllers')
const router = Router()

router.get('/persons', getAllPersons )

router.get('/persons/:id', getPerson )

router.post('/persons', createPerson )

router.delete('/persons/:id', deletePerson )

router.put('/persons/:id', updatePerson )

module.exports = router