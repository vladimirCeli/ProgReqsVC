const CategoryRequirement = require("../model/CategoriesRequirements.model");
const SubcategoryRequirement = require("../model/SubcategoriesRequirements.model");
const RequirementSecurity = require("../model/RequirementsSecurity.model");

const getAllCategoryRequirements = async (req, res, next) => {
  try {
    const categories = await CategoryRequirement.findAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategoryRequirement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await CategoryRequirement.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'No existe la categoría de requisito' });
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

const createCategoryRequirement = async (req, res, next) => {
  const { name, person_id, requirementsecurity } = req.body;

  try {
    const category = await CategoryRequirement.create({
      name,
      person_id,
    });

    res.status(200).json({ category, success: 'Categoría de requisito creada con éxito' });
  } catch (error) {
    next(error);
  }
};

const updateCategoryRequirement = async (req, res, next) => {
  const { id } = req.params;
  const { name, person_id, requirementsecurity } = req.body;

  try {
    const category = await CategoryRequirement.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'La categoría de requisito no existe' });
    }

    if (category.original) {
      return res.status(403).json({ error: 'No se puede modificar una categoría original' });
    }

    await category.update({
      name,
      person_id,
    });

    res.status(200).json({ category, success: 'Categoría de requisito actualizada con éxito'});
  } catch (error) {
    next(error);
  }
};

const deleteCategoryRequirement = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await CategoryRequirement.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'La categoría de requisito no existe' });
    }

    if (category.original) {
      return res.status(403).json({ error: 'No se puede eliminar una categoría original' });
    }

    const subcategories = await SubcategoryRequirement.findAll({
      where: { categories_requirements_id: id },
    });

    const subcategoryIds = subcategories.map(subcategory => subcategory.id);

    // Eliminar los RequirementSecurity asociados a las subcategorías
    await RequirementSecurity.destroy({ where: { subcategories_requirements_id: subcategoryIds } });

    // Eliminar las subcategorías
    await SubcategoryRequirement.destroy({ where: { id: subcategoryIds } });

    // Finalmente, eliminar la categoría de requisito
    await category.destroy();

    res.status(200).json({ success: 'Categoría de requisito eliminada con éxito' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategoryRequirements,
  getCategoryRequirement,
  createCategoryRequirement,
  updateCategoryRequirement,
  deleteCategoryRequirement,
};
