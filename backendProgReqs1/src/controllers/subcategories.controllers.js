const SubcategoryRequirement = require("../model/SubcategoriesRequirements.model");
const RequirementSecurity = require("../model/RequirementsSecurity.model");

const getAllSubcategories = async (req, res, next) => {
  try {
    const subcategories = await SubcategoryRequirement.findAll();
    res.json(subcategories);
  } catch (error) {
    next(error);
  }
};

const getSubcategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subcategory = await SubcategoryRequirement.findByPk(id);

    if (!subcategory) {
      return res.status(404).json({ message: 'No existe la subcategoría' });
    }

    res.json(subcategory);
  } catch (error) {
    next(error);
  }
};

const getSubcategoryByCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subcategories = await SubcategoryRequirement.findAll({
      where: { categories_requirements_id: id },
    });

    if (subcategories.length === 0) {
      return res.status(404).json({ error: 'No existen subcategorías para esta categoría' });
    }

    res.json(subcategories);
  } catch (error) {
    next(error);
  }
};

const createSubcategory = async (req, res, next) => {
  const { name, categories_requirements_id } = req.body;

  try {
    const subcategory = await SubcategoryRequirement.create({
      name,
      categories_requirements_id,
    });

    res.status(200).json({ subcategory, success: 'Subcategoría creada con éxito' });
  } catch (error) {
    next(error);
  }
};

const deleteSubcategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCount = await SubcategoryRequirement.findByPk(id);

    if (!deletedCount) {
      return res.status(404).json({ error: 'No existe la subcategoría' });
    }

    if (deletedCount.original) {
      return res.status(403).json({ error: 'No se puede eliminar una subcategoría original' });
    }

    await RequirementSecurity.destroy({ where: { subcategories_requirements_id: id } });

    await deletedCount.destroy();

    res.status(200).json({ success: `Subcategoría con eliminada exitosamente` });
  } catch (error) {
    next(error);
  }
};

const updateSubcategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, categories_requirements_id } = req.body;

  try {
    const subcategory = await SubcategoryRequirement.findByPk(id);

    if (!subcategory) {
      return res.status(404).json({ error: 'No existe la subcategoría' });
    }

    if (subcategory.original) {
      return res.status(403).json({ error: 'No se puede modificar una subcategoría original' });
    }

    await subcategory.update({
      name,
      categories_requirements_id,
    });

    res.status(200).json({ subcategory, success: 'Subcategoría actualizada con éxito' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSubcategories,
  getSubcategory,
  getSubcategoryByCategory,
  createSubcategory,
  deleteSubcategory,
  updateSubcategory,
};
