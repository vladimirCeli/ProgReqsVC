const {Router} = require('express')
const {     getAllInterRequirements,
    getInterRequirement,
    createInterRequirement,
    deleteInterRequirement,
    updateInterRequirement } = require('../controllers/interequirements.controllers')

const router = Router()

router.get('/intereq', getAllInterRequirements)

router.get('/intereq/:id', getInterRequirement)

router.post('/intereq', createInterRequirement)

router.delete('/intereq/:id', deleteInterRequirement)

router.put('/intereq/:id', updateInterRequirement)

module.exports = router