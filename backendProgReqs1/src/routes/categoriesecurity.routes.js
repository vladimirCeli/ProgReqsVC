const {Router} = require('express')
const { getAllCategoryRequirements, getCategoryRequirement, createCategoryRequirement, updateCategoryRequirement, deleteCategoryRequirement, } = require('../controllers/categoriesecurity.controllers')

const router = Router()

router.get('/categoriesecurity', getAllCategoryRequirements )

router.get('/categoriesecurity/:id', getCategoryRequirement )

router.post('/categoriesecurity', createCategoryRequirement )

router.delete('/categoriesecurity/:id', deleteCategoryRequirement )

router.put('/categoriesecurity/:id', updateCategoryRequirement )

module.exports = router