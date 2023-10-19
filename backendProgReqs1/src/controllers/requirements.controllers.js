const Requirement = require("../model/Requirements.model");

const getAllRequirements = async (req, res, next) => {
  try {
    const requirements = await Requirement.findAll();
    res.json(requirements);
  } catch (error) {
    next(error);
  }
};

const getRequirementByProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requirements = await Requirement.findAll({
      where: { project_id: id },
    });
    if (requirements.length === 0) {
      return res.status(404).json({ message: "No existen requisitos para este proyecto" });
    }
    res.status(200).json(requirements);
  } catch (error) {
    next(error);
  }
};

const getRequirement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requirement = await Requirement.findByPk(id);
    if (!requirement) {
      return res.status(404).json({ message: "No existe el requerimiento" });
    }
    res.json(requirement);
  } catch (error) {
    next(error);
  }
};

const createRequirement = async (req, res, next) => {
  const {
    ident_requirement_id,
    name,
    characteristicsr,
    description,
    req_no_funtional,
    priority_req,
    project_id,
  } = req.body;

  try {
    const requirement = await Requirement.create({
      ident_requirement_id,
      name,
      characteristicsr,
      description,
      req_no_funtional,
      priority_req,
      project_id,
    });
    res.json(requirement);
  } catch (error) {
    next(error);
  }
};

const deleteRequirement = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verificar si el requisito existe antes de intentar eliminarlo
    const requirement = await Requirement.findByPk(id);
    if (!requirement) {
      return res.status(404).json({ message: "No existe el requerimiento" });
    }

    const result = await Requirement.destroy({
      where: { id },
    });
    if (result === 0) {
      return res.status(404).json({ message: "No existe el requerimiento" });
    }
    res.json({ message: "Requerimiento eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};


const updateRequirement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      ident_requirement_id,
      name,
      characteristicsr,
      description,
      req_no_funtional,
      priority_req,
      project_id,
    } = req.body;

    const [, updatedRequirement] = await Requirement.update(
      {
        ident_requirement_id,
        name,
        characteristicsr,
        description,
        req_no_funtional,
        priority_req,
        project_id,
      },
      {
        where: { id },
        returning: true,
      }
    );

    if (!updatedRequirement) {
      return res.status(404).json({ message: "No existe el requerimiento" });
    }
    res.json({ message: "Requerimiento actualizado correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRequirements,
  getRequirement,
  createRequirement,
  deleteRequirement,
  updateRequirement,
  getRequirementByProject,
};
