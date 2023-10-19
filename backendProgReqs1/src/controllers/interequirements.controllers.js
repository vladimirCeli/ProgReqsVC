const RequirementRequirementsSecurity =require("../model/RequirementsRequirementsSecurity.model");
const Task = require("../model/Task.model");
const RequirementSecurity = require("../model/RequirementsSecurity.model");


const getAllInterRequirements = async (req, res, next) => {
  try {
    const interRequirements = await RequirementRequirementsSecurity.findAll();
    res.json(interRequirements);
  } catch (error) {
    next(error);
  }
};

const getInterRequirement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const interRequirement = await RequirementRequirementsSecurity.findByPk(id);

    if (!interRequirement) {
      return res.status(404).json({ message: 'No existe el requisito intermedio' });
    }

    res.json(interRequirement);
  } catch (error) {
    next(error);
  }
};

const createInterRequirement = async (req, res, next) => {
  try {
    const { requirements_id, requirements_security_id } = req.body;

    // Verificar si requirements_security_id es un array
    if (!Array.isArray(requirements_security_id)) {
      return res.status(400).json({ error: 'requirements_security_id debe ser un array de IDs de requisitos de seguridad.' });
    }

    // Crear las relaciones entre los requisitos y los requisitos de seguridad
    const createdInterRequirements = await RequirementRequirementsSecurity.bulkCreate(
      requirements_security_id.map(securityId => ({
        requirements_id,
        requirements_security_id: securityId,
      }))
    );

    // Obtener los detalles de los requisitos de seguridad
    const securityDetails = await RequirementSecurity.findAll({
      where: {
        id: requirements_security_id,
      },
    });

    // Crear una tarea automáticamente por cada requisito de seguridad
    const createdTasks = [];
    for (const securityDetail of securityDetails) {
      const task = await Task.create({
        name: 'N ' + securityDetail.numeration, // Usar el nombre del requisito de seguridad
        description: securityDetail.description, // Usar la descripción del requisito de seguridad
        write_description: '',
        cwe: securityDetail.cwe, // Usar el CWE del requisito de seguridad
        nist: securityDetail.nist, // Usar el NIST del requisito de seguridad
        completed: false,
        requirement_id: requirements_id, // Asignar el ID del requisito
      });
      createdTasks.push(task);
    }

    res.status(200).json({ 
      message: 'Selecciones guardadas con éxito en la base de datos.', 
      createdInterRequirements,
      createdTasks, // Agregar las tareas creadas a la respuesta
    });
  } catch (error) {
    console.error('Error al guardar selecciones en la base de datos:', error);
    // Enviar una respuesta de error en caso de fallo
    res.status(500).json({ error: 'Error al guardar selecciones en la base de datos.' });
  }
};

const deleteInterRequirement = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCount = await RequirementRequirementsSecurity.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'No existe el requisito intermedio' });
    }

    res.json({ message: `Requisito intermedio con id ${id} eliminado` });
  } catch (error) {
    next(error);
  }
};

const updateInterRequirement = async (req, res, next) => {
  const { id } = req.params;
  const { requirements_id, requirements_security_id } = req.body;

  try {
    const [updatedCount, [updatedInterRequirement]] = await RequirementRequirementsSecurity.update(
      {
        requirements_id,
        requirements_security_id,
      },
      { where: { id }, returning: true }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'No existe el requisito intermedio' });
    }

    res.json(updatedInterRequirement);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllInterRequirements,
  getInterRequirement,
  createInterRequirement,
  deleteInterRequirement,
  updateInterRequirement,
};
