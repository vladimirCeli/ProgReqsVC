let server = false;

const serverPracticeStart = async (req, res, next) => {
  try {
    server = true;
    console.log('Servidor activado');
    return res.send('Servidor activado');
  } catch (error) {
    next(error);
  }
};

const serverPracticeStop = async (req, res, next) => {
  try {
    server = false;
    console.log('Servidor detenido');
    return res.send('Servidor detenido');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  serverPracticeStart,
  serverPracticeStop
};
