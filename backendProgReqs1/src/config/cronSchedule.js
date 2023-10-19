const cron = require('node-cron');
const Person = require('../model/Person.model');

const cronSchedule = (userId, waitTime) => {
  setTimeout(async () => {
    try {
      const deletedCount = await Person.destroy({
        where: {
          id: userId,
          confirmed: false,
        },
      });

      if (deletedCount > 0) {
        console.log(`Eliminado el usuario no confirmado con ID ${userId}.`);
      }
    } catch (error) {
      console.error(`Error al eliminar el usuario no confirmado con ID ${userId}:`, error);
    }
  }, waitTime);
}

module.exports = { cronSchedule };
