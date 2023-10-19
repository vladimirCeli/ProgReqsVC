const {Router} = require('express')
const {  getAllPractices,
    getPracticeById,
    createPractice,
    updatePracticeById,
    deletePracticeById, } = require('../../controllers/questionnaire/practice.controllers')

const router = Router()

router.get('/subsection', getAllPractices )

router.get('/subsection/:id', getPracticeById )

router.post('/subsection', createPractice )

router.delete('/subsection/:id', deletePracticeById )

router.put('/subsection/:id', updatePracticeById )

module.exports = router
