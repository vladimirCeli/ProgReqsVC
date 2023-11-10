const Project = require("../model/Projects.model"); // Asegúrate de importar el modelo correcto
const Requirement = require("../model/Requirements.model"); // Importa el modelo Requirement

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.json({ projects, messages: "Proyectos obtenidos correctamente" });
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: "No existe el proyecto" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: "Error al obtener el proyecto" });
  }
};

const getProjectByPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await Project.findAll({
      where: { person_id: id },
    });

    if (projects.length === 0) {
      return res
        .status(404)
        .json({ message: "No existen proyectos para esta persona" });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los proyectos" });
  }
};

const createProject = async (req, res) => {
  const { name, description, person_id, requirements } = req.body;
  try {
    const project = await Project.create({
      name,
      description,
      person_id,
    });

    if (requirements && requirements.length > 0) {
      await project.createRequirements(requirements);
    }

    res.status(200).json({ project, message: "Proyecto creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el proyecto" });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: "No existe el proyecto" });
    }

    // Elimina las requirements asociadas al proyecto
    await Requirement.destroy({
      where: { project_id: project.id },
    });

    await project.destroy();
    res.status(200).json({ message: "Proyecto eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ message: "Error al eliminar el proyecto" });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, person_id, requirements } = req.body;
  try {
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: "No existe el proyecto" });
    }

    project.name = name;
    project.description = description;
    project.person_id = person_id;

    await project.save();

    // Elimina las requirements existentes
    await Requirement.destroy({
      where: { project_id: project.id },
    });

    if (requirements && requirements.length > 0) {
      // Crea las nuevas requirements
      await project.createRequirements(requirements);
    }

    res.status(200).json({ project, message: "Proyecto actualizado correctamente" });
  } catch (error) {
    res.status(404).json({ message: "Error al actualizar el proyecto" });
  }
};

module.exports = {
  getAllProjects,
  getProject,
  getProjectByPerson,
  createProject,
  deleteProject,
  updateProject,
};
