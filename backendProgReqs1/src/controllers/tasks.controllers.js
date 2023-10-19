const Task = require("../model/Task.model");

const getAllTasks = async (req, res, next) => {
    try {
      const tasks = await Task.findAll();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  };
  
  const getTaskByIdRequirement = async (req, res, next) => {
    try {
      const { id } = req.params;
      const tasks = await Task.findAll({
        where: {
          requirement_id: id,
        },
      });
  
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  // Obtener una tarea por ID
  const getTask = async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);
  
      if (!task) {
        return res.status(404).json({ message: 'No existe la tarea' });
      }
  
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  const updateWriteDescription = async (req, res, next) => {
    const { id } = req.params;
    const { write_description } = req.body;
  
    try {
      const task = await Task.findByPk(id);
  
      if (!task) {
        return res.status(404).json({ message: 'No existe la tarea' });
      }
      
      task.write_description = write_description;
  
      await task.save();
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  const updateTaskByIdCompletedOrNotCompleted = async (req, res, next) => {
    try {
      const { completed } = req.body;
      const updatedTask = await Task.findByPk(req.params.id);
  
      if (!updatedTask) {
        return res.status(404).json({ error: 'Tarea no encontrada.' });
      }
  
      updatedTask.completed = completed;
  
      await updatedTask.save();
      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }
  
  // Crear una nueva tarea
  const createTask = async (req, res, next) => {
    const { name, description, write_description, cwe, nist, completed, requirement_id } = req.body;
  
    try {
      const task = await Task.create({
        name,
        description,
        write_description,
        cwe,
        nist,
        completed,
        requirement_id,
      });
  
      res.json(task);
    } catch (error) {
      next(error);
    }
  };
  
  // Eliminar una tarea por ID
  const deleteTask = async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);
  
      if (!task) {
        return res.status(404).json({ message: 'No existe la tarea' });
      }
  
      await task.destroy();
      res.json({ message: 'Tarea eliminada con éxito' });
    } catch (error) {
      next(error);
    }
  };
  
  // Actualizar una tarea por ID
  const updateTask = async (req, res, next) => {
    const { id } = req.params;
    const { name, description, write_description, cwe, nist, completed, requirement_id } = req.body;
  
    try {
      const task = await Task.findByPk(id);
  
      if (!task) {
        return res.status(404).json({ message: 'No existe la tarea' });
      }
      
      task.name = name;
      task.description = description;
      task.write_description = write_description;
      task.cwe = cwe;
      task.nist = nist;
      task.completed = completed;
      task.requirement_id = requirement_id;
  
      await task.save();
      res.json(task);
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    getAllTasks,
    getTaskByIdRequirement,
    updateWriteDescription,
    updateTaskByIdCompletedOrNotCompleted,
    getTask,
    createTask,
    deleteTask,
    updateTask,
  };