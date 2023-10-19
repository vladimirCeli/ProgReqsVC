const {Router} = require('express')
const { createResponse,
    getAllResponses,
    getResponseByProjectAndQuestionnaireId,
    getResponseById,
    updateResponseById,
    deleteResponseById } = require('../../controllers/questionnaire/response.controllers')

const router = Router()

router.get('/response', getAllResponses )

router.get('/response/project/:id/:id2', getResponseByProjectAndQuestionnaireId )

router.get('/response/:id', getResponseById )

router.post('/response', createResponse )

router.delete('/response/:id', deleteResponseById )

router.put('/response/:id', updateResponseById )

module.exports = router


