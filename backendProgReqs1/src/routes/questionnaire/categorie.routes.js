const {Router} = require('express')
const {   getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById, } = require('../../controllers/questionnaire/categorie.controllers')

const router = Router()

router.get('/categorie', getAllCategories )

router.get('/categorie/:id', getCategoryById )

router.post('/categorie', createCategory )

router.delete('/categorie/:id', deleteCategoryById )

router.put('/categorie/:id', updateCategoryById )

module.exports = router