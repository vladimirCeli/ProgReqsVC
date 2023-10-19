const cron = require('node-cron');
const { Op } = require('sequelize');
const Person = require('../model/Person.model');

// Define una función para eliminar usuarios no confirmados
const cleanupUnconfirmedUsers = async () => {
  try {
    const currentTime = new Date();
    const waitTime = 5 * 60 * 1000; // 5 minutos en milisegundos

    // Calcula la fecha límite para eliminar usuarios no confirmados
    const deadline = new Date(currentTime - waitTime);

    // Consulta la base de datos para obtener usuarios no confirmados
    const unconfirmedUsers = await Person.findAll({
      where: {
        confirmed: false,
        created_at: {
          [Op.lt]: deadline, // Importa Sequelize.Op y úsalo aquí
        },
      },
    });

    // Itera sobre los usuarios no confirmados y elimínalos
    for (const user of unconfirmedUsers) {
      await user.destroy();
      console.log(`Eliminado el usuario no confirmado con ID ${user.id}.`);
    }

    console.log("Proceso de limpieza de usuarios no confirmados completado.");
  } catch (error) {
    console.error("Error al limpiar usuarios no confirmados:", error);
  }
};

// Ejecuta la función de limpieza una vez después de 6 minutos de iniciar el servidor
setTimeout(() => {
  cleanupUnconfirmedUsers();
}, 6 * 60 * 1000); // 6 minutos en milisegundos



// Configura una tarea cron para eliminar usuarios no confirmados periódicamente
const scheduleCleanupTask = () => {
  // Ejecuta la limpieza cada día a la medianoche (00:00)
  cron.schedule("0 0 * * *", () => {
    cleanupUnconfirmedUsers();
  });
};

// Exporta la función de programación de la limpieza periódica
module.exports = {
  scheduleCleanupTask,
};
