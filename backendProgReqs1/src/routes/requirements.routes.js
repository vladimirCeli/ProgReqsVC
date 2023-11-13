const {Router} = require('express')
const { getAllRequirements, getRequirement, getRequirementByProject, getRequirementNotFunctionalByProject, createRequirement, deleteRequirement, updateRequirement } = require('../controllers/requirements.controllers')

const router = Router()

router.get('/requirements', getAllRequirements )

router.get('/requirements/:id', getRequirementByProject )

router.get('/requirements/notfunctional/:id', getRequirementNotFunctionalByProject )

router.get('/requirements/project/:id', getRequirement )

router.post('/requirements', createRequirement )

router.delete('/requirements/:id', deleteRequirement )

router.put('/requirements/:id', updateRequirement )

module.exports = router