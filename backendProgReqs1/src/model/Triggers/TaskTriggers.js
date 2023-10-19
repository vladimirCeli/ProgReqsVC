const { sequelize } = require('../config/db');

async function createTaskTrigger() {
  try {
    await sequelize.query(`
      CREATE OR REPLACE FUNCTION create_task_on_insert()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.requirements_id IS NOT NULL AND NEW.requirements_security_id IS NOT NULL THEN
          INSERT INTO tasks (name, description, progress, requirement_id)
          VALUES (
            'Nueva tarea',
            'Descripción de la tarea',
            0,
            NEW.requirements_id
          );
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await sequelize.query(`
      CREATE TRIGGER create_task_trigger
      AFTER INSERT
      ON requirements_requirements_security
      FOR EACH ROW
      EXECUTE FUNCTION create_task_on_insert();
    `);

    console.log('Trigger creado exitosamente.');
  } catch (error) {
    console.error('Error al crear el trigger:', error);
  }
}

module.exports = {
  createTaskTrigger,
};
