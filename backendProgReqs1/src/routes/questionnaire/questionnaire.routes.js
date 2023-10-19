const {Router} = require('express')
const {     getAllQuestionnaires,
    getQuestionnaireById,
    updateQuestionnaireByIdInPublishedOrUnpublished,
    getQuestionnairePublished,
    getQuestionnaireComplete,
    createQuestionnaire,
    updateQuestionnaireById,
    deleteQuestionnaireById } = require('../../controllers/questionnaire/questionnaire.controllers')

const router = Router()

router.get('/questionnaire', getAllQuestionnaires )



router.get('/questionnaire/complete/:id', getQuestionnaireComplete )

router.get('/questionnaire/published', getQuestionnairePublished )

router.put('/questionnaire/editpublished/:id', updateQuestionnaireByIdInPublishedOrUnpublished)

router.post('/questionnaire', createQuestionnaire )

router.delete('/questionnaire/:id', deleteQuestionnaireById )

router.put('/questionnaire/:id', updateQuestionnaireById )

router.get('/questionnaire/:id', getQuestionnaireById )

module.exports = router