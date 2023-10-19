const Person = require("../model/Person.model");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(401);
  const refresh_token = cookies.token;

  try {
    // Encuentra al usuario por refreshToken en la base de datos
    const foundUser = await Person.findOne({ where: { refresh_token: refresh_token } });

    if (!foundUser) {
      return res.sendStatus(403); // Prohibido: refreshToken no encontrado
    }

    // Verifica el refreshToken y descifra
    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || foundUser.username !== decoded.username) {
        return res.sendStatus(403); // Prohibido: Token inválido o discrepancia de correo electrónico
      }

      // Genera un nuevo accessToken
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            rol_id: foundUser.rol_id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10s' } // Ajusta la expiración del token según sea necesario
      );

      // Envía el nuevo accessToken en la respuesta
      res.json({
        username: foundUser.username,
        rol_id: foundUser.rol_id,
        token: accessToken,
      });
    });
  } catch (err) {
    next(err);
  }
  
};

module.exports = { handleRefreshToken };
