const {Router} = require('express')
const { getAllQuestions,
    getAllQuestionsComplete,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion } = require('../../controllers/questionnaire/question.controllers')

const router = Router()

router.get('/question', getAllQuestions )

router.get('/question/complete', getAllQuestionsComplete )

router.get('/question/:id', getQuestion )

router.post('/question', createQuestion )

router.delete('/question/:id', deleteQuestion )

router.put('/question/:id', updateQuestion )

module.exports = router




