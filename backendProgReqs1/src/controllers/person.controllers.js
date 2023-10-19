const Person = require("../model/Person.model");
const Rol = require("../model/Rol.model");

const getAllPersons = async (req, res, next) => {
  try {
    const persons = await Person.findAll({
      include: Rol, // Incluye la información del rol
    });

    if (persons.length === 0) {
      return res.status(404).json({ message: "No existen usuarios en el sistema" });
    }

    res.json(persons);
  } catch (error) {
    next(error);
  }
};

const getPerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const person = await Person.findByPk(id, {
      include: Rol, // Incluye la información del rol
    });

    if (!person) {
      return res.status(404).json({ message: "No existe el usuario en el sistema" });
    }

    res.json(person);
  } catch (error) {
    next(error);
  }
};

const createPerson = async (req, res, next) => {
  const { first_name, last_name, email, username, password, rol_id } = req.body;
  try {
    const person = await Person.create({
      first_name,
      last_name,
      email,
      username,
      password,
      rol_id,
    });

    res.json(person);
  } catch (error) {
    next(error);
  }
};

const deletePerson = async (req, res, next) => {
  const { id } = req.params;
  try {
    const person = await Person.findByPk(id);

    if (!person) {
      return res.status(404).json({ message: "No existe el usuario en el sistema" });
    }

    await person.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

const updatePerson = async (req, res, next) => {
  const { id } = req.params;
  const { first_name, last_name, email, username, password, rol_id } = req.body;
  try {
    const person = await Person.findByPk(id);

    if (!person) {
      return res.status(404).json({ message: "No existe el usuario en el sistema" });
    }

    person.first_name = first_name;
    person.last_name = last_name;
    person.email = email;
    person.username = username;
    person.password = password;
    person.rol_id = rol_id;

    await person.save();

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPersons,
  getPerson,
  createPerson,
  deletePerson,
  updatePerson,
};
