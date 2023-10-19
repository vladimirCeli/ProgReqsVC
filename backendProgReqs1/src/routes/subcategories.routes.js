const {Router} = require('express')
const { getAllSubcategories,
    getSubcategory,
  getSubcategoryByCategory,
  createSubcategory,
  deleteSubcategory,
  updateSubcategory, } = require('../controllers/subcategories.controllers')

const router = Router()

router.get('/subcategories', getAllSubcategories )

router.get('/subcategories/:id', getSubcategory )

router.post('/subcategories', createSubcategory )

router.get('/subcategories/categorie/:id', getSubcategoryByCategory )

router.delete('/subcategories/:id', deleteSubcategory )

router.put('/subcategories/:id', updateSubcategory )

module.exports = router