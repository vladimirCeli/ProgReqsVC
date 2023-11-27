const Person = require("../model/Person.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const passwordValidator = require("password-validator");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secureConnection: true,
  port: 587,
  service: "gmail",
  auth: {
      user: "vladimir.celi@unl.edu.ec",
      pass: "vapdncmehudtbbze",
  },
})

const passwordSchema = new passwordValidator();
passwordSchema
  .is()
  .min(12)
  .is()
  .max(30)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols()
  .has()
  .not()
  .spaces()
  .is().not().oneOf(['Passw0rd', 'Password123', '12345678',]);

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await Person.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ message: 'No existe el usuario en el sistema' });
    }

    if (!user.confirmed) {
      return res.status(401).json({ message: 'Usuario no confirmado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: { username: username, rol_id: user.rol_id },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10s' }
    );

    const refresh_token = jwt.sign(
      { username: username, password: password },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    await user.update({ refresh_token: refresh_token });

    res.cookie('token', refresh_token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
    res.json({ rol_id: user.rol_id, token: accessToken });
  } catch (error) {
    // Maneja errores generales aquí
    next(error);
  }
};

const generateUniqueToken = () => {
  const sha256 = require('crypto').createHash('sha256');
  return sha256.update(Math.random().toString()).digest('hex');
}


const updateRefreshToken = async (req, res, next) => {
  const { username } = req.params;
  const { password } = req.body;
  const refresh_token = jwt.sign(
    { username: username, password: password },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );
  try {
    const [updatedRowCount] = await Person.update(
      { refresh_token: refresh_token },
      {
        where: { username: username },
        returning: true, // Devuelve el registro actualizado
      }
    );

    if (updatedRowCount === 0) {
      return res.status(404).json({ message: 'No existe el usuario en el sistema' });
    }

    res.json({ message: 'Refresh token actualizado correctamente' });
  } catch (error) {
    next(error);
  }
};

const getPersonUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const person = await Person.findOne({ where: { username: username } });

    if (!person) {
      return res.status(404).json({ message: 'No existe el usuario en el sistema' });
    }

    res.status(200).json(person.id);
  } catch (error) {
    next(error);
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const person = await Person.findOne({ where: { email: email } });

    if (!person) {
      return res.status(404).json({ message: "Correo electrónico no registrado" });
    }

    const resetToken = generateUniqueToken();
    await person.update({ reset_token: resetToken });

    const mailOptions = {
      from: "vladimir.celi@unl.edu.ec",
      to: email,
      subject: "Restablecer contraseña",
      html: `<h1>Restablecer contraseña</h1>
      <h3>Haga clic en el siguiente enlace para restablecer su contraseña:</h3>
      <a href="https://progresqscic.onrender.com/${resetToken}">Restablecer contraseña</a>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    res.status(200).json({ message: "Se ha enviado un correo electrónico para restablecer la contraseña" });
  } catch (error) {
    console.error("Error al solicitar restablecimiento de contraseña:", error);
    res.status(500).json({ message: "Error al solicitar restablecimiento de contraseña" });
  }
};

const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { resetToken } = req.params;
  try {
    const person = await Person.findOne({ where: { reset_token: resetToken } });

    if (!person) {
      return res.status(404).json({ message: "Token de restablecimiento de contraseña no válido" });
    }

    if (!passwordSchema.validate(newPassword)) {
      return res.status(400).json({ message: "Nueva contraseña no válida" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await person.update({ password: hashedPassword, reset_token: null });

    res.status(200).json({ message: "Contraseña restablecida con éxito" });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    res.status(500).json({ message: "Error al restablecer la contraseña" });
  }
};


module.exports = {
  getPersonUsername,
  login,
  updateRefreshToken,
  requestPasswordReset,
  resetPassword,
};
