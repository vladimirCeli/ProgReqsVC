const Category = require('../../model/questionnaire/categorie.model');
const Questionnaire = require('../../model/questionnaire/questionnaire.model');

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('practices');
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ error: 'Hubo un error al obtener las categorías.' });
  }
};

// Obtener una categoría por su ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('practices');
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada.' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error al obtener la categoría por ID:', error);
    res.status(500).json({ error: 'Hubo un error al obtener la categoría.' });
  }
};

// Crear una nueva categoría
const createCategory = async (req, res) => {
  try {
    const { name, original, practices } = req.body;
    const newCategory = new Category({ name, original, practices });
    const savedCategory = await newCategory.save();
    res.status(201).json({ savedCategory, success: 'Categoría creada con éxito.' });
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    res.status(500).json({ error: 'No se pueden crear dos categorias con prácticas nulas.' });
  }
};

// Actualizar una categoría por su ID
const updateCategoryById = async (req, res) => {
  try {
    const { name, original, practices } = req.body;

    const existingCategory = await Category.findById(req.params.id);

    if (!existingCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada.' });
    }

    if (existingCategory.original) {
      return res
        .status(400)
        .json({ error: 'No puedes editar una categoría original.' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, original, practices },
      { new: true }
    ).populate('practices');
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada.' });
    }
    res.status(200).json({updatedCategory, success: 'Categoría actualizada con éxito.'});
  } catch (error) {
    console.error('Error al actualizar la categoría por ID:', error);
    res.status(500).json({ error: 'Hubo un error al actualizar la categoría.' });
  }
};

// Eliminar una categoría por su ID
const deleteCategoryById = async (req, res) => {
  try {
    
    const categories = await Category.findById(req.params.id);

    if (!categories) {
      return res.status(404).json({ error: 'Categoría no encontrada.' });
    }

    if (categories.original) {
      return res
        .status(400)
        .json({ error: 'No puedes eliminar una categoría original.' });
    }

    const isCategoryInUse = await Questionnaire.findOne({ categories: req.params.id });

    if (isCategoryInUse) {
      return res
        .status(400)
        .json({ error: 'No puedes eliminar una categoría en uso.' });
    }
    
    await Category.findByIdAndRemove(req.params.id); 
    res.status(200).json({ success: 'Categoría eliminada con éxito.' });
  } catch (error) {
    console.error('Error al eliminar la categoría por ID:', error);
    res.status(500).json({ error: 'Hubo un error al eliminar la categoría.' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};
