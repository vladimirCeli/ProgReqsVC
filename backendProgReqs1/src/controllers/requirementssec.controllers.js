const RequirementSecurity = require("../model/RequirementsSecurity.model");

const getAllRequirementsSec = async (req, res, next) => {
  try {
    const requirementsSec = await RequirementSecurity.findAll();
    res.json(requirementsSec);
  } catch (error) {
    next(error);
  }
};

const getRequirementSec = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requirementSec = await RequirementSecurity.findByPk(id);

    if (!requirementSec) {
      return res.status(404).json({ error: 'No existe el requerimiento' });
    }

    res.json(requirementSec);
  } catch (error) {
    next(error);
  }
};

const getRequirementSecBySubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requirementsSec = await RequirementSecurity.findAll({
      where: { subcategories_requirements_id: id },
    });

    if (requirementsSec.length === 0) {
      return res.status(404).json({ error: 'No existen requerimientos para esta subcategoría' });
    }

    res.json(requirementsSec);
  } catch (error) {
    next(error);
  }
};

const createRequirementSec = async (req, res, next) => {
  const { numeration, level_requirements, subcategories_requirements_id, description, cwe, nist } = req.body;

  try {
    const requirementSec = await RequirementSecurity.create({
      numeration,
      level_requirements,
      subcategories_requirements_id,
      description,
      cwe,
      nist,
    });

    res.status(200).json({ requirementSec, success: 'Requerimiento creado con éxito' });
  } catch (error) {
    next(error);
  }
};

const deleteRequirementSec = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCount = await RequirementSecurity.findByPk(id);

    if (!deletedCount) {
      return res.status(404).json({ error: 'No existe el requerimiento' });
    }

    if (deletedCount.original) {
      return res.status(403).json({ error: 'No se puede eliminar el requerimiento original' });
    }

    await deletedCount.destroy();

    res.status(200).json({ success: 'Requerimiento eliminado con éxito' });
  } catch (error) {
    next(error);
  }
};

const updateRequirementSec = async (req, res, next) => {
  const { id } = req.params;
  const { numeration, level_requirements, subcategories_requirements_id, description, cwe, nist } = req.body;

  try {
    const requirementsSec = await RequirementSecurity.findByPk(id);

    if (!requirementsSec) {
      return res.status(404).json({ error: 'No existe el requerimiento' });
    }

    if (requirementsSec.original) {
      return res.status(403).json({ error: 'No se puede modificar el requerimiento original' });
    }

    await requirementsSec.update({
      numeration,
      level_requirements,
      subcategories_requirements_id,
      description,
      cwe,
      nist,
    });

    res.status(200).json({ requirementsSec, success: 'Requerimiento actualizado con éxito' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRequirementsSec,
  getRequirementSec,
  createRequirementSec,
  getRequirementSecBySubCategory,
  deleteRequirementSec,
  updateRequirementSec,
};
