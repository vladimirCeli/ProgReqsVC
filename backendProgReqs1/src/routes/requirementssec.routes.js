const {Router} = require('express')
const { getAllRequirementsSec, getRequirementSec, createRequirementSec, getRequirementSecBySubCategory, deleteRequirementSec, updateRequirementSec, } = require('../controllers/requirementssec.controllers')

const router = Router()

router.get('/requirementsec', getAllRequirementsSec )

router.get('/requirementsec/:id', getRequirementSec )

router.post('/requirementsec', createRequirementSec )

router.get('/requirementsec/subcategorie/:id', getRequirementSecBySubCategory )

router.delete('/requirementsec/:id', deleteRequirementSec )

router.put('/requirementsec/:id', updateRequirementSec )

module.exports = router